from fastapi import FastAPI, Request, Form, HTTPException, UploadFile, File
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from typing import Optional
from search_logic import search_guests
import sqlite3
import datetime
import uuid
import os

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
DB_NAME = "guests.db"


def init_db_if_missing():
    """Create the database schema if guests.db does not exist (e.g. on Railway)."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS reported_guests (
            id                   INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name           TEXT,
            last_name            TEXT,
            phone                TEXT,
            email                TEXT,
            airbnb_vrbo_profile  TEXT,
            city                 TEXT,
            state                TEXT,
            prev_group_size      INTEGER,
            prev_stay_length     INTEGER,
            stay_date            TEXT,
            guest_rating         INTEGER,
            incident_flags       TEXT,
            report_reason        TEXT,
            details_of_incident  TEXT,
            uploaded_images      TEXT
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS user_search_history (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            wp_user_id      INTEGER NOT NULL,
            query_text      TEXT,
            guest_name      TEXT,
            match_score     REAL DEFAULT 0,
            risk_level      TEXT DEFAULT 'low',
            matched_report_id INTEGER,
            searched_at     TEXT
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS membership_status (
            wp_user_id      INTEGER PRIMARY KEY,
            plan_name       TEXT DEFAULT 'Trial',
            is_paid         INTEGER DEFAULT 0,
            member_since    TEXT,
            next_billing    TEXT
        )
    """)
    conn.commit()
    conn.close()
    print("Database initialised.")


app = FastAPI()


@app.on_event("startup")
def startup_event():
    init_db_if_missing()

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
templates = Jinja2Templates(directory="templates")

# Simple in-memory log
admin_logs = []


def log_event(message: str):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    admin_logs.insert(0, f"[{timestamp}] {message}")
    if len(admin_logs) > 50:
        admin_logs.pop()


def get_db_connection():
    conn = sqlite3.connect("guests.db")
    conn.row_factory = sqlite3.Row
    return conn


async def save_upload(file: UploadFile) -> Optional[str]:
    """Save an uploaded file and return its URL path, or None if empty/invalid."""
    if not file or not file.filename:
        return None
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        return None
    unique_name = f"{uuid.uuid4().hex}{ext}"
    dest = os.path.join(UPLOAD_DIR, unique_name)
    contents = await file.read()
    if not contents:
        return None
    with open(dest, "wb") as f:
        f.write(contents)
    return f"/uploads/{unique_name}"


# ── Public API ──────────────────────────────────────────────────────────────

class GuestQuery(BaseModel):
    first_name: Optional[str] = ""
    last_name: Optional[str] = ""
    phone: Optional[str] = ""
    city: Optional[str] = ""
    state: Optional[str] = ""


@app.get("/")
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


def classify_risk(score: float) -> str:
    if score >= 80:
        return "high"
    if score >= 50:
        return "medium"
    return "low"


@app.post("/search")
def run_search(query: GuestQuery, wp_user_id: Optional[int] = None):
    data = query.model_dump()
    results = search_guests(data)
    log_event(f"API Search: {data.get('first_name')} {data.get('last_name')}")

    if wp_user_id and results:
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        conn = get_db_connection()
        cursor = conn.cursor()
        for match in results[:10]:
            score = match.get("score", match.get("match_score", 0))
            risk = classify_risk(float(score))
            guest_name = f"{match.get('first_name', '')} {match.get('last_name', '')}".strip()
            cursor.execute("""
                INSERT INTO user_search_history
                (wp_user_id, query_text, guest_name, match_score, risk_level, matched_report_id, searched_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                wp_user_id,
                f"{data.get('first_name', '')} {data.get('last_name', '')}".strip(),
                guest_name,
                float(score),
                risk,
                match.get("id"),
                now,
            ))
        conn.commit()
        conn.close()

    return {"count": len(results), "matches": results[:10]}


@app.get("/dashboard/metrics")
def dashboard_metrics(user_id: int = 0):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM reported_guests")
    reports_filed_total = cursor.fetchone()[0]

    total_searches = 0
    searches_this_month = 0
    reports_filed_from_user = 0
    recent_searches = []
    risk_low = 0
    risk_medium = 0
    risk_high = 0
    plan_name = "Trial"
    is_paid = False
    member_since = ""
    next_billing = ""
    member_for = "0 months"

    if user_id:
        cursor.execute("SELECT COUNT(*) FROM user_search_history WHERE wp_user_id = ?", (user_id,))
        total_searches = cursor.fetchone()[0]

        month_start = datetime.datetime.now().replace(day=1).strftime("%Y-%m-%d")
        cursor.execute(
            "SELECT COUNT(*) FROM user_search_history WHERE wp_user_id = ? AND searched_at >= ?",
            (user_id, month_start),
        )
        searches_this_month = cursor.fetchone()[0]

        cursor.execute(
            "SELECT COUNT(*) FROM user_search_history WHERE wp_user_id = ? AND risk_level = 'low'",
            (user_id,),
        )
        risk_low = cursor.fetchone()[0]
        cursor.execute(
            "SELECT COUNT(*) FROM user_search_history WHERE wp_user_id = ? AND risk_level = 'medium'",
            (user_id,),
        )
        risk_medium = cursor.fetchone()[0]
        cursor.execute(
            "SELECT COUNT(*) FROM user_search_history WHERE wp_user_id = ? AND risk_level = 'high'",
            (user_id,),
        )
        risk_high = cursor.fetchone()[0]

        cursor.execute(
            """SELECT guest_name, searched_at, risk_level, match_score, matched_report_id
               FROM user_search_history WHERE wp_user_id = ?
               ORDER BY id DESC LIMIT 20""",
            (user_id,),
        )
        for row in cursor.fetchall():
            recent_searches.append({
                "guest_name": row["guest_name"],
                "date": row["searched_at"],
                "risk_level": row["risk_level"],
                "match_score": row["match_score"],
                "matched_report_id": row["matched_report_id"],
            })

        cursor.execute("SELECT * FROM membership_status WHERE wp_user_id = ?", (user_id,))
        membership_row = cursor.fetchone()
        if membership_row:
            plan_name = membership_row["plan_name"] or "Trial"
            is_paid = bool(membership_row["is_paid"])
            member_since = membership_row["member_since"] or ""
            next_billing = membership_row["next_billing"] or ""
            if member_since:
                try:
                    start = datetime.datetime.strptime(member_since, "%Y-%m-%d")
                    diff = datetime.datetime.now() - start
                    months = diff.days // 30
                    member_for = f"{months} months" if months != 1 else "1 month"
                except ValueError:
                    member_for = "0 months"

    conn.close()

    return {
        "total_searches": total_searches,
        "searches_this_month": searches_this_month,
        "reports_filed_total": reports_filed_total,
        "reports_filed_from_user": reports_filed_from_user,
        "member_for": member_for,
        "account_status": "paid" if is_paid else "unpaid",
        "is_paid": is_paid,
        "membership_plan": plan_name,
        "next_billing_date": next_billing,
        "recent_searches": recent_searches,
        "risk_summary": {
            "low": risk_low,
            "medium": risk_medium,
            "high": risk_high,
        },
    }


# ── Public Form ──────────────────────────────────────────────────────────────

@app.get("/submit-report")
def public_form_page(request: Request):
    return templates.TemplateResponse("public_form.html", {"request": request})


@app.post("/submit-report")
async def public_form_submit(
    request: Request,
    first_name: str = Form(...),
    last_name: str = Form(""),
    phone: str = Form(""),
    email: str = Form(""),
    airbnb_vrbo_profile: str = Form(""),
    city: str = Form(""),
    state: str = Form(""),
    prev_group_size: int = Form(1),
    prev_stay_length: int = Form(1),
    stay_date: str = Form(""),
    guest_rating: int = Form(0),
    details_of_incident: str = Form(""),
    redirect_to: str = Form(""),
    image_1: UploadFile = File(None),
    image_2: UploadFile = File(None),
):
    try:
        form_data = await request.form()
        incident_flags = ",".join(form_data.getlist("incident_flags"))

        paths = []
        for upload in (image_1, image_2):
            path = await save_upload(upload)
            if path:
                paths.append(path)
        uploaded_images = ",".join(paths)

        report_reason = details_of_incident

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO reported_guests
            (first_name, last_name, phone, email, airbnb_vrbo_profile,
             city, state, prev_group_size, prev_stay_length,
             stay_date, guest_rating, incident_flags,
             report_reason, details_of_incident, uploaded_images)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            first_name, last_name, phone, email, airbnb_vrbo_profile,
            city, state, prev_group_size, prev_stay_length,
            stay_date, guest_rating, incident_flags,
            report_reason, details_of_incident, uploaded_images,
        ))
        conn.commit()
        conn.close()

        log_event(f"Public report submitted: {first_name} {last_name}"
                  + (f" ({len(paths)} image(s))" if paths else ""))

        # If called from WordPress shortcode, redirect back to the WP page
        if redirect_to:
            sep = "&" if "?" in redirect_to else "?"
            return RedirectResponse(
                url=f"{redirect_to}{sep}report_submitted=1",
                status_code=303,
            )

        return templates.TemplateResponse("public_form.html", {
            "request": request,
            "success_msg": "Your report has been submitted. Thank you.",
        })
    except Exception as e:
        log_event(f"Public form error: {str(e)}")
        if redirect_to:
            sep = "&" if "?" in redirect_to else "?"
            return RedirectResponse(
                url=f"{redirect_to}{sep}report_submitted=error",
                status_code=303,
            )
        return templates.TemplateResponse("public_form.html", {
            "request": request,
            "error_msg": "Something went wrong. Please try again.",
        })


# ── Admin Routes ──────────────────────────────────────────────────────────────

@app.get("/admin")
def admin_dashboard(request: Request):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM reported_guests")
    count = cursor.fetchone()[0]
    conn.close()
    return templates.TemplateResponse("admin_dashboard.html", {
        "request": request,
        "report_count": count,
        "logs": admin_logs,
    })


@app.get("/admin/form")
def admin_form_page(request: Request):
    return templates.TemplateResponse("admin_form.html", {"request": request})


@app.post("/admin/form")
async def admin_form_submit(
    request: Request,
    first_name: str = Form(...),
    last_name: str = Form(""),
    phone: str = Form(""),
    email: str = Form(""),
    airbnb_vrbo_profile: str = Form(""),
    city: str = Form(""),
    state: str = Form(""),
    prev_group_size: int = Form(1),
    prev_stay_length: int = Form(1),
    stay_date: str = Form(""),
    guest_rating: int = Form(0),
    details_of_incident: str = Form(""),
    image_1: UploadFile = File(None),
    image_2: UploadFile = File(None),
):
    try:
        # Checkboxes (multi-value)
        form_data = await request.form()
        incident_flags = ",".join(form_data.getlist("incident_flags"))

        # Save uploaded images
        paths = []
        for upload in (image_1, image_2):
            path = await save_upload(upload)
            if path:
                paths.append(path)
        uploaded_images = ",".join(paths)

        report_reason = details_of_incident  # keep search_logic in sync

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO reported_guests
            (first_name, last_name, phone, email, airbnb_vrbo_profile,
             city, state, prev_group_size, prev_stay_length,
             stay_date, guest_rating, incident_flags,
             report_reason, details_of_incident, uploaded_images)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            first_name, last_name, phone, email, airbnb_vrbo_profile,
            city, state, prev_group_size, prev_stay_length,
            stay_date, guest_rating, incident_flags,
            report_reason, details_of_incident, uploaded_images,
        ))
        conn.commit()
        conn.close()

        log_event(f"Report submitted: {first_name} {last_name}"
                  + (f" ({len(paths)} image(s))" if paths else ""))

        return templates.TemplateResponse("admin_form.html", {
            "request": request,
            "success_msg": f"Report for {first_name} {last_name} submitted successfully!",
        })
    except Exception as e:
        log_event(f"Form error: {str(e)}")
        return templates.TemplateResponse("admin_form.html", {
            "request": request,
            "error_msg": f"Failed to submit report: {str(e)}",
        })


@app.get("/admin/search")
def admin_search_page(request: Request):
    return templates.TemplateResponse("admin_search.html", {
        "request": request, "query": None, "results": None,
    })


@app.post("/admin/search")
def admin_search_run(
    request: Request,
    first_name: str = Form(""),
    last_name: str = Form(""),
    phone: str = Form(""),
    city: str = Form(""),
    state: str = Form(""),
):
    query_dict = {
        "first_name": first_name,
        "last_name": last_name,
        "phone": phone,
        "city": city,
        "state": state,
    }
    results = search_guests(query_dict)
    log_event(f"Admin Search: {first_name} {last_name}")

    conn = get_db_connection()
    cur = conn.cursor()
    for r in results:
        d = r.get("data", {})
        cur.execute(
            "SELECT id FROM reported_guests WHERE first_name = ? AND last_name = ? LIMIT 1",
            (d.get("first_name", ""), d.get("last_name", "")),
        )
        row = cur.fetchone()
        r["report_id"] = row["id"] if row else None
    conn.close()

    return templates.TemplateResponse("admin_search.html", {
        "request": request,
        "query": query_dict,
        "results": results[:20],
    })


@app.get("/admin/results")
def admin_results_page(request: Request):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM reported_guests ORDER BY id DESC")
    reports = cursor.fetchall()
    conn.close()
    return templates.TemplateResponse("admin_results.html", {
        "request": request,
        "reports": reports,
    })


@app.get("/admin/report/{report_id}")
def admin_report_detail(request: Request, report_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM reported_guests WHERE id = ?", (report_id,))
    report = cursor.fetchone()
    conn.close()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return templates.TemplateResponse("admin_report_detail.html", {
        "request": request,
        "report": report,
    })


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    print(f"Starting the API server on port {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
