import logging
import os
import secrets
import smtplib
import json
from datetime import datetime, timedelta, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from authlib.integrations.starlette_client import OAuth
from fastapi import APIRouter, Form, Request
from fastapi.responses import RedirectResponse

from auth import (
    clear_auth_cookie,
    create_access_token,
    get_current_user,
    hash_password,
    set_auth_cookie,
    verify_password,
)
from database import get_db
from feature_flags import get_feature_flags, is_feature_enabled
from tenant import get_current_tenant
from templates_config import templates

router = APIRouter()
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# OAuth setup
# ---------------------------------------------------------------------------

oauth = OAuth()

oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)

oauth.register(
    name="facebook",
    client_id=os.getenv("FACEBOOK_APP_ID"),
    client_secret=os.getenv("FACEBOOK_APP_SECRET"),
    access_token_url="https://graph.facebook.com/oauth/access_token",
    authorize_url="https://www.facebook.com/dialog/oauth",
    api_base_url="https://graph.facebook.com/",
    client_kwargs={"scope": "email"},
)


# ---------------------------------------------------------------------------
# Email helper
# ---------------------------------------------------------------------------

def send_email(to: str, subject: str, html_body: str) -> None:
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = os.getenv("SMTP_PORT", "587")
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")
    from_email = os.getenv("FROM_EMAIL")

    if not all([smtp_host, smtp_port, smtp_user, smtp_password, from_email]):
        logger.warning("SMTP not fully configured — skipping email to %s", to)
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = from_email
    msg["To"] = to
    msg.attach(MIMEText(html_body, "html"))

    try:
        with smtplib.SMTP(smtp_host, int(smtp_port)) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(from_email, to, msg.as_string())
    except Exception as exc:
        logger.warning("Failed to send email to %s: %s", to, exc)


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _now_utc() -> str:
    return datetime.now(timezone.utc).isoformat()


def _resolve_tenant_id(tenant: dict) -> int | None:
    """Return tenant id; if None (default fallback), look up localhost row."""
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


def _process_pending_report(user_id: int, request: Request, conn):
    """If there's a pending report in the session, assign it to the new user and save to DB."""
    pending = request.session.pop("pending_report", None)
    if not pending:
        return
    
    tenant_id = pending.get("tenant_id", 1)
    
    # Store images as JSON array
    images_json = json.dumps(pending.get("uploaded_paths", []))
    flags_json = json.dumps(pending.get("incident_flags", []))
    
    now = _now_utc()
    conn.execute(
        """INSERT INTO guest_reports
           (tenant_id, submitted_by_user_id, first_name, last_name, phone, email,
            airbnb_vrbo_profile, city, state, prev_group_size, prev_stay_length,
            stay_date, guest_rating, incident_flags, report_reason, details_of_incident,
            uploaded_images, status, ip_address, submitted_ip, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?)""",
        (
            tenant_id,
            user_id,
            pending.get("first_name"),
            pending.get("last_name"),
            pending.get("phone"),
            pending.get("email"),
            pending.get("airbnb_vrbo_profile"),
            pending.get("city"),
            pending.get("state"),
            pending.get("prev_group_size"),
            pending.get("prev_stay_length"),
            pending.get("stay_date"),
            pending.get("guest_rating"),
            flags_json,
            "Public Report", # report_reason
            pending.get("details_of_incident"),
            images_json,
            pending.get("ip_address"),
            pending.get("ip_address"),
            now
        )
    )

def _get_or_create_oauth_user(
    tenant_id: int, email: str, name: str, signup_domain: str, request: Request
) -> dict:
    """Look up user by email; create if missing (OAuth flow). Returns user row dict."""
    conn = get_db()
    try:
        row = conn.execute(
            "SELECT id, tenant_id, email, name, is_verified, is_admin FROM users WHERE email = ?",
            (email,),
        ).fetchone()
        if row:
            return dict(row)

        now = _now_utc()
        client_ip = request.client.host if request.client and request.client.host else "unknown"

        cursor = conn.cursor()
        cursor.execute(
            """INSERT INTO users
               (tenant_id, email, password_hash, name, is_verified, is_admin, signup_domain, ip_address, signup_ip, created_at)
               VALUES (?, ?, ?, ?, 1, 0, ?, ?, ?, ?)""",
            (tenant_id, email, "*OAUTH*", name, signup_domain, client_ip, client_ip, now),
        )
        user_id = cursor.lastrowid

        cursor.execute(
            """INSERT INTO subscriptions
               (tenant_id, user_id, plan_name, is_paid, trial_start, trial_searches_used, status)
               VALUES (?, ?, 'trial', 0, ?, 0, 'trial')""",
            (tenant_id, user_id, now),
        )
        
        # Check for pending report from public funnel
        _process_pending_report(user_id, request, conn)
        
        conn.commit()

        return {
            "id": user_id,
            "tenant_id": tenant_id,
            "email": email,
            "name": name,
            "is_verified": 1,
            "is_admin": 0,
        }
    finally:
        conn.close()


# ---------------------------------------------------------------------------
# Login
# ---------------------------------------------------------------------------

@router.get("/login")
async def login_get(request: Request, reset: str = None, error: str = None):
    if get_current_user(request):
        return RedirectResponse("/dashboard", status_code=302)
    tenant = get_current_tenant(request)
    return templates.TemplateResponse(
        "login.html",
        {
            "request": request,
            "tenant": tenant,
            "error": error,
            "reset": reset == "1",
            "unverified_banner": False,
        },
    )


@router.post("/login")
async def login_post(
    request: Request,
    email: str = Form(...),
    password: str = Form(...),
    remember_me: str = Form(default=None),
):
    tenant = get_current_tenant(request)

    conn = get_db()
    try:
        user = conn.execute(
            "SELECT id, tenant_id, email, name, password_hash, is_verified, is_admin "
            "FROM users WHERE email = ?",
            (email.lower().strip(),),
        ).fetchone()
    finally:
        conn.close()

    if not user or not verify_password(password, user["password_hash"]):
        return templates.TemplateResponse(
            "login.html",
            {
                "request": request,
                "tenant": tenant,
                "error": "Invalid email or password.",
                "reset": False,
                "unverified_banner": False,
            },
            status_code=401,
        )

    token = create_access_token(
        user_id=user["id"],
        tenant_id=user["tenant_id"],
        email=user["email"],
        is_admin=bool(user["is_admin"]),
        name=user["name"] or "",
    )

    # Update last_login
    client_ip = request.client.host if request.client and request.client.host else "unknown"
    conn = get_db()
    try:
        conn.execute(
            "UPDATE users SET last_login = ?, login_ip = ? WHERE id = ?",
            (_now_utc(), client_ip, user["id"]),
        )
        conn.commit()
    finally:
        conn.close()

    response = RedirectResponse("/dashboard", status_code=302)
    set_auth_cookie(response, token)

    if not user["is_verified"]:
        # Allow login but show banner — handled via redirect with query param
        # We set the cookie and redirect; dashboard will detect unverified state
        pass

    return response


# ---------------------------------------------------------------------------
# Register
# ---------------------------------------------------------------------------

@router.get("/register")
async def register_get(request: Request):
    if get_current_user(request):
        return RedirectResponse("/dashboard", status_code=302)
    tenant = get_current_tenant(request)
    flags = get_feature_flags()
    twilio_enabled = flags.get("twilio_verification", 0) == 1
    return templates.TemplateResponse(
        "register.html",
        {
            "request": request,
            "tenant": tenant,
            "error": None,
            "twilio_enabled": twilio_enabled,
        },
    )


@router.post("/register")
async def register_post(
    request: Request,
    full_name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    confirm_password: str = Form(...),
    phone: str = Form(default=""),
):
    tenant = get_current_tenant(request)
    email = email.lower().strip()

    def re_render(error_msg: str):
        flags = get_feature_flags()
        return templates.TemplateResponse(
            "register.html",
            {
                "request": request,
                "tenant": tenant,
                "error": error_msg,
                "twilio_enabled": flags.get("twilio_verification", 0) == 1,
            },
            status_code=422,
        )

    if password != confirm_password:
        return re_render("Passwords do not match.")

    if len(password) < 8:
        return re_render("Password must be at least 8 characters.")

    conn = get_db()
    try:
        existing = conn.execute(
            "SELECT id FROM users WHERE email = ?", (email,)
        ).fetchone()
        if existing:
            return re_render("An account with that email already exists.")

        tenant_id = _resolve_tenant_id(tenant)
        if not tenant_id:
            return re_render("Could not determine tenant. Please try again.")

        now = _now_utc()
        expires = (datetime.now(timezone.utc) + timedelta(hours=24)).isoformat()
        client_ip = request.client.host if request.client and request.client.host else "unknown"

        cursor = conn.cursor()
        cursor.execute(
            """INSERT INTO users
               (tenant_id, email, password_hash, name, phone, phone_verified, is_verified, is_admin, signup_domain, ip_address, signup_ip, created_at)
               VALUES (?, ?, ?, ?, ?, 0, 0, 0, ?, ?, ?, ?)""",
            (tenant_id, email, hash_password(password), full_name, phone, request.headers.get("host", "localhost"), client_ip, client_ip, now),
        )
        user_id = cursor.lastrowid

        # Same-IP flag for abuse monitoring
        same_ip_count = conn.execute(
            "SELECT COUNT(*) FROM users WHERE signup_ip = ? AND id != ?",
            (client_ip, user_id),
        ).fetchone()[0]
        if same_ip_count > 0:
            conn.execute(
                "INSERT INTO admin_logs (admin_user_id, action, target, detail, created_at) VALUES (?, ?, ?, ?, ?)",
                (None, "ip_flag", f"user:{user_id}", f"Signup IP matches {same_ip_count} existing user(s): {client_ip}", now),
            )

        cursor.execute(
            """INSERT INTO subscriptions
               (tenant_id, user_id, plan_name, is_paid, trial_start, trial_searches_used, status)
               VALUES (?, ?, 'trial', 0, ?, 0, 'trial')""",
            (tenant_id, user_id, now),
        )

        token = secrets.token_urlsafe(32)
        cursor.execute(
            """INSERT INTO verification_tokens (user_id, token, created_at, expires_at, used)
               VALUES (?, ?, ?, ?, 0)""",
            (user_id, token, now, expires),
        )
        
        # Check for pending report from public funnel
        _process_pending_report(user_id, request, conn)
        
        conn.commit()
    finally:
        conn.close()

    use_twilio = is_feature_enabled("twilio_verification")
    tw_sid = os.getenv("TWILIO_ACCOUNT_SID")
    tw_token = os.getenv("TWILIO_AUTH_TOKEN")
    tw_service = os.getenv("TWILIO_VERIFY_SERVICE_SID")
    
    if use_twilio and not phone:
        return re_render("Phone number is required for SMS verification.")

    if use_twilio and all([tw_sid, tw_token, tw_service]):
        try:
            from twilio.rest import Client

            client = Client(tw_sid, tw_token)
            # Twilio Verify accepts E.164. We should attempt to send:
            # We'll rely on the user inputting a reasonable number, or we can stash the unverified state and wait for code.
            client.verify.v2.services(tw_service).verifications.create(to=phone, channel='sms')
            
            # Store partial auth token to link the verification attempt
            request.session["verify_phone"] = phone
            request.session["verify_user_id"] = user_id
            
            return RedirectResponse("/verify-phone", status_code=302)
        except Exception as exc:
            logger.error("Twilio error: %s", exc)
            # Graceful fallback to email-only, as required.

    # Fallback to email verification
    host = request.headers.get("host", "localhost")
    scheme = "https" if not host.startswith("localhost") else "http"
    verify_link = f"{scheme}://{host}/verify-email?token={token}"
    send_email(
        to=email,
        subject=f"Verify your email — {tenant['brand_name']}",
        html_body=(
            f"<p>Hi {full_name},</p>"
            f"<p>Click the link below to verify your email address.</p>"
            f"<p><a href='{verify_link}'>{verify_link}</a></p>"
            f"<p>This link expires in 24 hours.</p>"
        ),
    )

    return RedirectResponse("/verify-email?sent=1", status_code=302)


# ---------------------------------------------------------------------------
# Verify Phone
# ---------------------------------------------------------------------------

@router.get("/verify-phone")
async def verify_phone_get(request: Request, error: str = None):
    tenant = get_current_tenant(request)
    phone = request.session.get("verify_phone")
    if not phone:
        return RedirectResponse("/login", status_code=302)
        
    return templates.TemplateResponse(
        "verify_phone.html",
        {"request": request, "tenant": tenant, "phone": phone, "error": error},
    )

@router.post("/verify-phone")
async def verify_phone_post(request: Request, code: str = Form(...)):
    tenant = get_current_tenant(request)
    phone = request.session.get("verify_phone")
    user_id = request.session.get("verify_user_id")
    
    if not phone or not user_id:
        return RedirectResponse("/login", status_code=302)

    tw_sid = os.getenv("TWILIO_ACCOUNT_SID")
    tw_token = os.getenv("TWILIO_AUTH_TOKEN")
    tw_service = os.getenv("TWILIO_VERIFY_SERVICE_SID")
    
    try:
        from twilio.rest import Client

        client = Client(tw_sid, tw_token)
        verification_check = client.verify.v2.services(tw_service).verification_checks.create(
            to=phone, code=code.strip()
        )
        if verification_check.status != "approved":
            return RedirectResponse("/verify-phone?error=Invalid+code", status_code=302)
            
    except Exception as exc:
        logger.error("Twilio check error: %s", exc)
        return RedirectResponse("/verify-phone?error=Failed+to+verify+code", status_code=302)

    # Success!
    conn = get_db()
    try:
        conn.execute("UPDATE users SET is_verified = 1, phone_verified = 1 WHERE id = ?", (user_id,))
        # Fetch the user to login immediately
        user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
        conn.commit()
    finally:
        conn.close()

    if not user:
        return RedirectResponse("/login", status_code=302)

    # Clean up session
    request.session.pop("verify_phone", None)
    request.session.pop("verify_user_id", None)
    
    # Login user
    token = create_access_token(
        user_id=user["id"],
        tenant_id=user["tenant_id"],
        email=user["email"],
        is_admin=bool(user["is_admin"]),
        name=user["name"] or "",
    )
    
    response = RedirectResponse("/dashboard", status_code=302)
    set_auth_cookie(response, token)
    return response

# ---------------------------------------------------------------------------
# Verify email
# ---------------------------------------------------------------------------

@router.get("/verify-email")
async def verify_email(request: Request, sent: str = None, token: str = None):
    tenant = get_current_tenant(request)

    if sent == "1":
        return templates.TemplateResponse(
            "verify_email.html",
            {"request": request, "tenant": tenant, "state": "sent"},
        )

    if not token:
        return RedirectResponse("/login", status_code=302)

    conn = get_db()
    try:
        row = conn.execute(
            "SELECT id, user_id, expires_at, used FROM verification_tokens WHERE token = ?",
            (token,),
        ).fetchone()

        if not row or row["used"]:
            return templates.TemplateResponse(
                "verify_email.html",
                {"request": request, "tenant": tenant, "state": "invalid"},
            )

        expires_at = datetime.fromisoformat(row["expires_at"])
        if datetime.now(timezone.utc) > expires_at:
            return templates.TemplateResponse(
                "verify_email.html",
                {"request": request, "tenant": tenant, "state": "invalid"},
            )

        conn.execute(
            "UPDATE users SET is_verified = 1 WHERE id = ?", (row["user_id"],)
        )
        conn.execute(
            "UPDATE verification_tokens SET used = 1 WHERE id = ?", (row["id"],)
        )
        conn.commit()
    finally:
        conn.close()

    return templates.TemplateResponse(
        "verify_email.html",
        {"request": request, "tenant": tenant, "state": "success"},
    )


# ---------------------------------------------------------------------------
# Logout
# ---------------------------------------------------------------------------

@router.get("/logout")
async def logout(request: Request):
    response = RedirectResponse("/login", status_code=302)
    clear_auth_cookie(response)
    return response


# ---------------------------------------------------------------------------
# Forgot password
# ---------------------------------------------------------------------------

@router.get("/forgot-password")
async def forgot_password_get(request: Request):
    tenant = get_current_tenant(request)
    return templates.TemplateResponse(
        "forgot_password.html",
        {"request": request, "tenant": tenant, "sent": False},
    )


@router.post("/forgot-password")
async def forgot_password_post(request: Request, email: str = Form(...)):
    tenant = get_current_tenant(request)
    email = email.lower().strip()

    conn = get_db()
    try:
        user = conn.execute(
            "SELECT id FROM users WHERE email = ?", (email,)
        ).fetchone()

        if user:
            now = _now_utc()
            expires = (datetime.now(timezone.utc) + timedelta(hours=1)).isoformat()
            token = secrets.token_urlsafe(32)
            conn.execute(
                """INSERT INTO password_reset_tokens (user_id, token, created_at, expires_at, used)
                   VALUES (?, ?, ?, ?, 0)""",
                (user["id"], token, now, expires),
            )
            conn.commit()

            host = request.headers.get("host", "localhost")
            scheme = "https" if not host.startswith("localhost") else "http"
            reset_link = f"{scheme}://{host}/reset-password?token={token}"
            send_email(
                to=email,
                subject=f"Reset your password — {tenant['brand_name']}",
                html_body=(
                    f"<p>Click the link below to reset your password. This link expires in 1 hour.</p>"
                    f"<p><a href='{reset_link}'>{reset_link}</a></p>"
                ),
            )
    finally:
        conn.close()

    return templates.TemplateResponse(
        "forgot_password.html",
        {"request": request, "tenant": tenant, "sent": True},
    )


# ---------------------------------------------------------------------------
# Reset password
# ---------------------------------------------------------------------------

@router.get("/reset-password")
async def reset_password_get(request: Request, token: str = None):
    tenant = get_current_tenant(request)

    if not token:
        return templates.TemplateResponse(
            "reset_password.html",
            {"request": request, "tenant": tenant, "state": "invalid", "token": ""},
        )

    conn = get_db()
    try:
        row = conn.execute(
            "SELECT id, expires_at, used FROM password_reset_tokens WHERE token = ?",
            (token,),
        ).fetchone()
    finally:
        conn.close()

    if not row or row["used"]:
        return templates.TemplateResponse(
            "reset_password.html",
            {"request": request, "tenant": tenant, "state": "invalid", "token": ""},
        )

    expires_at = datetime.fromisoformat(row["expires_at"])
    if datetime.now(timezone.utc) > expires_at:
        return templates.TemplateResponse(
            "reset_password.html",
            {"request": request, "tenant": tenant, "state": "invalid", "token": ""},
        )

    return templates.TemplateResponse(
        "reset_password.html",
        {"request": request, "tenant": tenant, "state": "valid", "token": token},
    )


@router.post("/reset-password")
async def reset_password_post(
    request: Request,
    token: str = Form(...),
    password: str = Form(...),
    confirm_password: str = Form(...),
):
    tenant = get_current_tenant(request)

    if password != confirm_password:
        return templates.TemplateResponse(
            "reset_password.html",
            {
                "request": request,
                "tenant": tenant,
                "state": "valid",
                "token": token,
                "error": "Passwords do not match.",
            },
        )

    if len(password) < 8:
        return templates.TemplateResponse(
            "reset_password.html",
            {
                "request": request,
                "tenant": tenant,
                "state": "valid",
                "token": token,
                "error": "Password must be at least 8 characters.",
            },
        )

    conn = get_db()
    try:
        row = conn.execute(
            "SELECT id, user_id, expires_at, used FROM password_reset_tokens WHERE token = ?",
            (token,),
        ).fetchone()

        if not row or row["used"]:
            return templates.TemplateResponse(
                "reset_password.html",
                {"request": request, "tenant": tenant, "state": "invalid", "token": ""},
            )

        expires_at = datetime.fromisoformat(row["expires_at"])
        if datetime.now(timezone.utc) > expires_at:
            return templates.TemplateResponse(
                "reset_password.html",
                {"request": request, "tenant": tenant, "state": "invalid", "token": ""},
            )

        conn.execute(
            "UPDATE users SET password_hash = ? WHERE id = ?",
            (hash_password(password), row["user_id"]),
        )
        conn.execute(
            "UPDATE password_reset_tokens SET used = 1 WHERE id = ?", (row["id"],)
        )
        conn.commit()
    finally:
        conn.close()

    return RedirectResponse("/login?reset=1", status_code=302)


# ---------------------------------------------------------------------------
# OAuth — Google
# ---------------------------------------------------------------------------

@router.get("/auth/google")
async def auth_google(request: Request):
    if not os.getenv("GOOGLE_CLIENT_ID"):
        return RedirectResponse("/login?error=Google+login+not+configured", status_code=302)
    redirect_uri = str(request.url_for("auth_google_callback"))
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/auth/google/callback", name="auth_google_callback")
async def auth_google_callback(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
        user_info = token.get("userinfo") or await oauth.google.userinfo(token=token)
        email = user_info.get("email", "").lower().strip()
        name = user_info.get("name", "")
    except Exception as exc:
        logger.warning("Google OAuth error: %s", exc)
        return RedirectResponse("/login?error=Google+login+failed", status_code=302)

    tenant = get_current_tenant(request)
    tenant_id = _resolve_tenant_id(tenant)
    if not tenant_id:
        return RedirectResponse("/login?error=Tenant+error", status_code=302)

    user = _get_or_create_oauth_user(
        tenant_id=tenant_id,
        email=email,
        name=name,
        signup_domain=request.headers.get("host", "localhost"),
        request=request,
    )

    jwt_token = create_access_token(
        user_id=user["id"],
        tenant_id=user["tenant_id"],
        email=user["email"],
        is_admin=bool(user.get("is_admin", 0)),
        name=user.get("name", ""),
    )
    response = RedirectResponse("/dashboard", status_code=302)
    set_auth_cookie(response, jwt_token)
    return response


# ---------------------------------------------------------------------------
# OAuth — Facebook
# ---------------------------------------------------------------------------

@router.get("/auth/facebook")
async def auth_facebook(request: Request):
    if not os.getenv("FACEBOOK_APP_ID"):
        return RedirectResponse("/login?error=Facebook+login+not+configured", status_code=302)
    redirect_uri = str(request.url_for("auth_facebook_callback"))
    return await oauth.facebook.authorize_redirect(request, redirect_uri)


@router.get("/auth/facebook/callback", name="auth_facebook_callback")
async def auth_facebook_callback(request: Request):
    try:
        token = await oauth.facebook.authorize_access_token(request)
        resp = await oauth.facebook.get(
            "me?fields=id,name,email", token=token
        )
        user_info = resp.json()
        email = user_info.get("email", "").lower().strip()
        name = user_info.get("name", "")
    except Exception as exc:
        logger.warning("Facebook OAuth error: %s", exc)
        return RedirectResponse("/login?error=Facebook+login+failed", status_code=302)

    if not email:
        return RedirectResponse("/login?error=Facebook+account+has+no+email", status_code=302)

    tenant = get_current_tenant(request)
    tenant_id = _resolve_tenant_id(tenant)
    if not tenant_id:
        return RedirectResponse("/login?error=Tenant+error", status_code=302)

    user = _get_or_create_oauth_user(
        tenant_id=tenant_id,
        email=email,
        name=name,
        signup_domain=request.headers.get("host", "localhost"),
        request=request,
    )

    jwt_token = create_access_token(
        user_id=user["id"],
        tenant_id=user["tenant_id"],
        email=user["email"],
        is_admin=bool(user.get("is_admin", 0)),
        name=user.get("name", ""),
    )
    response = RedirectResponse("/dashboard", status_code=302)
    set_auth_cookie(response, jwt_token)
    return response
