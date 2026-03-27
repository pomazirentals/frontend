import os
from contextlib import asynccontextmanager
from urllib.parse import urlparse

from fastapi import FastAPI, Request, Response
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv

from database import init_db, get_db
from routers import auth_routes, dashboard_routes, admin_routes, billing_routes, public_routes

load_dotenv()


# ---------------------------------------------------------------------------
# CORS Helpers
# ---------------------------------------------------------------------------

LOCAL_DEV_ORIGINS = {
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
}


def _get_active_domains() -> set[str]:
    domains: set[str] = set()
    conn = get_db()
    try:
        rows = conn.execute(
            "SELECT domain FROM tenants WHERE active = 1"
        ).fetchall()
        for row in rows:
            domain = (row["domain"] or "").strip().lower()
            if domain:
                domains.add(domain)
    finally:
        conn.close()
    return domains


def _is_allowed_origin(origin: str) -> bool:
    if origin in LOCAL_DEV_ORIGINS:
        return True

    parsed = urlparse(origin)
    host = (parsed.hostname or "").lower()
    if not host:
        return False

    # Localhost origins with arbitrary ports are allowed for dev.
    if host in {"localhost", "127.0.0.1"} and parsed.scheme in {"http", "https"}:
        return True

    # Allow any *.netlify.app subdomain for Netlify preview/testing.
    if host.endswith(".netlify.app"):
        return True

    return host in _get_active_domains()


def _apply_cors_headers(response: Response, origin: str) -> None:
    response.headers["Access-Control-Allow-Origin"] = origin
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Vary"] = "Origin"


# ---------------------------------------------------------------------------
# Startup / shutdown
# ---------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB and tables on startup
    init_db()

    yield
    # (no cleanup needed)


# ---------------------------------------------------------------------------
# App factory
# ---------------------------------------------------------------------------

app = FastAPI(
    title="GuestGuard",
    description="Guest-screening SaaS platform for short-term rental hosts.",
    version="1.0.0",
    lifespan=lifespan,
)

# Session middleware (required for OAuth state)
app.add_middleware(SessionMiddleware, secret_key=os.getenv("APP_SECRET_KEY", "dev-secret"))


@app.middleware("http")
async def tenant_cors_middleware(request: Request, call_next):
    origin = request.headers.get("origin")
    is_preflight = request.method == "OPTIONS" and origin is not None

    if is_preflight:
        if _is_allowed_origin(origin):
            preflight = Response(status_code=204)
            _apply_cors_headers(preflight, origin)
            return preflight
        return Response(status_code=403)

    response = await call_next(request)
    if origin and _is_allowed_origin(origin):
        _apply_cors_headers(response, origin)
    return response

# Static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------

app.include_router(auth_routes.router, tags=["auth"])
app.include_router(dashboard_routes.router, tags=["dashboard"])
app.include_router(admin_routes.router, tags=["admin"])
app.include_router(billing_routes.router, tags=["billing"])
app.include_router(public_routes.router, tags=["public"])


# ---------------------------------------------------------------------------
# Health check
# ---------------------------------------------------------------------------

@app.get("/health")
async def health():
    return {"status": "ok"}


# ---------------------------------------------------------------------------
# Entry point (local dev)
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    debug = os.getenv("DEBUG", "false").lower() == "true"
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=debug)
