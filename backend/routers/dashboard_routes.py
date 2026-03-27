import json
import logging
import os
import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional

import aiofiles
from fastapi import APIRouter, File, Form, Request, UploadFile
from fastapi.responses import RedirectResponse

from auth import _AuthRedirect, require_auth
from database import get_db
from search_logic import calculate_confidence
from tenant import get_current_tenant
from templates_config import templates

router = APIRouter()
logger = logging.getLogger(__name__)

UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _now_utc() -> str:
    return datetime.now(timezone.utc).isoformat()


def _resolve_tenant_id(tenant: dict) -> int | None:
    if tenant["id"] is not None:
        return tenant["id"]
    conn = get_db()
    try:
        row = conn.execute(
            "SELECT id FROM tenants WHERE domain = 'localhost' LIMIT 1"
        ).fetchone()
        return row["id"] if row else None
    finally:
        conn.close()


def _get_subscription(user_id: int) -> dict:
    conn = get_db()
    try:
        row = conn.execute(
            "SELECT * FROM subscriptions WHERE user_id = ?", (user_id,)
        ).fetchone()
        return dict(row) if row else {
            "user_id": user_id, "plan_name": "trial", "is_paid": 0,
            "trial_start": _now_utc(), "trial_searches_used": 0, "status": "trial",
        }
    finally:
        conn.close()


def get_days_remaining(trial_start_str: Optional[str]) -> int:
    if not trial_start_str:
        return 0
    trial_start = datetime.fromisoformat(trial_start_str)
    if trial_start.tzinfo is None:
        trial_start = trial_start.replace(tzinfo=timezone.utc)
    expires = trial_start + timedelta(days=7)
    remaining = (expires - datetime.now(timezone.utc)).days
    return max(0, remaining)


def _check_trial(sub: dict) -> bool:
    """Return True if user is allowed to search."""
    if sub.get("is_paid"):
        return True
    trial_start = sub.get("trial_start")
    searches_used = sub.get("trial_searches_used", 0)
    if searches_used >= 3:
        return False
    if trial_start:
        start = datetime.fromisoformat(trial_start)
        if start.tzinfo is None:
            start = start.replace(tzinfo=timezone.utc)
        if datetime.now(timezone.utc) > start + timedelta(days=7):
            return False
    return True


def _run_search(query: dict, tenant_id: int) -> list:
    """Query guest_reports and run calculate_confidence on each record."""
    conn = get_db()
    try:
        rows = conn.execute(
            """SELECT id, first_name, last_name, phone, city, state,
                      report_reason, incident_flags, guest_rating, stay_date
               FROM guest_reports WHERE tenant_id = ?""",
            (tenant_id,),
        ).fetchall()
    finally:
        conn.close()

    results = []
    for row in rows:
        candidate = (
            row["id"], row["first_name"], row["last_name"],
            row["phone"], row["city"], row["state"], row["report_reason"],
        )
        score = calculate_confidence(candidate, query)

        temp = "COLD"
        if score > 85:
            temp = "HOT"
        elif score > 50:
            temp = "WARM"

        # Parse incident_flags
        try:
            flags = json.loads(row["incident_flags"]) if row["incident_flags"] else []
        except Exception:
            flags = []

        results.append({
            "id": row["id"],
            "match_score": score,
            "temperature": temp,
            "first_name": row["first_name"] or "",
            "last_name": row["last_name"] or "",
            "city": row["city"] or "",
            "state": row["state"] or "",
            "report_reason": row["report_reason"] or "",
            "incident_flags": flags,
            "guest_rating": row["guest_rating"],
            "stay_date": row["stay_date"] or "",
        })

    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results


# ---------------------------------------------------------------------------
# Dashboard
# ---------------------------------------------------------------------------

@router.get("/dashboard")
async def dashboard(request: Request, reported: str = None):
    try:
        user = require_auth(request)
    except _AuthRedirect as e:
        return e.response

    tenant = get_current_tenant(request)
    tenant_id = _resolve_tenant_id(tenant)
    if not tenant_id:
        return RedirectResponse("/login", status_code=302)
    conn = get_db()
    try:
        total_searches = conn.execute(
            "SELECT COUNT(*) FROM search_history WHERE user_id = ?",
            (user["user_id"],),
        ).fetchone()[0]

        flagged_guests = conn.execute(
            "SELECT COUNT(*) FROM guest_reports WHERE status = 'pending' AND tenant_id = ?",
            (tenant_id,),
        ).fetchone()[0]

        active_reports = conn.execute(
            "SELECT COUNT(*) FROM guest_reports WHERE status = 'approved' AND tenant_id = ?",
            (tenant_id,),
        ).fetchone()[0]

        recent_rows = conn.execute(
            """SELECT id, first_name, last_name, incident_flags, created_at, guest_rating
               FROM guest_reports WHERE tenant_id = ?
               ORDER BY created_at DESC LIMIT 10""",
            (tenant_id,),
        ).fetchall()
    finally:
        conn.close()

    recent_reports = []
    for row in recent_rows:
        try:
            flags = json.loads(row["incident_flags"]) if row["incident_flags"] else []
        except Exception:
            flags = []
        recent_reports.append({
            "id": row["id"],
            "first_name": row["first_name"] or "",
            "last_name": row["last_name"] or "",
            "incident_flags": flags,
            "created_at": row["created_at"] or "",
            "guest_rating": row["guest_rating"],
        })

    subscription = _get_subscription(user["user_id"])

    return templates.TemplateResponse(
        "dashboard.html",
        {
            "request": request,
            "tenant": tenant,
            "user": user,
            "stats": {
                "total_searches": total_searches,
                "flagged_guests": flagged_guests,
                "active_reports": active_reports,
            },
            "recent_reports": recent_reports,
            "subscription": subscription,
            "reported": reported == "1",
        },
    )


# ---------------------------------------------------------------------------
# Search
# ---------------------------------------------------------------------------

@router.get("/search")
async def search_get(request: Request):
    try:
        user = require_auth(request)
    except _AuthRedirect as e:
        return e.response

    tenant = get_current_tenant(request)
    tenant_id = _resolve_tenant_id(tenant)
    if not tenant_id:
        return RedirectResponse("/login", status_code=302)
    subscription = _get_subscription(user["user_id"])
    days_remaining = get_days_remaining(subscription.get("trial_start"))

    return templates.TemplateResponse(
        "search.html",
        {
            "request": request,
            "tenant": tenant,
            "user": user,
            "subscription": subscription,
            "results": None,
            "gate": False,
            "days_remaining": days_remaining,
        },
    )


@router.post("/search")
async def search_post(
    request: Request,
    first_name: str = Form(default=""),
    last_name: str = Form(default=""),
    phone: str = Form(default=""),
    city: str = Form(default=""),
    state: str = Form(default=""),
):
    try:
        user = require_auth(request)
    except _AuthRedirect as e:
        return e.response

    tenant = get_current_tenant(request)
    tenant_id = _resolve_tenant_id(tenant)
    if not tenant_id:
        return RedirectResponse("/login", status_code=302)
    subscription = _get_subscription(user["user_id"])
    days_remaining = get_days_remaining(subscription.get("trial_start"))

    if not _check_trial(subscription):
        return templates.TemplateResponse(
            "search.html",
            {
                "request": request,
                "tenant": tenant,
                "user": user,
                "subscription": subscription,
                "results": None,
                "gate": True,
                "days_remaining": 0,
            },
        )

    query = {
        "first_name": first_name.strip(),
        "last_name": last_name.strip(),
        "phone": phone.strip(),
        "city": city.strip(),
        "state": state.strip(),
    }

    results = _run_search(query, tenant_id)

    # Log search
    top = results[0] if results else None
    now = _now_utc()
    conn = get_db()
    try:
        conn.execute(
            """INSERT INTO search_history
               (tenant_id, user_id, query_text, guest_name, match_score, risk_level, matched_report_id, searched_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                tenant_id,
                user["user_id"],
                json.dumps(query),
                f"{first_name} {last_name}".strip(),
                top["match_score"] if top else 0,
                top["temperature"].lower() if top else "low",
                top["id"] if top else None,
                now,
            ),
        )
        if not subscription.get("is_paid"):
            conn.execute(
                "UPDATE subscriptions SET trial_searches_used = trial_searches_used + 1 WHERE user_id = ?",
                (user["user_id"],),
            )
        conn.commit()
    finally:
        conn.close()

    # Refresh subscription after update
    subscription = _get_subscription(user["user_id"])
    days_remaining = get_days_remaining(subscription.get("trial_start"))

    return templates.TemplateResponse(
        "search.html",
        {
            "request": request,
            "tenant": tenant,
            "user": user,
            "subscription": subscription,
            "results": results,
            "gate": False,
            "days_remaining": days_remaining,
            "query": query,
        },
    )


# ---------------------------------------------------------------------------
# Report submission (authenticated)
# ---------------------------------------------------------------------------

@router.get("/report")
async def report_get(request: Request, error: str = None):
    try:
        user = require_auth(request)
    except _AuthRedirect as e:
        return e.response

    tenant = get_current_tenant(request)
    tenant_id = _resolve_tenant_id(tenant)
    if not tenant_id:
        return RedirectResponse("/login", status_code=302)
    return templates.TemplateResponse(
        "report.html",
        {"request": request, "tenant": tenant, "user": user, "error": error},
    )


@router.post("/report")
async def report_post(
    request: Request,
    first_name: str = Form(...),
    last_name: str = Form(default=""),
    airbnb_vrbo_profile: str = Form(default=""),
    phone: str = Form(default=""),
    email: str = Form(default=""),
    city: str = Form(default=""),
    state: str = Form(default=""),
    prev_group_size: str = Form(default=""),
    prev_stay_length: str = Form(default=""),
    stay_date: str = Form(default=""),
    guest_rating: str = Form(default=""),
    incident_flags: list = Form(default=[]),
    details_of_incident: str = Form(...),
    privacy_agreed: str = Form(default=None),
    photo1: UploadFile = File(default=None),
    photo2: UploadFile = File(default=None),
):
    try:
        user = require_auth(request)
    except _AuthRedirect as e:
        return e.response

    tenant = get_current_tenant(request)
    tenant_id = _resolve_tenant_id(tenant)
    if not tenant_id:
        return RedirectResponse("/login", status_code=302)

    if not privacy_agreed:
        return templates.TemplateResponse(
            "report.html",
            {
                "request": request,
                "tenant": tenant,
                "user": user,
                "error": "You must agree to the Privacy Policy to submit a report.",
            },
            status_code=422,
        )

    # Abuse protection: max 5 reports per day per user
    conn = get_db()
    try:
        reports_today = conn.execute(
            "SELECT COUNT(*) FROM guest_reports WHERE submitted_by_user_id = ? AND date(created_at)=date('now')",
            (user["user_id"],),
        ).fetchone()[0]
    finally:
        conn.close()
    if reports_today >= 5:
        return templates.TemplateResponse(
            "report.html",
            {
                "request": request,
                "tenant": tenant,
                "user": user,
                "error": "Daily report limit reached (5/day). Please try again tomorrow.",
            },
            status_code=429,
        )

    # Handle image uploads
    uploaded_paths = []
    for photo in [photo1, photo2]:
        if photo and photo.filename:
            allowed = {"image/jpeg", "image/png", "image/gif", "image/webp"}
            if photo.content_type in allowed:
                ext = photo.filename.rsplit(".", 1)[-1] if "." in photo.filename else "jpg"
                filename = f"{uuid.uuid4().hex}.{ext}"
                filepath = os.path.join(UPLOAD_DIR, filename)
                async with aiofiles.open(filepath, "wb") as f:
                    await f.write(await photo.read())
                uploaded_paths.append(f"/static/uploads/{filename}")

    conn = get_db()
    try:
        conn.execute(
            """INSERT INTO guest_reports
               (tenant_id, submitted_by_user_id, first_name, last_name, phone, email,
                airbnb_vrbo_profile, city, state, prev_group_size, prev_stay_length,
                stay_date, guest_rating, incident_flags, details_of_incident,
                uploaded_images, status, ip_address, submitted_ip, created_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?)""",
            (
                tenant_id,
                user["user_id"],
                first_name.strip(),
                last_name.strip(),
                phone.strip(),
                email.strip(),
                airbnb_vrbo_profile.strip(),
                city.strip(),
                state,
                int(prev_group_size) if prev_group_size else None,
                int(prev_stay_length) if prev_stay_length else None,
                stay_date or None,
                int(guest_rating) if guest_rating else None,
                json.dumps(incident_flags) if incident_flags else "[]",
                details_of_incident.strip(),
                json.dumps(uploaded_paths),
                request.client.host if request.client and request.client.host else "unknown",
                request.client.host if request.client and request.client.host else "unknown",
                _now_utc(),
            ),
        )
        conn.commit()
    finally:
        conn.close()

    return RedirectResponse("/dashboard?reported=1", status_code=302)
