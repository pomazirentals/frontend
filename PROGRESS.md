# GuestGuard — PROGRESS FILE
# AI: READ THIS FIRST. Then read SESSION_NOTES.md for detailed status.
# Last Updated: 2026-03-23 — Phases 1-10 implemented and tested with live server.

---

## WHAT THIS IS
Guest-screening SaaS for short-term rental hosts (Airbnb/VRBO).
- Hosts submit reports on bad guests (free, requires email verification)
- Hosts search the shared guest database ($7/month, 10 searches/month)
- Trial: 7 days OR 3 searches, whichever comes first

---

## THE ARCHITECTURE (FINAL — DO NOT REINTERPRET)

### ONE system. ONE login. ONE dashboard. Branding changes by domain.

**React (Netlify)**
- 5 independent React apps in `REACT frontends/`
- Each on its own domain (guestcheckbnb.com, safehostscan.com, etc.)
- Purpose: MARKETING/LANDING PAGES ONLY
- React sites link/redirect users to FastAPI routes (/login, /register)
- There is NO React dashboard. Do NOT build one. Do NOT add app pages to React sites.

**FastAPI (Railway)**
- Renders ALL application UI using Jinja2 HTML templates
- Routes: /login, /register, /dashboard, /search, /report, /admin, /submit-report
- Templates MUST be modern and styled (cards, sidebar, layout) — NOT plain HTML
- Handles: auth (JWT), search, reports, Stripe billing, email verification, tenant branding
- Reads request domain → looks up tenants table → injects correct logo/branding into templates
- One SQLite database, all data tagged with tenant_id

**How branding works:**
1. Admin adds tenant in Tenant Management panel (domain, brand_name, logo_url, colors)
2. User clicks login/register on any React marketing site → sent to FastAPI /login
3. FastAPI reads Host header → looks up domain in tenants table
4. FastAPI renders Jinja2 template with that tenant's logo + brand color injected
5. After auth → FastAPI renders /dashboard with same tenant branding

---

## UI DESIGN REFERENCES

**Login / Register page** (FastAPI Jinja2 template):
- Light grey (#f5f5f5) full-page background
- Centered white card, rounded corners, subtle shadow
- TOP: tenant logo (dynamic from tenants table — replaces the placeholder icon)
- "Sign in" heading + "to continue to your account" subtitle
- Email field (underline style, no box border)
- Password field + show/hide eye icon
- "Keep me signed in" checkbox + "FORGOT PASSWORD?" link
- Full-width button in tenant brand color — "SIGN IN"
- "or" divider line
- "Continue with Google" button (outline)
- "Continue with Facebook" button (outline)
- "Don't have an account? Create account" link
- Only tenant-variable elements: logo + button color

**Member Dashboard** (FastAPI Jinja2 template):
- Dark left sidebar: tenant logo top-left, nav items (Home, Reports, Search, Members, Settings), user profile bottom-left (name, PAID badge, Active status)
- Main area header: "Guest Surveillance Dashboard" + search bar top-right
- 4 stat cards: Total Searches, Flagged Guests, Active Reports, File Report (Create New Report button)
- Recent Reports Matches table: Guest Name, Issue Type, Date Reported, Severity (Critical/High/Medium badges), Action (eye icon)
- Pagination at bottom of table

---

## WHAT EXISTS (DO NOT REWRITE)

| Item | Location | Notes |
|---|---|---|
| Search algorithm | `search files/search_logic.py` | COMPLETE. DO NOT TOUCH THE MATH. |
| Public report form | `public_form.html` | COMPLETE. FastAPI-handled. |
| 5 React marketing templates | `REACT frontends/` | Landing pages only. |
| Architecture spec | `GuestGuard_Master_Architecture_Plan.md` | Reference. |
| Admin dashboard spec | `File2-AdminDashboard-Final.txt` | 11-panel full spec. Reference. |

---

## SEARCH ALGORITHM — LOCKED (search_logic.py)
- RapidFuzz fuzzy matching
- With phone: Phone 50% + Name 30% + Location 20%
- Without phone: Name 60% + Location 40%
- HOT > 85 | WARM > 50 | COLD otherwise
- DO NOT CHANGE THIS MATH. EVER.

---

## WHAT NEEDS TO BE BUILT

### FastAPI Backend + UI
- [x] DB schema: users, guest_reports, search_history, subscriptions, tenants (all with tenant_id) — backend/database.py
- [x] Tenant resolution: read Host header → look up tenants table → return branding — backend/tenant.py
- [x] Backend folder structure created (main.py, database.py, models.py, auth.py, tenant.py, search_logic.py, routers/, templates/, static/)
- [x] search_logic.py copied as-is from search files/ (math untouched)
- [x] requirements.txt and .env.example written
- [x] Auth: /login, /register (JWT, sessions, email verification)
- [x] Social login: Google OAuth2 + Facebook OAuth2 (built and ready — credentials go in .env when obtained)
  - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET → Google Cloud Console
  - FACEBOOK_APP_ID, FACEBOOK_APP_SECRET → Facebook Developer Portal
  - Library: authlib (pip install authlib)
  - Both buttons visible on login/register page at all times — activate by adding keys to .env
- [x] Login/Register Jinja2 templates (styled per design reference above)
- [x] Member dashboard Jinja2 template (styled per design reference above)
- [x] Search page + endpoint (wraps search_logic.py, gated by subscription/trial)
- [x] Report submission page + endpoint
- [x] Trial enforcement: 7 days OR 3 searches
- [x] Stripe integration: $7/month subscription + webhooks
- [x] Dynamic CORS: allow all registered tenant domains (implemented + tested)
- [x] Admin dashboard: 11-panel Jinja2 UI (see File2-AdminDashboard-Final.txt)
- [x] POST /admin/ai-assistant (Anthropic API, reads live DB, ANTHROPIC_API_KEY in .env)

### React Marketing Sites
- [x] Each site has tenantConfig.js/ts wired to VITE_FASTAPI_URL or REACT_APP_FASTAPI_URL
- [x] All Login/Register/Contact nav links and CTA buttons point to FastAPI via tenantConfig
- [x] HeaderTwo.tsx and HeaderThree.tsx updated (Link → a href, removed undefined handleClick)
- [x] .env.example created for all 5 sites
- [x] netlify.toml created for all 5 sites (Vite: publish="dist", CRA: publish="build")
- [x] No app functionality in React — marketing pages only

---

## REACT FRONTEND INVENTORY
| Folder | Stack | Notes |
|---|---|---|
| template-react1 | Vite + JSX | Marketing template with animations/preloader |
| template-react2 | Vite + JSX | Different design |
| pandawa-react3 | Vite + JSX | Similar |
| template-react4 | CRA + craco | Planical/TeleportHQ template, component library |
| aivora-react5 | CRA + TypeScript | Bare boilerplate |

---

## LOCKED CONTRACTS — NEVER CHANGE
- Routes: /register /login /dashboard /search /report /admin /submit-report
- Auth fields: email, password
- Never hardcode domain names anywhere
- Always resolve tenant from request Host header
- Never hardcode tenant_id = 1

---

## ADMIN DASHBOARD — 11 PANELS (all at /admin, dynamic, no page navigation)
1. Platform Overview — stats, health, financials, alerts
2. User Management — list, profiles, membership control, ban/suspend
3. Guest Database — records, risk scores, report history
4. Report Moderation — queue, approve/reject
5. Search System — activity stats
6. Billing & Subscriptions — Stripe customers, management, revenue
7. Verification System — email (required) + Twilio phone (toggle, off by default)
8. System Administration — logs, feature toggles, platform settings
9. Tenant Management — domain, brand name, logo URL stored here — BRANDING SOURCE
10. Site Performance — signups/conversion/revenue per domain
11. AI Assistant — Anthropic API, reads live DB, answers admin questions

---

## BUILD ORDER — ORIGINAL PHASES
- Phase 1: Docs + contract lock ← COMPLETE
- Phase 2: FastAPI DB schema + tenant system ← COMPLETE
- Phase 3: Auth (login/register) + styled Jinja2 templates ← COMPLETE
- Phase 4: Member dashboard + search + report pages ← COMPLETE
- Phase 5: Stripe billing + trial enforcement ← COMPLETE
- Phase 6: Admin dashboard (11 panels) ← COMPLETE
- Phase 7: React sites wired to FastAPI backend ← COMPLETE

---

## TESTING & BUG FIXES (2026-03-23)

Every page tested with live server on http://localhost:8000. All return 200 except /submit-report (not built yet).

### Bugs found and fixed:
- [x] Missing .env file — created `backend/.env` with DEBUG=true (secure cookie was blocking auth on HTTP localhost)
- [x] JWT missing name field — added `name` param to `create_access_token()` in auth.py + updated all 3 call sites in auth_routes.py
- [x] Admin billing panel crash — `now_utc` undefined in billing.html template, replaced with pre-computed `days_remaining` in admin_routes.py

### Files modified during testing:
- `backend/.env` — CREATED
- `backend/auth.py` — added name to JWT
- `backend/routers/auth_routes.py` — pass name in create_access_token calls
- `backend/routers/admin_routes.py` — compute days_remaining for billing panel
- `backend/templates/admin/panels/billing.html` — use s.days_remaining instead of broken now_utc math

### Test user in DB:
- Email: test@guestguard.com / Password: password123
- is_admin=1, is_verified=1, tenant_id=1

---

## FEATURES ALREADY WORKING (credential-gated, just add keys to .env):
- Google OAuth — full flow built, add GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET to .env
- Facebook OAuth — full flow built, add FACEBOOK_APP_ID + FACEBOOK_APP_SECRET to .env
- Stripe billing — full flow built, add STRIPE_SECRET_KEY + STRIPE_PRICE_ID + STRIPE_WEBHOOK_SECRET to .env
- AI Assistant — full flow built, add ANTHROPIC_API_KEY to .env
- Email verification — full flow built, add SMTP_HOST/PORT/USER/PASSWORD/FROM_EMAIL to .env

---

## NEW FEATURES TO BUILD (next session)

### Phase 8: Report-to-Registration Funnel
**Status: COMPLETE (tested)**
- Built `/submit-report` GET/POST in `backend/routers/public_routes.py` with session-backed pending report storage
- Added `backend/templates/public_form.html` (tenant-aware styling and branding)
- Added `/register?from=report` banner in `backend/templates/register.html`
- After register, pending report is auto-saved with `submitted_by_user_id` then session is cleared
- Tested with live server + curl:
  - `GET /submit-report` => 200 + HTML content
  - `POST /submit-report` => 302 -> `/register?from=report`
  - `POST /register` (with pending session) => user created + report inserted for that user (DB verified)

### Phase 9: Basic Abuse Protection
**Status: COMPLETE (tested)**
- Added DB columns and migrations:
  - `users.signup_ip`, `users.login_ip`
  - `guest_reports.submitted_ip`
- Registration now stores signup IP and logs `ip_flag` to `admin_logs` when IP matches existing users
- Login now updates `users.login_ip`
- Added report abuse limit: max 5 authenticated `/report` submissions per user per day
- Tested with live server + curl:
  - Login updates `login_ip` (DB verified)
  - New registration creates `ip_flag` admin log entry when IP matches (DB verified)
  - `/report` attempts returned: `302,302,302,302,302,429` (limit enforced)
- Bug found/fixed during testing:
  - `POST /report` initially returned 500 (`NOT NULL constraint failed: guest_reports.tenant_id`)
  - Fixed by adding tenant ID fallback resolver in `dashboard_routes.py`

### Phase 10: Twilio Phone Verification (Toggle-Controlled)
**Status: COMPLETE (tested)**
- Added Twilio-ready flow (toggle-controlled, OFF by default):
  - DB-backed feature flags via new `backend/feature_flags.py` + `feature_flags` table
  - `twilio_verification` flag wired to admin toggle endpoint
  - Twilio controls shown in Verification panel (`backend/templates/admin/panels/verification.html`)
- Registration behavior:
  - OFF: email-only register flow (phone field hidden)
  - ON: phone field required; if Twilio creds exist, sends Verify SMS and redirects to `/verify-phone`
  - If Twilio call fails or creds missing, gracefully falls back to email verification
- Added `backend/templates/verify_phone.html` + `/verify-phone` GET/POST handlers
- Added DB support: `users.phone`, `users.phone_verified`
- Updated `backend/.env.example` + `backend/requirements.txt` (added `twilio`)
- Tested with live server + curl:
  - Default flag = 0
  - Register page hides phone field when OFF
  - Toggle ON via admin endpoint works
  - Register page shows phone field when ON
  - Missing phone when ON => 422
  - Phone provided with missing Twilio creds => fallback redirect to `/verify-email?sent=1`
  - `/verify-phone` without session => 302 -> `/login`
  - Verification panel shows Twilio env warning when creds are missing

### Also remaining:
- [x] Dynamic CORS: allow all registered tenant domains (done)

---

## TO DEPLOY
1. Push backend/ to Railway. Set all .env vars (JWT_SECRET, SMTP_*, STRIPE_*, ANTHROPIC_API_KEY, TWILIO_*, etc.)
2. For each React site: copy .env.example → .env.local, set VITE_FASTAPI_URL or REACT_APP_FASTAPI_URL to your Railway URL
3. Deploy each React site to Netlify (netlify.toml is pre-configured in each folder)
4. Add each domain to the Tenants table via /admin → Tenant Management
