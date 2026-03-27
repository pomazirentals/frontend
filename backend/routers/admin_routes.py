import json
import logging
import os
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Form, Request
from fastapi.responses import JSONResponse

from auth import _AuthRedirect, require_admin
from database import get_db
from feature_flags import DEFAULT_FLAGS, get_feature_flags, set_feature_flag
from tenant import get_current_tenant
from templates_config import templates

router = APIRouter()
logger = logging.getLogger(__name__)

ALLOWED_PANELS = {
    "overview", "users", "guest_db", "moderation", "search_system",
    "billing", "verification", "system_admin", "tenant_mgmt", "performance", "ai_assistant",
}

def _now_utc() -> str:
    return datetime.now(timezone.utc).isoformat()


def _log_action(conn, admin_user_id, action, target, detail):
    conn.execute(
        "INSERT INTO admin_logs (admin_user_id, action, target, detail, created_at) VALUES (?,?,?,?,?)",
        (admin_user_id, action, target, detail, _now_utc()),
    )


# ---------------------------------------------------------------------------
# GET /admin
# ---------------------------------------------------------------------------

@router.get("/admin")
async def admin_main(request: Request):
    try:
        user = require_admin(request)
    except _AuthRedirect as e:
        return e.response
    tenant = get_current_tenant(request)
    return templates.TemplateResponse(
        "admin/admin_main.html",
        {"request": request, "tenant": tenant, "user": user, "active_panel": "overview"},
    )


# ---------------------------------------------------------------------------
# GET /admin/panel/{panel_name}
# ---------------------------------------------------------------------------

@router.get("/admin/panel/{panel_name}")
async def admin_panel(request: Request, panel_name: str):
    try:
        user = require_admin(request)
    except _AuthRedirect as e:
        return e.response

    if panel_name not in ALLOWED_PANELS:
        return JSONResponse({"error": "Panel not found"}, status_code=404)

    tenant = get_current_tenant(request)
    data = {}
    conn = get_db()
    try:
        if panel_name == "overview":
            data = {
                "total_users": conn.execute("SELECT COUNT(*) FROM users").fetchone()[0],
                "paid_users": conn.execute("SELECT COUNT(*) FROM subscriptions WHERE is_paid=1").fetchone()[0],
                "trial_users": conn.execute("SELECT COUNT(*) FROM subscriptions WHERE is_paid=0 AND status='trial'").fetchone()[0],
                "total_reports": conn.execute("SELECT COUNT(*) FROM guest_reports").fetchone()[0],
                "pending_reports": conn.execute("SELECT COUNT(*) FROM guest_reports WHERE status='pending'").fetchone()[0],
                "total_searches": conn.execute("SELECT COUNT(*) FROM search_history").fetchone()[0],
            }
            data["revenue_monthly"] = data["paid_users"] * 7
            data["recent_logs"] = [dict(r) for r in conn.execute(
                "SELECT * FROM admin_logs ORDER BY created_at DESC LIMIT 5"
            ).fetchall()]
            data["tenants"] = [dict(r) for r in conn.execute(
                "SELECT * FROM tenants WHERE active=1"
            ).fetchall()]

        elif panel_name == "users":
            rows = conn.execute("""
                SELECT u.id, u.email, u.name, u.signup_domain, u.is_verified, u.is_admin,
                       u.created_at, u.last_login, u.ip_address,
                       COALESCE(s.plan_name,'trial') as plan_name,
                       COALESCE(s.is_paid,0) as is_paid,
                       COALESCE(s.status,'trial') as status
                FROM users u
                LEFT JOIN subscriptions s ON s.user_id = u.id
                ORDER BY u.created_at DESC LIMIT 50
            """).fetchall()
            
            # Identify IPs used by multiple users or reports
            users_list = [dict(r) for r in rows]
            for user in users_list:
                user["flag_same_ip"] = False
                if user.get("ip_address") and user["ip_address"] != "unknown":
                    # check if other users share this IP
                    other_users = conn.execute("SELECT COUNT(*) FROM users WHERE ip_address=? AND id!=?", (user["ip_address"], user["id"])).fetchone()[0]
                    reports = conn.execute("SELECT COUNT(*) FROM guest_reports WHERE ip_address=?", (user["ip_address"],)).fetchone()[0]
                    if other_users > 0 or reports > 0:
                        user["flag_same_ip"] = True

            data["users"] = users_list

        elif panel_name == "guest_db":
            data["reports"] = [dict(r) for r in conn.execute(
                "SELECT * FROM guest_reports ORDER BY created_at DESC LIMIT 50"
            ).fetchall()]
            data["total"] = conn.execute("SELECT COUNT(*) FROM guest_reports").fetchone()[0]
            data["approved"] = conn.execute("SELECT COUNT(*) FROM guest_reports WHERE status='approved'").fetchone()[0]
            data["pending"] = conn.execute("SELECT COUNT(*) FROM guest_reports WHERE status='pending'").fetchone()[0]
            data["rejected"] = conn.execute("SELECT COUNT(*) FROM guest_reports WHERE status='rejected'").fetchone()[0]

        elif panel_name == "moderation":
            data["pending"] = [dict(r) for r in conn.execute(
                "SELECT * FROM guest_reports WHERE status='pending' ORDER BY created_at DESC"
            ).fetchall()]
            data["recent_approved"] = [dict(r) for r in conn.execute(
                "SELECT * FROM guest_reports WHERE status='approved' ORDER BY created_at DESC LIMIT 10"
            ).fetchall()]
            data["recent_rejected"] = [dict(r) for r in conn.execute(
                "SELECT * FROM guest_reports WHERE status='rejected' ORDER BY created_at DESC LIMIT 10"
            ).fetchall()]

        elif panel_name == "search_system":
            data["total_searches"] = conn.execute("SELECT COUNT(*) FROM search_history").fetchone()[0]
            data["searches_today"] = conn.execute(
                "SELECT COUNT(*) FROM search_history WHERE date(searched_at)=date('now')"
            ).fetchone()[0]
            top = conn.execute("""
                SELECT sh.user_id, COUNT(*) as cnt, MAX(sh.searched_at) as last_search, u.email
                FROM search_history sh
                LEFT JOIN users u ON u.id = sh.user_id
                GROUP BY sh.user_id ORDER BY cnt DESC LIMIT 10
            """).fetchall()
            data["top_searchers"] = [dict(r) for r in top]
            recent = conn.execute("""
                SELECT sh.*, u.email as user_email
                FROM search_history sh
                LEFT JOIN users u ON u.id = sh.user_id
                ORDER BY sh.searched_at DESC LIMIT 20
            """).fetchall()
            data["recent_searches"] = [dict(r) for r in recent]

        elif panel_name == "billing":
            data["paid"] = [dict(r) for r in conn.execute("""
                SELECT s.*, u.email FROM subscriptions s
                JOIN users u ON u.id = s.user_id
                WHERE s.is_paid=1
            """).fetchall()]
            trial_rows = [dict(r) for r in conn.execute("""
                SELECT s.*, u.email FROM subscriptions s
                JOIN users u ON u.id = s.user_id
                WHERE s.is_paid=0
            """).fetchall()]
            now = datetime.now(timezone.utc)
            for t in trial_rows:
                if t.get("trial_start"):
                    start = datetime.fromisoformat(t["trial_start"])
                    if start.tzinfo is None:
                        start = start.replace(tzinfo=timezone.utc)
                    t["days_remaining"] = max(0, 7 - (now - start).days)
                else:
                    t["days_remaining"] = 0
            data["trial"] = trial_rows
            data["cancelled"] = [dict(r) for r in conn.execute("""
                SELECT s.*, u.email FROM subscriptions s
                JOIN users u ON u.id = s.user_id
                WHERE s.status='cancelled'
            """).fetchall()]
            data["mrr"] = len(data["paid"]) * 7

        elif panel_name == "verification":
            data["unverified_users"] = [dict(r) for r in conn.execute(
                "SELECT * FROM users WHERE is_verified=0 ORDER BY created_at DESC"
            ).fetchall()]
            data["verified_count"] = conn.execute("SELECT COUNT(*) FROM users WHERE is_verified=1").fetchone()[0]
            data["unverified_count"] = conn.execute("SELECT COUNT(*) FROM users WHERE is_verified=0").fetchone()[0]
            data["pending_tokens"] = conn.execute(
                "SELECT COUNT(*) FROM verification_tokens WHERE used=0"
            ).fetchone()[0]
            data["feature_flags"] = get_feature_flags()
            data["twilio_configured"] = all(
                [
                    os.getenv("TWILIO_ACCOUNT_SID"),
                    os.getenv("TWILIO_AUTH_TOKEN"),
                    os.getenv("TWILIO_VERIFY_SERVICE_SID"),
                ]
            )

        elif panel_name == "system_admin":
            data["recent_logs"] = [dict(r) for r in conn.execute(
                "SELECT * FROM admin_logs ORDER BY created_at DESC LIMIT 50"
            ).fetchall()]
            data["feature_flags"] = get_feature_flags()

        elif panel_name == "tenant_mgmt":
            data["tenants"] = [dict(r) for r in conn.execute(
                "SELECT * FROM tenants ORDER BY created_at DESC"
            ).fetchall()]

        elif panel_name == "performance":
            tenants = conn.execute("SELECT * FROM tenants WHERE active=1").fetchall()
            by_domain = []
            for t in tenants:
                user_count = conn.execute(
                    "SELECT COUNT(*) FROM users WHERE signup_domain=?", (t["domain"],)
                ).fetchone()[0]
                paid_count = conn.execute(
                    "SELECT COUNT(*) FROM subscriptions s JOIN users u ON u.id=s.user_id WHERE u.signup_domain=? AND s.is_paid=1",
                    (t["domain"],),
                ).fetchone()[0]
                report_count = conn.execute(
                    "SELECT COUNT(*) FROM guest_reports WHERE tenant_id=?", (t["id"],)
                ).fetchone()[0]
                search_count = conn.execute(
                    "SELECT COUNT(*) FROM search_history WHERE tenant_id=?", (t["id"],)
                ).fetchone()[0]
                by_domain.append({
                    "domain": t["domain"],
                    "brand_name": t["brand_name"],
                    "primary_color": t["primary_color"],
                    "user_count": user_count,
                    "paid_count": paid_count,
                    "report_count": report_count,
                    "search_count": search_count,
                })
            by_domain.sort(key=lambda x: x["user_count"], reverse=True)
            data["by_domain"] = by_domain

        # ai_assistant: no query needed
    finally:
        conn.close()

    return templates.TemplateResponse(
        f"admin/panels/{panel_name}.html",
        {"request": request, "tenant": tenant, "user": user, "data": data},
    )


# ---------------------------------------------------------------------------
# POST /admin/panel/users/action
# ---------------------------------------------------------------------------

@router.post("/admin/panel/users/action")
async def users_action(
    request: Request,
    action: str = Form(...),
    user_id: int = Form(...),
):
    try:
        admin = require_admin(request)
    except _AuthRedirect as e:
        return e.response

    conn = get_db()
    try:
        if action == "verify":
            conn.execute("UPDATE users SET is_verified=1 WHERE id=?", (user_id,))
            detail = f"Verified user {user_id}"
        elif action == "make_admin":
            conn.execute("UPDATE users SET is_admin=1 WHERE id=?", (user_id,))
            detail = f"Made user {user_id} admin"
        elif action == "remove_admin":
            conn.execute("UPDATE users SET is_admin=0 WHERE id=?", (user_id,))
            detail = f"Removed admin from user {user_id}"
        elif action == "ban":
            conn.execute("UPDATE users SET signup_domain='__banned__' WHERE id=?", (user_id,))
            detail = f"Banned user {user_id}"
        elif action == "unban":
            conn.execute("UPDATE users SET signup_domain=NULL WHERE id=? AND signup_domain='__banned__'", (user_id,))
            detail = f"Unbanned user {user_id}"
        else:
            return JSONResponse({"success": False, "message": "Unknown action"})

        _log_action(conn, admin["user_id"], action, f"user:{user_id}", detail)
        conn.commit()
    finally:
        conn.close()

    return JSONResponse({"success": True, "message": detail})


# ---------------------------------------------------------------------------
# POST /admin/panel/moderation/action
# ---------------------------------------------------------------------------

@router.post("/admin/panel/moderation/action")
async def moderation_action(
    request: Request,
    action: str = Form(...),
    report_id: int = Form(...),
):
    try:
        admin = require_admin(request)
    except _AuthRedirect as e:
        return e.response

    status = "approved" if action == "approve" else "rejected"
    conn = get_db()
    try:
        conn.execute("UPDATE guest_reports SET status=? WHERE id=?", (status, report_id))
        _log_action(conn, admin["user_id"], action, f"report:{report_id}", f"Report {report_id} {status}")
        conn.commit()
    finally:
        conn.close()

    return JSONResponse({"success": True})


# ---------------------------------------------------------------------------
# POST /admin/panel/tenant_mgmt/save
# ---------------------------------------------------------------------------

@router.post("/admin/panel/tenant_mgmt/save")
async def tenant_save(
    request: Request,
    id: str = Form(default=""),
    domain: str = Form(...),
    brand_name: str = Form(...),
    logo_url: str = Form(default=""),
    primary_color: str = Form(default="#3b82f6"),
    active: str = Form(default="1"),
):
    try:
        admin = require_admin(request)
    except _AuthRedirect as e:
        return e.response

    active_val = 1 if str(active) in ("1", "true", "on") else 0
    conn = get_db()
    try:
        if id:
            conn.execute(
                "UPDATE tenants SET domain=?,brand_name=?,logo_url=?,primary_color=?,active=? WHERE id=?",
                (domain, brand_name, logo_url, primary_color, active_val, int(id)),
            )
            _log_action(conn, admin["user_id"], "update_tenant", f"tenant:{id}", f"Updated {domain}")
        else:
            conn.execute(
                "INSERT INTO tenants (domain,brand_name,logo_url,primary_color,active,created_at) VALUES (?,?,?,?,?,?)",
                (domain, brand_name, logo_url, primary_color, active_val, _now_utc()),
            )
            _log_action(conn, admin["user_id"], "create_tenant", f"domain:{domain}", f"Created {domain}")
        conn.commit()
    finally:
        conn.close()

    return JSONResponse({"success": True})


# ---------------------------------------------------------------------------
# POST /admin/panel/tenant_mgmt/delete
# ---------------------------------------------------------------------------

@router.post("/admin/panel/tenant_mgmt/delete")
async def tenant_delete(request: Request, tenant_id: int = Form(...)):
    try:
        admin = require_admin(request)
    except _AuthRedirect as e:
        return e.response

    conn = get_db()
    try:
        conn.execute("UPDATE tenants SET active=0 WHERE id=?", (tenant_id,))
        _log_action(conn, admin["user_id"], "deactivate_tenant", f"tenant:{tenant_id}", "Soft deleted")
        conn.commit()
    finally:
        conn.close()

    return JSONResponse({"success": True})


# ---------------------------------------------------------------------------
# POST /admin/panel/system_admin/toggle
# ---------------------------------------------------------------------------

@router.post("/admin/panel/system_admin/toggle")
async def system_toggle(
    request: Request,
    setting_name: str = Form(...),
    value: str = Form(...),
):
    try:
        require_admin(request)
    except _AuthRedirect as e:
        return e.response

    val = int(value) if value in ("0", "1") else 0
    if setting_name not in DEFAULT_FLAGS:
        return JSONResponse({"success": False, "message": "Unknown setting"}, status_code=400)
    set_feature_flag(setting_name, val)
    return JSONResponse({"success": True, "setting": setting_name, "value": val})


# ---------------------------------------------------------------------------
# POST /admin/ai-assistant
# ---------------------------------------------------------------------------

@router.post("/admin/ai-assistant")
async def ai_assistant(request: Request, message: str = Form(...)):
    try:
        require_admin(request)
    except _AuthRedirect as e:
        return e.response

    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        return JSONResponse({"reply": "AI Assistant is not configured. Add ANTHROPIC_API_KEY to .env to enable."})

    conn = get_db()
    try:
        stats = {
            "total_users": conn.execute("SELECT COUNT(*) FROM users").fetchone()[0],
            "paid_users": conn.execute("SELECT COUNT(*) FROM subscriptions WHERE is_paid=1").fetchone()[0],
            "trial_users": conn.execute("SELECT COUNT(*) FROM subscriptions WHERE is_paid=0").fetchone()[0],
            "total_reports": conn.execute("SELECT COUNT(*) FROM guest_reports").fetchone()[0],
            "pending_reports": conn.execute("SELECT COUNT(*) FROM guest_reports WHERE status='pending'").fetchone()[0],
            "total_searches": conn.execute("SELECT COUNT(*) FROM search_history").fetchone()[0],
            "total_tenants": conn.execute("SELECT COUNT(*) FROM tenants WHERE active=1").fetchone()[0],
        }
    finally:
        conn.close()

    try:
        import anthropic
        client = anthropic.Anthropic(api_key=api_key)
        system_prompt = (
            f"You are an admin assistant for GuestGuard, a guest-screening SaaS platform.\n"
            f"Current platform stats: {stats}\n"
            f"Answer admin questions about the platform, users, reports, and subscriptions.\n"
            f"Be concise and data-driven."
        )
        response = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=1024,
            system=system_prompt,
            messages=[{"role": "user", "content": message}],
        )
        reply = response.content[0].text
    except Exception as exc:
        logger.warning("AI assistant error: %s", exc)
        reply = f"Error contacting AI service: {exc}"

    return JSONResponse({"reply": reply})
