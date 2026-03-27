from fastapi import Request
from database import get_db

DEFAULT_TENANT = {
    "id": None,
    "domain": "localhost",
    "brand_name": "GuestGuard",
    "logo_url": "/static/img/default-logo.svg",
    "primary_color": "#3b82f6",
    "active": 1,
}


def get_current_tenant(request: Request) -> dict:
    """
    Resolves the current tenant from the request Host header.
    Strips port if present (e.g. localhost:8000 → localhost).
    Falls back to DEFAULT_TENANT if no matching row found.
    Never hardcodes a tenant_id.
    """
    host = request.headers.get("host", "localhost")
    domain = host.split(":")[0].lower().strip()

    conn = get_db()
    try:
        row = conn.execute(
            "SELECT id, domain, brand_name, logo_url, primary_color, active "
            "FROM tenants WHERE domain = ? AND active = 1",
            (domain,),
        ).fetchone()
    finally:
        conn.close()

    if row:
        return {
            "id": row["id"],
            "domain": row["domain"],
            "brand_name": row["brand_name"],
            "logo_url": row["logo_url"] or DEFAULT_TENANT["logo_url"],
            "primary_color": row["primary_color"] or DEFAULT_TENANT["primary_color"],
            "active": row["active"],
        }

    return DEFAULT_TENANT.copy()
