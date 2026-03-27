# GuestGuard — Full Build Plan
# For Claude Code / Cursor — Follow phases in order. Do not skip ahead.
# Mark each task DONE in PROGRESS.md when complete.

---

## PHASE 1 — PROJECT SETUP
Status: COMPLETE

- [x] CLAUDE.md written (master context)
- [x] PLAN.md written (this file)
- [x] PROGRESS.md written (session tracker)
- [x] Architecture confirmed and locked

---

## PHASE 2 — BACKEND FOUNDATION

### 2.1 — Project Structure
Create the following empty folder structure:
```
backend/
├── main.py
├── database.py
├── models.py
├── auth.py
├── tenant.py
├── search_logic.py   ← COPY from "search files/search_logic.py" (do not modify)
├── requirements.txt
├── .env.example
├── routers/
│   ├── __init__.py
│   ├── auth_routes.py
│   ├── dashboard_routes.py
│   ├── admin_routes.py
│   ├── billing_routes.py
│   └── public_routes.py
├── templates/
│   └── (empty — built in Phase 3+)
└── static/
    ├── css/
    ├── js/
    └── uploads/
```

### 2.2 — Database (database.py)
- Connect to SQLite (guests.db)
- Run CREATE TABLE IF NOT EXISTS for all tables defined in CLAUDE.md
- Tables: tenants, users, guest_reports, search_history, subscriptions, verification_tokens, password_reset_tokens, admin_logs
- Insert one default tenant row on first run (for local dev):
  - domain: "localhost"
  - brand_name: "GuestGuard"
  - logo_url: "/static/img/default-logo.svg"
  - primary_color: "#3b82f6"

### 2.3 — Tenant Resolver (tenant.py)
```python
def get_current_tenant(request: Request) -> dict:
    host = request.headers.get("host", "localhost").split(":")[0]
    # Look up host in tenants table
    # Return dict: {id, domain, brand_name, logo_url, primary_color}
    # If not found: return default tenant
```
- Used on EVERY route that renders a template
- Never hardcode tenant_id

### 2.4 — Auth Module (auth.py)
- Password hashing: bcrypt via passlib
- JWT creation and verification: python-jose
- JWT stored in HTTP-only cookie named "access_token"
- JWT payload: {user_id, tenant_id, email, is_admin, exp}
- Helper: get_current_user(request) — reads cookie, decodes JWT, returns user dict
- Helper: require_auth(request) — redirects to /login if no valid JWT
- Helper: require_admin(request) — redirects to /login if not is_admin

### 2.5 — Main App (main.py)
- Create FastAPI app
- Mount static files at /static
- Set up Jinja2Templates
- Register all routers
- On startup: run database init
- CORS: read all active tenant domains from DB, add to allowed origins list

---

## PHASE 3 — AUTH PAGES (LOGIN / REGISTER)

### 3.1 — Routes (auth_routes.py)
```
GET  /login          → render login.html with tenant branding
POST /login          → validate credentials → set JWT cookie → redirect /dashboard
GET  /register       → render register.html with tenant branding
POST /register       → create user → send verification email → render "check email" page
GET  /logout         → clear JWT cookie → redirect /login
GET  /verify-email   → validate token → mark user verified → redirect /login with success
GET  /forgot-password → render forgot_password.html
POST /forgot-password → send reset email
GET  /reset-password  → render reset_password.html
POST /reset-password  → update password → redirect /login
GET  /auth/google    → OAuth2 redirect
GET  /auth/google/callback → handle Google OAuth → create/login user → redirect /dashboard
GET  /auth/facebook  → OAuth2 redirect
GET  /auth/facebook/callback → handle Facebook OAuth → create/login user → redirect /dashboard
```

### 3.2 — Login Template (templates/login.html)
Follow LOGIN / REGISTER PAGE DESIGN spec in CLAUDE.md exactly:
- Extends base.html (inherits tenant branding variables)
- Light grey full-page background
- Centered white card (420px max-width)
- Tenant logo top-center (dynamic)
- "Sign in" heading
- Email field (underline style)
- Password field + show/hide toggle
- "Keep me signed in" checkbox + "FORGOT PASSWORD?" link
- SIGN IN button (tenant primary_color)
- "or" divider
- Continue with Google button (outline, Google SVG icon)
- Continue with Facebook button (outline, Facebook SVG icon)
- "Don't have an account? Create account" link → /register
- Flash message area (for errors: wrong password, unverified email, etc.)

### 3.3 — Register Template (templates/register.html)
Same card design as login:
- Full Name, Email, Password, Confirm Password fields
- CREATE ACCOUNT button
- Same social login buttons
- "Already have an account? Sign in" → /login

### 3.4 — Base Template (templates/base.html)
- Sets tenant variables available to all child templates:
  - {{ tenant.brand_name }}
  - {{ tenant.logo_url }}
  - {{ tenant.primary_color }}
- Links to Inter font (Google Fonts CDN)
- Links to main.css

### 3.5 — Email Verification
- On register: generate UUID token → store in verification_tokens table → send email
- Email body: "Click here to verify: https://[original-domain]/verify-email?token=XXX"
- Domain in link = the domain the user registered from (from tenant record)
- Token expires in 24 hours

---

## PHASE 4 — MEMBER DASHBOARD

### 4.1 — Routes (dashboard_routes.py)
```
GET  /dashboard      → require_auth → render dashboard.html with user stats + recent reports
GET  /search         → require_auth → render search.html
POST /search         → require_auth → enforce trial limits → call search_logic → render results
GET  /report         → require_auth → render report.html (authenticated report form)
POST /report         → require_auth → save report → redirect with success message
GET  /account        → require_auth → render account/settings page
```

### 4.2 — Dashboard Template (templates/dashboard.html)
Follow MEMBER DASHBOARD DESIGN spec in CLAUDE.md exactly.

**Left sidebar:**
- Dark navy background (#1a1f2e)
- Tenant logo + brand name (white)
- Nav: Home, Reports, Search, Members, Settings (with icons)
- Active item: blue highlight, rounded corners
- Bottom: user avatar (initials), name, "Host Member", PAID/TRIAL badge, Active status

**Stat cards (4 across):**
Data from backend:
- total_searches: COUNT from search_history WHERE user_id = current_user
- flagged_guests: COUNT from guest_reports WHERE status = 'approved' (global)
- active_reports: total approved reports in DB
- trial_searches_remaining: 3 - trial_searches_used (if on trial)

**Recent Reports Matches table:**
- Last 10 searches from search_history for current user
- Show: guest name, issue type (from matched report), date, severity badge, view action

### 4.3 — Search Template (templates/search.html)
Same sidebar layout.

**Search form:**
- Card with fields: First Name, Last Name, Phone, City, State
- Search button (brand color)
- Trial status bar: "X of 3 trial searches used" or "Paid member — unlimited searches this month (X/10 used)"

**Results section (rendered on POST):**
- Each result as a card:
  - Temperature badge: HOT (red), WARM (orange), COLD (blue)
  - Match score: XX%
  - Guest name + location
  - Incident type
  - View full report button

**Trial expired state:**
- Hide search form
- Show upgrade card: "Your trial has ended" + "Upgrade for $7/month" button

### 4.4 — Report Template (templates/report.html)
Follow REPORT SUBMISSION FORM DESIGN spec in CLAUDE.md exactly.
Dark background (#12121f), white section cards.
Same sections as public_form.html but for authenticated users:
- Guest Name & Profile
- Contact Information
- Guest Location
- Stay Details
- What Happened (checkboxes)
- Rating & Details (star rating + textarea)
- Evidence Photos (2 upload boxes)
- Privacy checkbox + Submit button

### 4.5 — Trial Enforcement (in dashboard_routes.py POST /search)
```python
# Check trial status before every search
sub = get_subscription(user_id)
if not sub.is_paid:
    days_in_trial = (now - sub.trial_start).days
    if days_in_trial > 7 or sub.trial_searches_used >= 3:
        return redirect to upgrade page
    else:
        increment trial_searches_used
        proceed with search
```

---

## PHASE 5 — PUBLIC REPORT FORM

### 5.1 — Route (public_routes.py)
```
GET  /submit-report  → render public_form.html (no auth required)
POST /submit-report  → save report to guest_reports with status='pending' → show success
```

### 5.2 — Template (templates/public_form.html)
- Use existing `public_form.html` as the design reference
- Same dark background, white section cards
- Same fields as the authenticated report form
- No sidebar (public page)
- Tenant branding still applied (logo in header)

---

## PHASE 6 — STRIPE BILLING

### 6.1 — Routes (billing_routes.py)
```
GET  /billing/upgrade       → render upgrade page with Stripe checkout button
POST /billing/create-checkout → create Stripe checkout session → redirect to Stripe
GET  /billing/success        → handle success → update subscription in DB → redirect /dashboard
GET  /billing/cancel         → handle cancel → redirect /dashboard
POST /stripe/webhook         → handle Stripe events (payment success, cancellation, failure)
```

### 6.2 — Stripe Webhook Events
- `checkout.session.completed` → mark user as paid, set member_since, set next_billing
- `customer.subscription.deleted` → mark user as unpaid, downgrade to trial expired
- `invoice.payment_failed` → flag account, send notification email

### 6.3 — Upgrade Page
- Shows plan details: "$7/month — 10 searches per month"
- Stripe checkout button
- If trial active: show "X days / X searches remaining in trial"

---

## PHASE 7 — ADMIN DASHBOARD

### 7.1 — Admin Base (templates/admin/base_admin.html)
- Same sidebar pattern as member dashboard but with 11 admin nav items
- All admin routes protected by require_admin()
- Active panel content loaded dynamically via JS fetch (no full page reload)

### 7.2 — Admin Route Structure (admin_routes.py)
```
GET  /admin                    → render admin_main.html (defaults to Platform Overview)
GET  /admin/panel/overview     → return HTML partial for Platform Overview
GET  /admin/panel/users        → return HTML partial for User Management
GET  /admin/panel/guests       → return HTML partial for Guest Database
GET  /admin/panel/moderation   → return HTML partial for Report Moderation
GET  /admin/panel/search       → return HTML partial for Search System
GET  /admin/panel/billing      → return HTML partial for Billing & Subscriptions
GET  /admin/panel/verification → return HTML partial for Verification System
GET  /admin/panel/system       → return HTML partial for System Administration
GET  /admin/panel/tenants      → return HTML partial for Tenant Management
GET  /admin/panel/performance  → return HTML partial for Site Performance
GET  /admin/panel/ai           → return HTML partial for AI Assistant

POST /admin/users/{id}/suspend → suspend user
POST /admin/users/{id}/ban     → ban user
POST /admin/reports/{id}/approve → approve report
POST /admin/reports/{id}/reject  → reject report
POST /admin/tenants/add          → add new tenant
POST /admin/tenants/{id}/edit    → edit tenant
POST /admin/ai-assistant         → call Anthropic API with live DB context
```

### 7.3 — Panel Implementation
Build each panel per the full spec in `File2-AdminDashboard-Final.txt`.
Key panels:

**Panel 9 — Tenant Management:**
- Table: Tenant ID, Domain, Brand Name, Logo URL, Contact Email, Status, Actions
- "Add New Tenant" form: Domain, Brand Name, Logo URL, Contact Email, Active toggle
- This panel IS the branding control center — adding a row here activates a new branded site

**Panel 10 — Site Performance:**
- Signups per domain (chart)
- Trial-to-paid conversion per domain
- Revenue per domain
- Compare all active domains side by side

**Panel 11 — AI Assistant:**
- Text input for admin questions
- POST /admin/ai-assistant:
  - Backend pulls relevant live stats from DB
  - Passes as context to Anthropic claude-sonnet-4-6
  - Streams response back
- Feature flag: if ANTHROPIC_API_KEY not set → show "AI Assistant is disabled"

---

## PHASE 8 — REACT MARKETING SITES UPDATE

For each of the 5 React sites in `REACT frontends/`:
- Add "Login" button → links to `[FASTAPI_URL]/login`
- Add "Sign Up" / "Get Started" button → links to `[FASTAPI_URL]/register`
- The FastAPI URL is set in each site's tenantConfig.js as `api_url`
- No other changes to React sites

---

## ENV SETUP CHECKLIST

Before going live:
- [ ] Set JWT_SECRET to a strong random string
- [ ] Set APP_SECRET_KEY to a strong random string
- [ ] Configure SMTP credentials for email
- [ ] Add STRIPE_SECRET_KEY and STRIPE_PRICE_ID
- [ ] Add STRIPE_WEBHOOK_SECRET after registering webhook in Stripe dashboard
- [ ] Register Google OAuth app → add GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET
- [ ] Register Facebook app → add FACEBOOK_APP_ID + FACEBOOK_APP_SECRET
- [ ] Add ANTHROPIC_API_KEY for AI Assistant panel
- [ ] Add first real tenant row for each live domain

---

## DEPLOYMENT

**FastAPI (Railway):**
- `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Set all .env vars in Railway environment
- SQLite file persists on Railway volume

**React sites (Netlify):**
- Each site deployed separately
- Set VITE_API_URL (or equivalent) in Netlify env vars pointing to Railway FastAPI URL

---

## PROGRESS TRACKING

Update PROGRESS.md at end of every session.
Format: check off completed items, add notes on what was partially done.
Never start a new phase without completing the previous one.
