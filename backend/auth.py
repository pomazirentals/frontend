import os
from datetime import datetime, timedelta, timezone
from typing import Optional

import bcrypt
from fastapi import Request
from fastapi.responses import RedirectResponse
from jose import JWTError, jwt
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET", "change-this-secret-in-production")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRY_HOURS = int(os.getenv("JWT_EXPIRY_HOURS", "24"))

COOKIE_NAME = "access_token"


# ---------------------------------------------------------------------------
# Password helpers
# ---------------------------------------------------------------------------

def hash_password(plain: str) -> str:
    return bcrypt.hashpw(plain.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


# ---------------------------------------------------------------------------
# JWT helpers
# ---------------------------------------------------------------------------

def create_access_token(user_id: int, tenant_id: int, email: str, is_admin: bool, name: str = "") -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRY_HOURS)
    payload = {
        "user_id": user_id,
        "tenant_id": tenant_id,
        "email": email,
        "is_admin": is_admin,
        "name": name,
        "exp": expire,
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> Optional[dict]:
    """Decode and validate a JWT. Returns payload dict or None on failure."""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except JWTError:
        return None


# ---------------------------------------------------------------------------
# Request helpers
# ---------------------------------------------------------------------------

def get_current_user(request: Request) -> Optional[dict]:
    """
    Reads the JWT from the HTTP-only cookie.
    Returns decoded payload dict or None if missing/invalid/expired.
    """
    token = request.cookies.get(COOKIE_NAME)
    if not token:
        return None
    return decode_access_token(token)


def require_auth(request: Request) -> dict:
    """
    Returns the current user dict.
    Raises a redirect to /login if not authenticated.
    Caller must handle the RedirectResponse if user is None.
    """
    user = get_current_user(request)
    if user is None:
        raise _AuthRedirect("/login")
    return user


def require_admin(request: Request) -> dict:
    """
    Returns the current user dict only if is_admin is True.
    Raises a redirect to /login otherwise.
    """
    user = get_current_user(request)
    if user is None or not user.get("is_admin"):
        raise _AuthRedirect("/login")
    return user


def set_auth_cookie(response, token: str):
    """Attach the JWT as an HTTP-only cookie."""
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        max_age=JWT_EXPIRY_HOURS * 3600,
        samesite="lax",
        secure=os.getenv("DEBUG", "false").lower() == "false",
    )


def clear_auth_cookie(response):
    """Remove the auth cookie (logout)."""
    response.delete_cookie(key=COOKIE_NAME)


# ---------------------------------------------------------------------------
# Internal helper
# ---------------------------------------------------------------------------

class _AuthRedirect(Exception):
    """Internal signal: redirect to login."""
    def __init__(self, url: str):
        self.url = url
        self.response = RedirectResponse(url=url, status_code=302)
