# PHASE 5 — Stripe Billing + Upgrade Flow
# CURSOR: Read this entire file before writing any code.

---

## CONTEXT

Phases 1–4 are complete:
- DB schema, tenant system, auth, login/register templates done
- Dashboard, search, report pages done
- Trial enforcement logic (7 days OR 3 searches) is enforced in /search POST

**Your job in Phase 5:** Wire up Stripe so users can upgrade from trial to paid ($7/month).

---

## BUSINESS RULES

- Price: **$7/month** recurring subscription
- Trial: 7 days OR 3 searches, whichever comes first (already enforced — do not re-implement)
- When trial expires → user sees upgrade gate on /search
- Upgrade gate has "Upgrade — $7/month" button → `/billing/upgrade`
- Stripe Checkout handles payment
- On successful payment → subscription row updated to `is_paid=1`, `status='active'`
- On subscription cancelled or payment failed → subscription row updated to `is_paid=0`, `status='cancelled'` or `'past_due'`

---

## WHAT TO BUILD

### 1. `backend/routers/billing_routes.py`

#### GET /billing/upgrade
- Call `require_auth(request)` — redirect to /login if not authenticated
- Get tenant from `get_current_tenant(request)`
- Render `templates/billing/upgrade.html` with `tenant`, `user`

#### POST /billing/create-checkout
- Call `require_auth(request)`
- Get tenant
- Get user's subscription row from DB
- If already paid (`is_paid=1`) → redirect to /dashboard with message
- Create or retrieve Stripe customer:
  - If `subscriptions.stripe_customer_id` is null → `stripe.Customer.create(email=user["email"], metadata={"user_id": user["user_id"], "tenant_id": tenant["id"]})`
  - If already exists → use existing
- Update `subscriptions.stripe_customer_id` in DB
- Create Stripe Checkout Session:
  ```python
  session = stripe.checkout.Session.create(
      customer=stripe_customer_id,
      payment_method_types=["card"],
      line_items=[{"price": STRIPE_PRICE_ID, "quantity": 1}],
      mode="subscription",
      success_url=f"https://{request.headers['host']}/billing/success?session_id={{CHECKOUT_SESSION_ID}}",
      cancel_url=f"https://{request.headers['host']}/billing/cancel",
      metadata={"user_id": user["user_id"], "tenant_id": tenant["id"]},
  )
  ```
- Redirect to `session.url`

#### GET /billing/success
- Call `require_auth(request)`
- Get `session_id` from query params
- Retrieve the Stripe Checkout Session: `stripe.checkout.Session.retrieve(session_id)`
- If session status is "complete":
  - Get subscription_id from session (`session.subscription`)
  - Update DB: `subscriptions` row for this user → `is_paid=1`, `status='active'`, `stripe_subscription_id=session.subscription`, `plan_name='monthly'`, `member_since=now UTC ISO`
- Get tenant, render `templates/billing/success.html` with `tenant`, `user`

#### GET /billing/cancel
- Call `require_auth(request)`
- Get tenant
- Render `templates/billing/cancel.html` with `tenant`, `user`

#### POST /stripe/webhook
- **No auth required** — this is called by Stripe directly
- Read raw request body: `payload = await request.body()`
- Get Stripe signature: `sig_header = request.headers.get("stripe-signature")`
- Verify webhook signature:
  ```python
  try:
      event = stripe.Webhook.construct_event(payload, sig_header, STRIPE_WEBHOOK_SECRET)
  except stripe.error.SignatureVerificationError:
      return Response(status_code=400)
  ```
- Handle these events:

  **`checkout.session.completed`:**
  - Get `user_id` from `event["data"]["object"]["metadata"]["user_id"]`
  - Get `subscription_id` from `event["data"]["object"]["subscription"]`
  - Update subscriptions: `is_paid=1`, `status='active'`, `stripe_subscription_id=subscription_id`, `plan_name='monthly'`, `member_since=now UTC ISO`

  **`customer.subscription.deleted`:**
  - Get `stripe_subscription_id` from `event["data"]["object"]["id"]`
  - Find subscription row by `stripe_subscription_id`
  - Update: `is_paid=0`, `status='cancelled'`

  **`invoice.payment_failed`:**
  - Get `stripe_customer_id` from `event["data"]["object"]["customer"]`
  - Find subscription row by `stripe_customer_id`
  - Update: `status='past_due'` (keep `is_paid=1` until actually cancelled — Stripe retries)

- Return `Response(content='{"received": true}', media_type="application/json")`

---

### 2. Stripe initialization

At the top of `billing_routes.py`:

```python
import os
import stripe
from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse, Response
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv
from auth import require_auth, _AuthRedirect
from tenant import get_current_tenant
from database import get_db
from datetime import datetime, timezone

load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "")
STRIPE_PRICE_ID = os.getenv("STRIPE_PRICE_ID", "")

router = APIRouter()
templates = Jinja2Templates(directory="templates")
```

---

### 3. Templates

#### `backend/templates/billing/upgrade.html`

Layout: same sidebar as dashboard (copy sidebar partial or duplicate). Active nav: none.

Main content — centered upgrade card (max-width 560px, margin 60px auto):

White card (border-radius 20px, box-shadow, padding 48px 40px, text-align center):

- Icon: large shield or lock SVG (64px, color `{{ tenant.primary_color }}`)
- Heading: "Upgrade to Full Access" — 26px, font-weight 700, color #111, margin-top 20px
- Subheading: "You've reached your free trial limit. Unlock unlimited searches to keep protecting your property." — 15px, color #888, margin: 12px auto 32px, max-width 400px

Pricing block (background #f8fafc, border-radius 16px, padding 24px, margin-bottom 32px):
- Price: `<span style="font-size:48px; font-weight:800; color:#111">$7</span><span style="font-size:18px; color:#888">/month</span>`
- Features list (text-align left, margin-top 16px, display inline-block):
  - ✓ Unlimited guest searches
  - ✓ Full guest history database
  - ✓ Report submission
  - ✓ Priority support
  - Each item: 14px, color #555, padding 6px 0, flex with green checkmark SVG left

Form (action="/billing/create-checkout", method="POST"):
- Submit button: "Start Subscription — $7/month" — full width, height 52px, background `{{ tenant.primary_color }}`, white text, font-weight 700, border-radius 10px, font-size 16px, border none, cursor pointer
- Sub-text below button: "Cancel anytime. Secure payment via Stripe." — 12px, color #aaa, margin-top 10px

Back link: "← Back to Dashboard" — link to /dashboard, color #888, font-size 13px, margin-top 20px, display block

#### `backend/templates/billing/success.html`

Same sidebar layout. Main content — centered card (max-width 480px, margin 80px auto):

White card, padding 48px 40px, text-align center:
- Large animated checkmark SVG (green, 64px) — use CSS animation: scale in
- Heading: "You're all set!" — 26px, font-weight 700, color #111
- Body: "Your subscription is now active. You have unlimited access to the guest database." — 15px, color #888, margin: 12px 0 32px
- Button: "Go to Dashboard" → /dashboard — brand color, full width, height 48px, rounded, white text, font-weight 700
- Small text: "A receipt has been sent to your email." — 12px, color #aaa, margin-top 12px

CSS for checkmark animation:
```css
@keyframes checkIn {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.check-icon { animation: checkIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
```

#### `backend/templates/billing/cancel.html`

Same sidebar layout. Main content — centered card (max-width 480px, margin 80px auto):

White card, padding 48px 40px, text-align center:
- Sad face or X icon SVG (grey, 56px)
- Heading: "Payment cancelled"
- Body: "No charge was made. You can upgrade whenever you're ready."
- Two buttons stacked:
  - "Try Again" → /billing/upgrade — brand color, full width, height 44px
  - "Back to Dashboard" → /dashboard — outline style, full width, height 44px, margin-top 10px

---

### 4. Billing CSS

Add to `backend/static/css/dashboard.css` (append, do not replace):

```css
/* Billing pages */
.billing-card {
  max-width: 560px; margin: 60px auto;
  background: #fff; border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 48px 40px; text-align: center;
}
.billing-price-block {
  background: #f8fafc; border-radius: 16px;
  padding: 24px; margin-bottom: 32px;
}
.billing-price { font-size: 48px; font-weight: 800; color: #111; line-height: 1; }
.billing-price-period { font-size: 18px; color: #888; }
.feature-list { text-align: left; display: inline-block; margin-top: 16px; }
.feature-item {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; color: #555; padding: 6px 0;
}
.feature-item svg { color: #22c55e; flex-shrink: 0; }
.btn-upgrade-main {
  width: 100%; height: 52px; background: var(--primary);
  color: #fff; font-weight: 700; border: none;
  border-radius: 10px; font-size: 16px; font-family: inherit;
  cursor: pointer; transition: opacity 0.15s;
}
.btn-upgrade-main:hover { opacity: 0.88; }
.btn-outline {
  width: 100%; height: 44px;
  background: #fff; border: 1px solid #e2e8f0;
  color: #555; font-weight: 600; border-radius: 8px;
  font-size: 14px; font-family: inherit; cursor: pointer;
  transition: background 0.15s; text-decoration: none;
  display: flex; align-items: center; justify-content: center;
}
.btn-outline:hover { background: #f8fafc; }

@keyframes checkIn {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.check-icon { animation: checkIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
```

---

## RULES

1. Stripe webhook endpoint (`POST /stripe/webhook`) must receive the **raw** request body — use `await request.body()`, do NOT parse it as JSON or form data first
2. Never trust client-side session_id alone to grant access — always verify with `stripe.checkout.Session.retrieve()`
3. All DB updates from webhooks use `stripe_customer_id` or `stripe_subscription_id` as the lookup key — never `user_id` from webhook payload directly (metadata can be spoofed if webhook is not verified — signature verification is the guard)
4. If `STRIPE_SECRET_KEY` is empty → log warning on startup, billing routes return a 503 with a helpful error page rather than crashing the whole app
5. Never hardcode `tenant_id = 1`
6. All DB connections closed in try/finally
7. `require_auth()` raises `_AuthRedirect` — wrap all protected handlers

---

## FILES TO CREATE / MODIFY

| Action | File |
|---|---|
| MODIFY | `backend/routers/billing_routes.py` |
| CREATE | `backend/templates/billing/upgrade.html` |
| CREATE | `backend/templates/billing/success.html` |
| CREATE | `backend/templates/billing/cancel.html` |
| MODIFY | `backend/static/css/dashboard.css` — append billing styles |

---

## WHEN PHASE 5 IS COMPLETE

Update `PROGRESS.md` — mark these items as done:
- [x] Stripe integration: $7/month subscription + webhooks

Then STOP. Do not start Phase 6 until instructed.
