# GuestGuard — Master Context File for Claude Code (Cursor)
# READ THIS ENTIRE FILE BEFORE WRITING ANY CODE.
# DO NOT SKIP SECTIONS. DO NOT MAKE ASSUMPTIONS.

---

## WHAT THIS PROJECT IS

GuestGuard is a guest-screening SaaS platform for short-term rental hosts (Airbnb/VRBO).

**Hosts can:**
- Submit reports on problematic guests (free, requires email verification)
- Search a shared guest database ($7/month, 10 searches/month)
- Trial: 7 days OR 3 searches, whichever comes first

**Business model:**
Multiple branded domains (guestcheckbnb.com, safehostscan.com, rentershield.ai, etc.) all connect to ONE backend and ONE database. The purpose is to A/B test which brand, design, and pricing converts best. All domains share the same features and data.

---

## ARCHITECTURE — FINAL AND LOCKED

### DO NOT REINTERPRET THIS.

```
┌─────────────────────────────────────────┐
│         5 React Marketing Sites         │
│  (Netlify — each on its own domain)     │
│  Marketing/landing pages ONLY           │
│  Login/Register buttons → link to       │
│  FastAPI /login and /register routes    │
└─────────────┬───────────────────────────┘
              │ HTTP redirect to FastAPI
              ▼
┌─────────────────────────────────────────┐
│           FastAPI Backend               │
│           (Railway)                     │
│                                         │
│  Renders ALL application UI:            │
│  /login  /register  /dashboard          │
│  /search  /report  /admin               │
│                                         │
│  Uses Jinja2 HTML templates             │
│  Templates MUST be modern + styled      │
│  (NOT plain HTML)                       │
│                                         │
│  Detects domain from Host header        │
│  Injects tenant branding into templates │
│                                         │
│  Also handles:                          │
│  Auth (JWT) / Stripe / Email / Search   │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│         SQLite Database                 │
│  Shared. All tables have tenant_id.     │
└─────────────────────────────────────────┘
```

### React sites = marketing pages ONLY
- There is NO React dashboard
- There is NO React login page
- Do NOT add app functionality to React sites
- React sites only need a "Login" and "Sign Up" button that links to FastAPI /login and /register

### FastAPI = renders everything
- FastAPI is NOT API-only
- FastAPI renders full HTML pages using Jinja2 templates
- These templates must be modern, styled, and match the UI screenshots in this document
- FastAPI reads the Host header on every request to determine which tenant/brand to show

---

## TENANT / BRANDING SYSTEM

Every domain is a "tenant". Tenants are managed in the Admin → Tenant Management panel.

**Tenants table stores:**
- domain (e.g. guestcheckbnb.com)
- brand_name (e.g. GuestCheckBnb)
- logo_url (URL to logo image)
- primary_color (hex, e.g. #3b82f6)
- active (boolean)

**How it works on every request:**
1. FastAPI reads `request.headers.get("host")`
2. Strips port if present
3. Looks up domain in tenants table
4. If found: injects brand_name, logo_url, primary_color into the Jinja2 template
5. If not found: uses default fallback branding
6. Every rendered page shows the correct tenant's logo and brand color

**Adding a new branded site:**
Admin adds one row to the tenants table. That's it. No code changes needed.

---

## DATABASE SCHEMA

```sql
-- Tenants (brands/domains)
CREATE TABLE tenants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    domain TEXT UNIQUE NOT NULL,
    brand_name TEXT NOT NULL,
    logo_url TEXT,
    primary_color TEXT DEFAULT '#3b82f6',
    active INTEGER DEFAULT 1,
    created_at TEXT
);

-- Users
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    is_verified INTEGER DEFAULT 0,
    is_admin INTEGER DEFAULT 0,
    signup_domain TEXT,
    created_at TEXT,
    last_login TEXT,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Guest Reports
CREATE TABLE guest_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    submitted_by_user_id INTEGER,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    email TEXT,
    airbnb_vrbo_profile TEXT,
    city TEXT,
    state TEXT,
    prev_group_size INTEGER,
    prev_stay_length INTEGER,
    stay_date TEXT,
    guest_rating INTEGER,
    incident_flags TEXT,
    report_reason TEXT,
    details_of_incident TEXT,
    uploaded_images TEXT,
    status TEXT DEFAULT 'pending',
    created_at TEXT,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Search History
CREATE TABLE search_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    query_text TEXT,
    guest_name TEXT,
    match_score REAL DEFAULT 0,
    risk_level TEXT DEFAULT 'low',
    matched_report_id INTEGER,
    searched_at TEXT,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Subscriptions
CREATE TABLE subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL UNIQUE,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    plan_name TEXT DEFAULT 'trial',
    is_paid INTEGER DEFAULT 0,
    trial_start TEXT,
    trial_searches_used INTEGER DEFAULT 0,
    member_since TEXT,
    next_billing TEXT,
    status TEXT DEFAULT 'trial',
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Email Verification Tokens
CREATE TABLE verification_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    created_at TEXT,
    expires_at TEXT,
    used INTEGER DEFAULT 0
);

-- Password Reset Tokens
CREATE TABLE password_reset_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    created_at TEXT,
    expires_at TEXT,
    used INTEGER DEFAULT 0
);

-- Admin Action Log
CREATE TABLE admin_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_user_id INTEGER,
    action TEXT,
    target TEXT,
    detail TEXT,
    created_at TEXT
);
```

---

## SEARCH ALGORITHM — DO NOT TOUCH

**File:** `search files/search_logic.py`

This is the core of the product. The RapidFuzz fuzzy matching math is locked.

```
With phone:    Phone(50%) + Name(30%) + Location(20%)
Without phone: Name(60%) + Location(40%)
HOT > 85  |  WARM > 50  |  COLD otherwise
```

**Rule:** Copy this file to the backend. Do not modify the calculate_confidence() or search_guests() functions. Only wrap it in a FastAPI endpoint.

---

## LOCKED ROUTE CONTRACTS

These routes must never be renamed:
- `/login`
- `/register`
- `/dashboard`
- `/search`
- `/report`
- `/admin`
- `/submit-report` (public report form)
- `/verify-email`
- `/forgot-password`
- `/reset-password`

---

## AUTH SYSTEM

**JWT-based. Sessions via HTTP-only cookies.**

- Register: email + password → hash password (bcrypt) → create user → send verification email → redirect to "check your email" page
- Login: email + password → verify → check email verified → create JWT → set HTTP-only cookie → redirect to /dashboard
- JWT payload: user_id, tenant_id, email, is_admin
- Protected routes: check JWT cookie on every request
- Unverified users: can log in but see a banner — "Please verify your email"

**Social Login (Google + Facebook):**
- Library: `authlib`
- Built and ready. Keys go in .env to activate.
- .env keys needed:
  - GOOGLE_CLIENT_ID
  - GOOGLE_CLIENT_SECRET
  - FACEBOOK_APP_ID
  - FACEBOOK_APP_SECRET
- OAuth callback routes: `/auth/google/callback` and `/auth/facebook/callback`
- On successful OAuth: create user if not exists, set JWT cookie, redirect to /dashboard

---

## EMAIL SYSTEM

- Library: `fastapi-mail` or `smtplib`
- .env keys: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, FROM_EMAIL
- Emails sent:
  1. Email verification (on register)
  2. Password reset
  3. Welcome email (on first login after verification)
- All email links must use the domain the user registered from (dynamic, not hardcoded)

---

## STRIPE BILLING

- Library: `stripe`
- .env keys: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID
- $7/month subscription
- Trial: 7 days OR 3 searches (enforced in backend, whichever comes first)
- Webhook endpoint: POST /stripe/webhook
- Events to handle: checkout.session.completed, customer.subscription.deleted, invoice.payment_failed

---

## TRIAL ENFORCEMENT (CRITICAL)

On every search request:
1. Check if user is paid subscriber → allow
2. If trial: check trial_start vs now (7 days max) AND trial_searches_used < 3
3. If both limits not hit → allow search, increment trial_searches_used
4. If either limit hit → block search, show upgrade prompt

---

## UI DESIGN SPECIFICATIONS

### Global Rules for All FastAPI Templates
- Font: Inter (Google Fonts)
- All pages must be responsive
- No Bootstrap. Use custom CSS or Tailwind via CDN.
- Colors are tenant-driven (injected via template variables)
- Template variable `{{ tenant.primary_color }}` = button/highlight color
- Template variable `{{ tenant.logo_url }}` = logo image src
- Template variable `{{ tenant.brand_name }}` = brand name text

---

### LOGIN / REGISTER PAGE DESIGN

**URL:** `/login` and `/register`

**Layout:**
- Full page: light grey background (#f5f5f5)
- Centered white card: max-width 420px, border-radius 16px, box-shadow subtle
- Vertically and horizontally centered

**Card contents (Login):**
- TOP: tenant logo image (from `{{ tenant.logo_url }}`), centered, max-height 48px
- Heading: "Sign in" — font-size 24px, font-weight 700, centered
- Subheading: "to continue to your account" — grey, centered, font-size 14px
- Email field: underline style (no box border), placeholder "Email"
- Password field: underline style, placeholder "Password", show/hide eye icon toggle
- Row: "Keep me signed in" checkbox (left) + "FORGOT PASSWORD?" link (right, brand color)
- Sign In button: full width, background = `{{ tenant.primary_color }}`, white text, bold, rounded, 48px height
- "or" divider: horizontal lines with "or" centered
- "Continue with Google" button: full width, outline style, Google icon SVG left, grey text
- "Continue with Facebook" button: full width, outline style, Facebook icon SVG left, grey text
- Bottom: "Don't have an account? Create account" — link to /register

**Card contents (Register):**
- Same layout as login
- Fields: Full Name, Email, Password, Confirm Password
- Button text: "CREATE ACCOUNT"
- Bottom: "Already have an account? Sign in" — link to /login

---

### MEMBER DASHBOARD DESIGN

**URL:** `/dashboard`

**Layout:** Two-column. Left sidebar fixed. Right = main content scrollable.

**Left Sidebar:**
- Width: 240px
- Background: #1a1f2e (dark navy)
- TOP section:
  - Tenant logo + brand name (white text)
- Navigation items (icon + label):
  - Home (active state = blue highlight background, rounded)
  - Reports
  - Search
  - Members
  - Settings
  - Icons: use simple SVG or lucide icons
- BOTTOM section (user profile card):
  - User avatar (colored circle with initials)
  - Label: "Host Member" (small grey text)
  - Name: bold white text
  - "Membership:" label + green "PAID" badge (or orange "TRIAL" badge)
  - "Status:" label + blue dot + "Active" text

**Main Content Area:**
- Background: #f0f2f5
- Padding: 32px

**Header row:**
- Left: Page title "Guest Surveillance Dashboard" (bold, 28px) + subtitle "Monitor guest history and maintain property safety." (grey, 14px)
- Right: Search bar "Search Guest Name or ID..." (rounded, light border, search icon)

**4 Stat Cards (grid, 4 columns):**
All cards: white background, rounded-16, subtle shadow, padding 24px

1. TOTAL SEARCHES
   - Label: "TOTAL SEARCHES" (small caps, grey)
   - Number: large bold (e.g. 124)
   - Icon: eye icon (blue, top right)
   - Sub: "+12% from yesterday" (green text)

2. FLAGGED GUESTS
   - Label: "FLAGGED GUESTS"
   - Number: large bold
   - Icon: warning triangle (orange/red, top right)
   - Sub: "+3 new reports this week" (red text)

3. ACTIVE REPORTS
   - Label: "ACTIVE REPORTS"
   - Number: large bold
   - Icon: checkmark circle (green, top right)
   - Sub: "Global historical database" (grey text)

4. FILE REPORT
   - Label: "FILE REPORT"
   - Icon: document icon (blue, top right)
   - Button: "CREATE NEW REPORT" (full width, brand color, bold)
   - Sub: "Submit a new guest incident" (grey text)

**Recent Reports Matches Table:**
- Section header: "Recent Reports Matches" (bold, left) + "View All" link (brand color, right)
- White card container, rounded, padding
- Table columns: GUEST NAME | ISSUE TYPE | DATE REPORTED | SEVERITY | ACTION
- Column headers: small caps, grey, letter-spaced
- Each row:
  - GUEST NAME: colored avatar circle (initials) + bold name + "ID: XXXXXX" grey below
  - ISSUE TYPE: plain text
  - DATE REPORTED: plain text
  - SEVERITY badge: pill shape
    - Critical = red background, white text
    - High = orange background, white text
    - Medium = yellow background, dark text
    - Low = green background, white text
  - ACTION: eye icon button (grey, hover = brand color)
- Table footer: "Showing X of Y entries" (grey, left) + Previous/Next buttons (right)

---

### REPORT SUBMISSION FORM DESIGN

**URL:** `/report` (authenticated users) and `/submit-report` (public)

**Layout:**
- Dark background (#12121f or similar deep dark)
- Centered content, max-width 700px
- White cards for each section, rounded-12, padding 24px
- Section label: small caps, grey, with bottom border separator

**Sections (cards):**

1. GUEST NAME & PROFILE
   - First Name (required *) | Last Name (blank if unknown)
   - Airbnb / Vrbo Profile URL (full width)

2. CONTACT INFORMATION
   - Phone Number | Email (blank if unknown)

3. GUEST LOCATION
   - City | State (dropdown, all US states)

4. STAY DETAILS
   - Group Size (number) | Stay Length in nights (number)
   - Date Guest Stayed (date picker)

5. WHAT HAPPENED? (SELECT ALL THAT APPLY)
   - Checkbox grid (2 columns):
     - Had a Party / Extra Guest
     - Damaged Items (Walls, Etc)
     - Over Stayed / Late Check out
     - Left Bad Review / Dishonest Fake
     - Noise Disturbances / Loud Music
     - Pets without Permission
     - Requested Discount
     - Inaccurate / Misleading Report Airbnb/VRBO

6. RATING & DETAILS
   - Guest Rating: 5-star selector (click stars)
   - Details of Incident (required *): large textarea

7. EVIDENCE PHOTOS (OPTIONAL — JPG, PNG, GIF, WEBP)
   - Two upload boxes side by side (dashed border)
   - Upload Photo 1 / Upload Photo 2
   - "Click to browse"

8. PRIVACY & SUBMIT (bottom card)
   - Checkbox: "I agree to the Privacy Policy and confirm the information is accurate"
   - Submit button: full width, brand color

---

### SEARCH PAGE DESIGN

**URL:** `/search`

**Layout:** Same sidebar as dashboard. Main content area.

**Search form:**
- Card with search inputs: First Name, Last Name, Phone, City, State
- Search button: brand color
- Results appear below as cards showing:
  - Match temperature badge (HOT/WARM/COLD)
  - Match score percentage
  - Guest name, location, reason
  - Severity indicator

**Trial/subscription gate:**
- If trial expired or searches used up: show upgrade banner instead of results
- Banner: "Your trial has ended. Upgrade to continue searching."
- Button: "Upgrade — $7/month"

---

## ADMIN DASHBOARD DESIGN

**URL:** `/admin`

**Layout:** Same sidebar pattern as member dashboard but admin-specific nav.

**Sidebar nav items:**
1. Platform Overview
2. User Management
3. Guest Database
4. Report Moderation
5. Search System
6. Billing & Subscriptions
7. Verification System
8. System Administration
9. Tenant Management
10. Site Performance
11. AI Assistant

All panels load dynamically (JS fetch/swap content) — NO full page reloads between panels.

**See `File2-AdminDashboard-Final.txt` for complete data specification of each panel.**

**Key admin rules:**
- All routes require `is_admin = True` on the JWT
- All data filtered by tenant_id where applicable
- Do NOT modify search algorithm
- Do NOT modify Stripe billing logic
- Tenant Management panel = where admins add domains and logos (this drives all branding)
- AI Assistant panel: POST /admin/ai-assistant → backend calls Anthropic API with live DB context → streams response back

---

## FILE STRUCTURE TO BUILD

```
backend/
├── main.py                  # FastAPI app entry point
├── database.py              # SQLite connection, init_db()
├── models.py                # Pydantic models
├── auth.py                  # JWT, bcrypt, OAuth (Google/Facebook)
├── tenant.py                # get_current_tenant(request) resolver
├── search_logic.py          # COPIED from search files/ — DO NOT MODIFY
├── requirements.txt
├── .env.example             # All required env vars listed
├── routers/
│   ├── auth_routes.py       # /login /register /logout /verify-email
│   ├── dashboard_routes.py  # /dashboard /search /report
│   ├── admin_routes.py      # /admin and all 11 panel endpoints
│   ├── billing_routes.py    # /stripe/webhook /billing/upgrade
│   └── public_routes.py     # /submit-report (public form)
├── templates/
│   ├── base.html            # Base layout with tenant branding injected
│   ├── login.html
│   ├── register.html
│   ├── verify_email.html
│   ├── forgot_password.html
│   ├── reset_password.html
│   ├── dashboard.html
│   ├── search.html
│   ├── report.html
│   ├── admin/
│   │   ├── base_admin.html
│   │   ├── admin_main.html
│   │   └── panels/
│   │       ├── overview.html
│   │       ├── users.html
│   │       ├── guest_db.html
│   │       ├── moderation.html
│   │       ├── search_system.html
│   │       ├── billing.html
│   │       ├── verification.html
│   │       ├── system_admin.html
│   │       ├── tenant_mgmt.html
│   │       ├── performance.html
│   │       └── ai_assistant.html
│   └── public_form.html     # Public report submission
├── static/
│   ├── css/
│   │   ├── main.css         # Global styles
│   │   ├── dashboard.css
│   │   ├── auth.css
│   │   └── admin.css
│   ├── js/
│   │   ├── dashboard.js
│   │   ├── admin.js
│   │   └── auth.js
│   └── uploads/             # Uploaded images stored here
```

---

## ENVIRONMENT VARIABLES (.env)

```
# Database
DATABASE_URL=guests.db

# Auth
JWT_SECRET=your-secret-key-here
JWT_ALGORITHM=HS256
JWT_EXPIRY_HOURS=24

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
FROM_EMAIL=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Facebook OAuth
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=

# Anthropic (AI Assistant)
ANTHROPIC_API_KEY=

# App
APP_SECRET_KEY=your-app-secret-here
DEBUG=false
```

---

## PYTHON DEPENDENCIES (requirements.txt)

```
fastapi
uvicorn[standard]
jinja2
python-multipart
aiofiles
sqlite3
python-jose[cryptography]
bcrypt
passlib[bcrypt]
authlib
httpx
stripe
fastapi-mail
python-dotenv
anthropic
rapidfuzz
```

---

## CRITICAL RULES — AI MUST FOLLOW THESE

1. **Never hardcode domain names** — always resolve from tenants table
2. **Never hardcode tenant_id = 1** — always use get_current_tenant(request)
3. **Never modify search_logic.py math** — copy as-is, only wrap in endpoint
4. **Never rename routes** — /login stays /login, /dashboard stays /dashboard
5. **Never build a React dashboard** — FastAPI renders all app UI
6. **Never use plain unstyled HTML** — all templates must be modern and styled
7. **Always tag data with tenant_id** — every insert must include tenant_id
8. **Never skip email verification** — users must verify before full access
9. **Always enforce trial limits** — 7 days OR 3 searches, checked server-side
10. **Update PROGRESS.md at end of every session** — mark completed items

---

## WHAT EXISTS — DO NOT REWRITE

| File | Status | Rule |
|---|---|---|
| `search files/search_logic.py` | Complete | Copy to backend/, never modify the math |
| `public_form.html` | Complete | Use as reference for /submit-report template styling |
| `REACT frontends/` | 5 marketing templates | Add login/register links only — no app pages |
| `File2-AdminDashboard-Final.txt` | Full admin spec | Follow exactly for 11 admin panels |
| `GuestGuard_Master_Architecture_Plan.md` | Architecture reference | Read for context |

---

## SESSION RULES

- Read PROGRESS.md at the start of every session
- Check off completed items in PROGRESS.md as you finish them
- Never ask the user to re-explain the architecture
- When in doubt about a feature, refer to File2-AdminDashboard-Final.txt
- Build in the phase order defined in PROGRESS.md
- Do not start Phase N+1 until Phase N is complete and marked in PROGRESS.md
