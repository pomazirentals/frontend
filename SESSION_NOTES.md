# GuestGuard — Session Notes (2026-03-23)
# READ THIS AT START OF NEXT SESSION

---

## WHAT WAS DONE THIS SESSION

### Phase 8-10 Execution Update (2026-03-23, later run)

All three pending phases were implemented and tested with a live running server using curl-driven checks.

#### Phase 8 — Report Funnel
- Built `GET/POST /submit-report` in `backend/routers/public_routes.py`
- Added `backend/templates/public_form.html`
- Added register funnel banner (`/register?from=report`)
- Added pending report processing on register (report auto-saved to `guest_reports` with new `submitted_by_user_id`)
- Verified end-to-end with DB check that pending report was saved after registration

#### Phase 9 — Abuse Protection
- Added DB columns + migrations:
  - `users.signup_ip`, `users.login_ip`
  - `guest_reports.submitted_ip`
- Registration now logs `ip_flag` into `admin_logs` when signup IP matches existing users
- Login now updates `login_ip`
- Added `/report` rate limit (5/day per authenticated user)
- Found and fixed runtime error during testing:
  - `sqlite3.IntegrityError: NOT NULL constraint failed: guest_reports.tenant_id`
  - Root cause: tenant lookup fallback missing for host `127.0.0.1`
  - Fix: added tenant fallback resolver in `dashboard_routes.py`
- Re-tested rate limit successfully: 302 for attempts 1-5, 429 on attempt 6

#### Phase 10 — Twilio Toggle Flow
- Added DB-backed feature flags via new file `backend/feature_flags.py`
- Added `feature_flags` table (with defaults) and admin toggle persistence
- Wired Twilio control into Verification panel
- Added conditional phone field in register flow (shown only when toggle enabled)
- Added `/verify-phone` page + handlers
- Added `users.phone` and `users.phone_verified`
- Added Twilio env keys to `.env.example`
- Added `twilio` dependency to `requirements.txt`
- Verified behavior:
  - Toggle default OFF
  - Register phone field hidden when OFF, shown when ON
  - Missing phone when ON => 422
  - With phone but no Twilio creds => graceful fallback to email verification
  - `/verify-phone` without session => redirect to `/login`
  - Verification panel shows Twilio credential warning if env keys missing

#### Final Remaining Item Completed — Dynamic CORS
- Replaced wildcard CORS behavior with tenant-aware runtime origin checks in `backend/main.py`
- CORS now allows:
  - local dev origins (`localhost`/`127.0.0.1` dev ports)
  - active tenant domains from DB (`tenants.active = 1`)
- CORS now blocks unknown origins with `403` on preflight
- Verified with live preflight tests:
  - `Origin: http://localhost:3000` => allowed (`204` + CORS headers)
  - `Origin: https://safehostscan.com` (active tenant row) => allowed
  - `Origin: https://evil.example` => blocked (`403`)

### Phase 1: Bug Fixes + Testing — COMPLETE

Three bugs were found and fixed:

1. **Missing `.env` file** — Created `backend/.env` with `DEBUG=true` so auth cookies work on localhost HTTP. Without this, `secure=True` on the cookie caused browsers to silently refuse it.

2. **JWT missing `name` field** — Updated `auth.py` `create_access_token()` to accept and include `name`. Updated all call sites in `auth_routes.py` (login POST, Google callback, Facebook callback) to pass `name`.

3. **Admin billing panel crash** — `templates/admin/panels/billing.html` line 107 referenced `now_utc` which was never passed to the template. Fixed by computing `days_remaining` in `admin_routes.py` Python code and passing it with each trial subscription row. Updated the template to use `s.days_remaining` instead.

### Previous Session Fix (Already Applied)
- `templates_config.py` was created to share one `Jinja2Templates` instance + `avatar_color` global across all routers. All routers import `from templates_config import templates`. This was done by a previous Claude Code session.

### All Pages Tested — Results:
| Page | HTTP | Status |
|------|------|--------|
| GET /login | 200 | Working |
| GET /register | 200 | Working |
| POST /register | 302 → /verify-email?sent=1 | Working (user + subscription + token created) |
| POST /login | 302 → /dashboard (cookie set with name) | Working |
| GET /dashboard | 200 | Working (name, TRIAL badge, stats, avatar_color) |
| GET /search | 200 | Working (trial counter: 0/3, 6 days remaining) |
| POST /search | 200 | Working |
| GET /report | 200 | Working |
| GET /billing/upgrade | 200 | Working |
| GET /admin | 200 | Working |
| All 11 admin panels | 200 | Working (billing was 500, now fixed) |
| GET /submit-report | 404 | **NOT BUILT YET** — public_routes.py is empty stub |
| GET /forgot-password | 200 | Working |
| GET /verify-email | 200 | Working |
| Google OAuth (no creds) | 302 → graceful error | Working |
| Facebook OAuth (no creds) | 302 → graceful error | Working |

---

## WHAT STILL NEEDS TO BE BUILT

### Phase 2: Report-to-Registration Funnel (NEW FEATURE)
**Status: NOT STARTED**

The public report form (`/submit-report`) needs to funnel users into registration:
1. User fills out `/submit-report` form (no login required)
2. On POST, save report data into the session (Starlette SessionMiddleware already enabled)
3. Redirect to `/register?from=report` with banner: "Create an account to complete your report"
4. After registration, check session for pending report data
5. If found: auto-save report to `guest_reports` with new user's ID, clear session
6. Redirect to `/dashboard?reported=1`

**Files to create/modify:**
- `backend/routers/public_routes.py` — currently empty stub, build GET + POST /submit-report
- `backend/templates/public_form.html` — create template (reference: `public_form.html` in project root)
- `backend/routers/auth_routes.py` — POST /register: check session for pending report after user creation
- `backend/templates/register.html` — show banner when `?from=report`

### Phase 3: Basic Abuse Protection (NEW FEATURE)
**Status: NOT STARTED**

- Add `signup_ip TEXT`, `login_ip TEXT` columns to users table
- Add `submitted_ip TEXT` column to guest_reports table
- On registration: store `request.client.host` as signup_ip
- On registration: check for existing users with same IP → log to admin_logs as `ip_flag`
- On login: update `login_ip`
- Rate limit reports: max 5 per day per user
- DB migration via ALTER TABLE in `database.py` init_db()

### Phase 4: Twilio Phone Verification (NEW FEATURE)
**Status: NOT STARTED**

Full Twilio SMS verification, controlled by admin toggle. **OFF by default.**

**When ON:**
1. Registration shows phone number field
2. After email/password, user enters phone
3. Backend sends 6-digit SMS code via Twilio Verify API
4. User enters code on verify screen
5. If correct: phone_verified=1, registration continues
6. Max 3 retries, can resend code

**When OFF (default):**
- No phone field, registration works as now (email only)
- No Twilio API calls made

**DB changes needed:**
- Add `phone TEXT`, `phone_verified INTEGER DEFAULT 0` to users table
- New table or columns for phone verification codes

**Files to modify:**
- `backend/database.py` — schema changes
- `backend/requirements.txt` — add `twilio`
- `backend/.env.example` — add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID
- `backend/routers/auth_routes.py` — conditional phone step
- `backend/routers/admin_routes.py` — wire toggle to persistent feature flag
- `backend/templates/register.html` — conditional phone field
- Create `backend/templates/verify_phone.html` — code entry page
- `backend/templates/admin/panels/verification.html` — wire toggle from "Coming soon" to functional

**Safety rules:**
- If TWILIO_ACCOUNT_SID not set → admin toggle greyed out with "Add credentials to .env"
- If Twilio API fails → fall back to email-only (never block registration)

### Also remaining from original spec:
- [ ] Dynamic CORS: allow all registered tenant domains (unchecked in PROGRESS.md)

---

## EXISTING CREDENTIALS/API SETUP

User says they HAVE these ready to enter when needed:
- Twilio API credentials (Account SID, Auth Token, Verify Service SID)
- Google OAuth credentials (Client ID, Client Secret)
- Facebook OAuth credentials (App ID, App Secret)

All are controlled by `.env` — add credentials and they activate. No code changes needed for Google/Facebook (already built). Twilio needs Phase 4 code first.

---

## SERVER STATUS

- Server was running at http://localhost:8000 during testing
- Started from: `c:\Users\Rob\Desktop\final\backend`
- Command: `.\venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000`
- Virtual env exists at `backend\venv\`
- DB file: `backend\guests.db`
- Test user created: test@guestguard.com / password123 (is_admin=1, is_verified=1)

---

## FILES MODIFIED THIS SESSION

| File | What changed |
|------|-------------|
| `backend/.env` | CREATED — DEBUG=true, dev secrets |
| `backend/auth.py` | Added `name` param to `create_access_token()` |
| `backend/routers/auth_routes.py` | Pass `name` in all 3 `create_access_token()` calls |
| `backend/routers/admin_routes.py` | Compute `days_remaining` for trial users in billing panel query |
| `backend/templates/admin/panels/billing.html` | Replace broken `now_utc` date math with pre-computed `s.days_remaining` |

---

## KEY ARCHITECTURE REMINDERS

- React sites = marketing pages ONLY (Netlify)
- FastAPI = ALL app UI via Jinja2 templates (Railway)
- All routers import `from templates_config import templates` (shared Jinja2 instance)
- Tenant branding resolved from Host header → tenants table on every request
- Never hardcode tenant_id or domain names
- search_logic.py math is LOCKED — do not modify
- Route names are LOCKED — do not rename
