import logging
import os
import uuid
import aiofiles
from typing import List

from fastapi import APIRouter, File, Form, Request, UploadFile
from fastapi.responses import RedirectResponse

from tenant import get_current_tenant
from templates_config import templates
from database import get_db

router = APIRouter()
logger = logging.getLogger(__name__)

UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


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


@router.get("/submit-report")
async def submit_report_get(request: Request, error_msg: str = None):
    tenant = get_current_tenant(request)
    return templates.TemplateResponse(
        "public_form.html",
        {
            "request": request,
            "tenant": tenant,
            "error_msg": error_msg,
            "success_msg": None,
        },
    )


@router.post("/submit-report")
async def submit_report_post(
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
    incident_flags: list[str] = Form(default=[]),
    details_of_incident: str = Form(...),
    image_1: UploadFile = File(default=None),
    image_2: UploadFile = File(default=None),
):
    tenant = get_current_tenant(request)
    client_ip = request.client.host if request.client and request.client.host else "unknown"

    # Rate limiting: 5 reports/day by source IP
    conn = get_db()
    try:
        count = conn.execute(
            "SELECT COUNT(*) FROM guest_reports WHERE (submitted_ip = ? OR ip_address = ?) AND date(created_at)=date('now')",
            (client_ip, client_ip),
        ).fetchone()[0]
        if count >= 5:
            return templates.TemplateResponse(
                "public_form.html",
                {
                    "request": request,
                    "tenant": tenant,
                    "error_msg": "You have reached the daily limit for submitting reports.",
                    "success_msg": None,
                },
                status_code=429
            )
    finally:
        conn.close()

    # Handle image uploads immediately, store paths in session
    uploaded_paths = []
    for photo in [image_1, image_2]:
        if photo and photo.filename:
            allowed = {"image/jpeg", "image/png", "image/gif", "image/webp"}
            if photo.content_type in allowed:
                ext = photo.filename.rsplit(".", 1)[-1] if "." in photo.filename else "jpg"
                filename = f"{uuid.uuid4().hex}.{ext}"
                filepath = os.path.join(UPLOAD_DIR, filename)
                async with aiofiles.open(filepath, "wb") as f:
                    await f.write(await photo.read())
                uploaded_paths.append(f"/static/uploads/{filename}")

    # Prepare report data to stash in session
    tenant_id = _resolve_tenant_id(tenant)
    if not tenant_id:
        return templates.TemplateResponse(
            "public_form.html",
            {
                "request": request,
                "tenant": tenant,
                "error_msg": "Could not determine tenant. Please try again.",
                "success_msg": None,
            },
            status_code=500,
        )

    report_data = {
        "tenant_id": tenant_id,
        "first_name": first_name.strip(),
        "last_name": last_name.strip(),
        "airbnb_vrbo_profile": airbnb_vrbo_profile.strip(),
        "phone": phone.strip(),
        "email": email.strip(),
        "city": city.strip(),
        "state": state,
        "prev_group_size": int(prev_group_size) if prev_group_size else None,
        "prev_stay_length": int(prev_stay_length) if prev_stay_length else None,
        "stay_date": stay_date or None,
        "guest_rating": int(guest_rating) if guest_rating else None,
        "incident_flags": incident_flags,
        "details_of_incident": details_of_incident.strip(),
        "uploaded_paths": uploaded_paths,
        "ip_address": client_ip,
    }

    # Store in session
    request.session["pending_report"] = report_data

    # Redirect to registration with a message
    return RedirectResponse("/register?from=report", status_code=302)
