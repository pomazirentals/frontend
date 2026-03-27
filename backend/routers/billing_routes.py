import logging
import os
from datetime import datetime, timezone

import stripe
from dotenv import load_dotenv
from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse, Response

from auth import _AuthRedirect, require_auth
from database import get_db
from tenant import get_current_tenant
from templates_config import templates

load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "")
STRIPE_PRICE_ID = os.getenv("STRIPE_PRICE_ID", "")

router = APIRouter()
logger = logging.getLogger(__name__)

if not stripe.api_key:
    logger.warning("STRIPE_SECRET_KEY is not set — billing routes will return 503.")


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _now_utc() -> str:
    return datetime.now(timezone.utc).isoformat()


def _stripe_not_configured(request: Request, tenant: dict):
    """Return a simple error response when Stripe is not configured."""
    return templates.TemplateResponse(
        "billing/error.html",
        {
            "request": request,
            "tenant": tenant,
            "message": "Payment processing is not configured yet. Please try again later.",
        },
        status_code=503,
    )


# ---------------------------------------------------------------------------
# GET /billing/upgrade
# ---------------------------------------------------------------------------

@router.get("/billing/upgrade")
async def upgrade_get(request: Request):
    try:
        user = require_auth(request)
    except _AuthRedirect as e:
        return e.response

    tenant = get_current_tenant(request)
    return templates.TemplateResponse(
        "billing/upgrade.html",
        {"request": request, "tenant": tenant, "user": user},
    )


# ---------------------------------------------------------------------------
# POST /billing/create-checkout
# ---------------------------------------------------------------------------

@router.post("/billing/create-checkout")
async def create_checkout(request: Request):
    try:
        user = require_auth(request)
    except _AuthRedirect as e:
        return e.response

    tenant = get_current_tenant(request)

    if not stripe.api_key:
        return _stripe_not_configured(request, tenant)

    if not STRIPE_PRICE_ID:
        logger.warning("STRIPE_PRICE_ID is not set")
        return _stripe_not_configured(request, tenant)

    # Check if already paid
    conn = get_db()
    try:
        sub = conn.execute(
            "SELECT * FROM subscriptions WHERE user_id = ?",
            (user["user_id"],),
        ).fetchone()
    finally:
        conn.close()

    if sub and sub["is_paid"]:
        return RedirectResponse("/dashboard?already_paid=1", status_code=302)

    # Create or retrieve Stripe customer
    stripe_customer_id = sub["stripe_customer_id"] if sub else None

    if not stripe_customer_id:
        customer = stripe.Customer.create(
            email=user["email"],
            metadata={
                "user_id": str(user["user_id"]),
                "tenant_id": str(tenant["id"]),
            },
        )
        stripe_customer_id = customer.id

        conn = get_db()
        try:
            conn.execute(
                "UPDATE subscriptions SET stripe_customer_id = ? WHERE user_id = ?",
                (stripe_customer_id, user["user_id"]),
            )
            conn.commit()
        finally:
            conn.close()

    # Build success/cancel URLs
    host = request.headers.get("host", "localhost")
    scheme = "https" if not host.startswith("localhost") else "http"
    success_url = f"{scheme}://{host}/billing/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{scheme}://{host}/billing/cancel"

    # Create Stripe Checkout Session
    session = stripe.checkout.Session.create(
        customer=stripe_customer_id,
        payment_method_types=["card"],
        line_items=[{"price": STRIPE_PRICE_ID, "quantity": 1}],
        mode="subscription",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "user_id": str(user["user_id"]),
            "tenant_id": str(tenant["id"]),
        },
    )

    return RedirectResponse(session.url, status_code=303)


# ---------------------------------------------------------------------------
# GET /billing/success
# ---------------------------------------------------------------------------

@router.get("/billing/success")
async def billing_success(request: Request, session_id: str = None):
    try:
        user = require_auth(request)
    except _AuthRedirect as e:
        return e.response

    tenant = get_current_tenant(request)

    if stripe.api_key and session_id:
        try:
            session = stripe.checkout.Session.retrieve(session_id)
            if session.status == "complete":
                now = _now_utc()
                conn = get_db()
                try:
                    conn.execute(
                        """UPDATE subscriptions
                           SET is_paid = 1, status = 'active',
                               stripe_subscription_id = ?,
                               plan_name = 'monthly',
                               member_since = ?
                           WHERE user_id = ?""",
                        (session.subscription, now, user["user_id"]),
                    )
                    conn.commit()
                finally:
                    conn.close()
        except Exception as exc:
            logger.warning("Error verifying Stripe session %s: %s", session_id, exc)

    return templates.TemplateResponse(
        "billing/success.html",
        {"request": request, "tenant": tenant, "user": user},
    )


# ---------------------------------------------------------------------------
# GET /billing/cancel
# ---------------------------------------------------------------------------

@router.get("/billing/cancel")
async def billing_cancel(request: Request):
    try:
        user = require_auth(request)
    except _AuthRedirect as e:
        return e.response

    tenant = get_current_tenant(request)
    return templates.TemplateResponse(
        "billing/cancel.html",
        {"request": request, "tenant": tenant, "user": user},
    )


# ---------------------------------------------------------------------------
# POST /stripe/webhook
# ---------------------------------------------------------------------------

@router.post("/stripe/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    if not STRIPE_WEBHOOK_SECRET:
        logger.warning("STRIPE_WEBHOOK_SECRET not set — webhook received but not verified")
        return Response(content='{"received": true}', media_type="application/json")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, STRIPE_WEBHOOK_SECRET)
    except stripe.error.SignatureVerificationError:
        logger.warning("Stripe webhook signature verification failed")
        return Response(status_code=400)
    except Exception as exc:
        logger.warning("Stripe webhook error: %s", exc)
        return Response(status_code=400)

    event_type = event["type"]
    data = event["data"]["object"]

    conn = get_db()
    try:
        if event_type == "checkout.session.completed":
            user_id = data.get("metadata", {}).get("user_id")
            subscription_id = data.get("subscription")
            if user_id:
                now = _now_utc()
                conn.execute(
                    """UPDATE subscriptions
                       SET is_paid = 1, status = 'active',
                           stripe_subscription_id = ?,
                           plan_name = 'monthly',
                           member_since = ?
                       WHERE user_id = ?""",
                    (subscription_id, now, int(user_id)),
                )
                conn.commit()

        elif event_type == "customer.subscription.deleted":
            subscription_id = data.get("id")
            if subscription_id:
                conn.execute(
                    """UPDATE subscriptions
                       SET is_paid = 0, status = 'cancelled'
                       WHERE stripe_subscription_id = ?""",
                    (subscription_id,),
                )
                conn.commit()

        elif event_type == "invoice.payment_failed":
            stripe_customer_id = data.get("customer")
            if stripe_customer_id:
                conn.execute(
                    """UPDATE subscriptions
                       SET status = 'past_due'
                       WHERE stripe_customer_id = ?""",
                    (stripe_customer_id,),
                )
                conn.commit()

    finally:
        conn.close()

    return Response(content='{"received": true}', media_type="application/json")
