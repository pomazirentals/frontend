# PHASE 4 — Member Dashboard + Search + Report Pages
# CURSOR: Read this entire file before writing any code.

---

## CONTEXT

Phases 1–3 are complete:
- DB schema, tenant system, auth helpers all built
- `/login`, `/register`, `/logout`, `/verify-email`, `/forgot-password`, `/reset-password` all working
- Styled login/register templates done

**Your job in Phase 4:** Build the member-facing app pages:
- `/dashboard` — main dashboard with stat cards + recent reports table
- `/search` — guest search page with trial/subscription gate
- `/report` — authenticated report submission form
- All three share the same dark sidebar layout

---

## WHAT TO BUILD

### 1. `backend/routers/dashboard_routes.py`

#### GET /dashboard
- Call `require_auth(request)` — if not authenticated, redirect to /login
- Get tenant from `get_current_tenant(request)`
- Query DB for stats (scoped by tenant_id from the JWT, NOT hardcoded):
  - `total_searches`: COUNT from search_history WHERE user_id = current_user_id
  - `flagged_guests`: COUNT from guest_reports WHERE status = 'pending' AND tenant_id = tenant.id
  - `active_reports`: COUNT from guest_reports WHERE status = 'approved' AND tenant_id = tenant.id
- Query recent reports: last 10 rows from guest_reports WHERE tenant_id = tenant.id ORDER BY created_at DESC
- Query subscription row for current user from subscriptions table
- Render `templates/dashboard.html` with:
  - `tenant`, `user`, `stats`, `recent_reports`, `subscription`

#### GET /search
- Call `require_auth(request)`
- Get tenant, subscription
- Render `templates/search.html` with `tenant`, `user`, `subscription`, `results=None`

#### POST /search
- Call `require_auth(request)`
- Get tenant, subscription
- **Trial enforcement:**
  - If `subscription.is_paid = 1` → allow
  - If trial: check `trial_start` + 7 days vs now AND `trial_searches_used < 3`
  - If either limit exceeded → render search.html with `gate=True` (show upgrade prompt, no results)
- Form fields: `first_name`, `last_name`, `phone`, `city`, `state`
- Call `search_guests()` from `search_logic.py` — pass the form data and a list of all guest_reports dicts from DB
- Log search to search_history: `tenant_id`, `user_id`, `query_text` (JSON of inputs), `guest_name` (first+last), `match_score` (top result score or 0), `risk_level` (top result level or 'low'), `matched_report_id` (top result id or None), `searched_at` = now UTC ISO
- If trial: increment `subscriptions.trial_searches_used` by 1
- Render `templates/search.html` with `tenant`, `user`, `subscription`, `results` (list of match dicts), `gate=False`

#### GET /report
- Call `require_auth(request)`
- Get tenant
- Render `templates/report.html` with `tenant`, `user`

#### POST /report
- Call `require_auth(request)`
- Get tenant
- Parse form fields (same fields as public form — see report template section below)
- Validate: `first_name` required, `details_of_incident` required, `privacy_agreed` must be checked
- Handle image uploads: up to 2 files, save to `static/uploads/{uuid}_{filename}`, store paths as JSON in `uploaded_images`
- Insert into guest_reports: all fields + `tenant_id` from tenant, `submitted_by_user_id` from JWT, `status = 'pending'`, `created_at` = now UTC ISO
- Redirect to `/dashboard?reported=1`

---

### 2. `backend/templates/dashboard.html`

**Overall layout:**
```
┌──────────────────────────────────────────────────┐
│  Sidebar (240px fixed)  │  Main content (flex 1) │
└──────────────────────────────────────────────────┘
```

Full height page, no scroll on sidebar, main area scrolls.

**Sidebar — `#1a1f2e` background, white text:**

Top section (padding 24px):
- Logo: `<img src="{{ tenant.logo_url }}" style="max-height:36px">` + `<span>{{ tenant.brand_name }}</span>` on same row
- If no logo_url: just brand name as text

Nav section (padding 8px):
- Nav items: Home, Reports, Search, Members, Settings
- Each nav item: `<a href="...">` with icon + label, padding 10px 16px, border-radius 8px, color `#94a3b8`
- Active item (Home on this page): background `rgba(59,130,246,0.15)`, color `#3b82f6`
- Hover: background `rgba(255,255,255,0.05)`
- Icons (simple inline SVG, 18x18):
  - Home: house icon
  - Reports: document/clipboard icon
  - Search: magnifier icon
  - Members: people icon
  - Settings: gear icon
- Nav links: Home → /dashboard, Reports → /dashboard (scroll to table), Search → /search, Members → /dashboard, Settings → /dashboard

Bottom section (padding 16px, border-top `1px solid rgba(255,255,255,0.08)`):
- User card:
  - Avatar circle: 40px, background generated from initials (use a set of colors based on first char), white text initials (first letter of name or email)
  - Label: "Host Member" — 11px, `#64748b`
  - Name: bold white 14px (use `user.name` if available, else user email split at @)
  - Row: "Membership:" label `#94a3b8` 12px + badge: if `subscription.is_paid` → green `#22c55e` bg `#052e16` text "PAID"; else orange `#f59e0b` bg `#451a03` text "TRIAL"
  - Row: "Status:" label + blue dot (8px circle `#3b82f6`) + "Active" text `#94a3b8` 12px

**Main content area — background `#f0f2f5`, padding 32px:**

Header row (flex, space-between, align-items flex-start, margin-bottom 32px):
- Left:
  - Title: "Guest Surveillance Dashboard" — 28px, font-weight 700, color `#111`
  - Subtitle: "Monitor guest history and maintain property safety." — 14px, `#888`, margin-top 4px
- Right:
  - Search input: `<input type="text" placeholder="Search Guest Name or ID...">` — height 40px, padding 0 16px 0 40px, border `1px solid #e2e8f0`, border-radius 20px, background white, font-size 14px
  - Search icon (SVG magnifier) positioned inside input on the left

If `?reported=1` in query: show green success banner at top of main content: "Report submitted successfully. It will be reviewed by our team."

**4 Stat Cards — CSS grid, 4 columns, gap 20px, margin-bottom 32px:**

Each card: background white, border-radius 16px, box-shadow `0 1px 4px rgba(0,0,0,0.06)`, padding 24px, position relative.

Card 1 — TOTAL SEARCHES:
- Label: "TOTAL SEARCHES" — 11px, font-weight 600, letter-spacing 0.08em, color `#94a3b8`, text-transform uppercase
- Number: `{{ stats.total_searches }}` — 36px, font-weight 700, color `#111`, margin: 8px 0
- Icon (top-right absolute, 40px circle bg `#eff6ff`): eye SVG in `#3b82f6`
- Sub: "+12% from yesterday" — 12px, color `#22c55e`

Card 2 — FLAGGED GUESTS:
- Label: "FLAGGED GUESTS"
- Number: `{{ stats.flagged_guests }}`
- Icon (top-right, bg `#fff7ed`): warning triangle SVG in `#f97316`
- Sub: "+3 new reports this week" — 12px, color `#ef4444`

Card 3 — ACTIVE REPORTS:
- Label: "ACTIVE REPORTS"
- Number: `{{ stats.active_reports }}`
- Icon (top-right, bg `#f0fdf4`): checkmark circle SVG in `#22c55e`
- Sub: "Global historical database" — 12px, color `#94a3b8`

Card 4 — FILE REPORT:
- Label: "FILE REPORT"
- Icon (top-right, bg `#eff6ff`): document SVG in `#3b82f6`
- Button: `<a href="/report" class="btn-create-report">CREATE NEW REPORT</a>` — full width, height 40px, background `{{ tenant.primary_color }}`, white text, font-weight 700, border-radius 8px, text-align center, line-height 40px, text-decoration none, display block, margin-top 16px, font-size 13px
- Sub: "Submit a new guest incident" — 12px, `#94a3b8`, margin-top 8px

**Recent Reports Matches Table:**

Container: white card, border-radius 16px, box-shadow `0 1px 4px rgba(0,0,0,0.06)`, overflow hidden.

Header row (padding 20px 24px, flex, space-between, align-items center):
- Left: "Recent Reports Matches" — 16px, font-weight 700, color `#111`
- Right: "View All" link → /search — font-size 14px, color `{{ tenant.primary_color }}`, text-decoration none

Table (width 100%, border-collapse collapse):
- Column headers: GUEST NAME | ISSUE TYPE | DATE REPORTED | SEVERITY | ACTION
- Header row: background `#f8fafc`, padding 12px 24px, font-size 11px, font-weight 600, letter-spacing 0.08em, color `#94a3b8`, text-transform uppercase, border-bottom `1px solid #f1f5f9`

Each data row (border-bottom `1px solid #f8fafc`, hover background `#fafbfc`):
- GUEST NAME cell (padding 16px 24px):
  - Avatar circle (32px, background color based on first letter, white initials text, font-size 13px)
  - Name in bold 14px `#111`
  - "ID: {{ report.id | string | upper }}" in 12px `#94a3b8` below name
  - Display as flex, align-items center, gap 12px
- ISSUE TYPE: 14px `#555`, padding 16px 12px — use `report.incident_flags` (parse JSON if needed, show first item or "Unspecified")
- DATE REPORTED: 13px `#888` — format `report.created_at` as "Jan 15, 2025"
- SEVERITY badge (pill): based on `report.guest_rating`:
  - rating 1–2 → "Critical" — background `#fee2e2`, color `#dc2626`, padding 4px 12px, border-radius 20px, font-size 12px, font-weight 600
  - rating 3 → "High" — background `#ffedd5`, color `#ea580c`
  - rating 4 → "Medium" — background `#fef9c3`, color `#ca8a04`
  - rating 5 → "Low" — background `#dcfce7`, color `#16a34a`
  - null/none → "Unknown" — background `#f1f5f9`, color `#64748b`
- ACTION: eye icon button (`#cbd5e1`, hover `{{ tenant.primary_color }}`), links to `/admin` (admin view) or just a non-functional placeholder for now

If `recent_reports` is empty:
- Show empty state row: centered, "No reports yet" in grey, italic, padding 40px

Table footer (padding 16px 24px, flex, space-between, align-items center, border-top `1px solid #f1f5f9`):
- Left: "Showing {{ recent_reports|length }} of {{ stats.active_reports }} entries" — 13px `#888`
- Right: Previous / Next buttons (outline style, small, disabled state grey if no more pages) — static for now (no pagination logic needed yet)

---

### 3. `backend/templates/search.html`

**Same sidebar layout as dashboard.html** — extract the sidebar into a reusable Jinja2 macro or include, or just duplicate it. Active nav item = Search.

**Main content:**

Header: "Search Guest Database" title + subtitle "Search for guests by name, phone, or location."

**If `gate=True`** — show upgrade wall instead of form/results:
- Centered card, max-width 500px, white bg, rounded, padding 40px, text-align center
- Lock icon SVG (grey, 48px)
- Heading: "Trial Limit Reached"
- Body: "Your free trial has ended. Upgrade to continue searching the guest database."
- Button: "Upgrade — $7/month" → /billing/upgrade — brand color, full width

**Search form card** (white, rounded-16, padding 24px, margin-bottom 24px):
- 5 inputs in a row on desktop (flex-wrap on mobile): First Name, Last Name, Phone, City, State (dropdown)
- State dropdown: all 50 US state abbreviations (AK, AL, AR, AZ, CA, CO, CT, DE, FL, GA, HI, IA, ID, IL, IN, KS, KY, LA, MA, MD, ME, MI, MN, MO, MS, MT, NC, ND, NE, NH, NJ, NM, NV, NY, OH, OK, OR, PA, RI, SC, SD, TN, TX, UT, VA, VT, WA, WI, WV, WY)
- Each input: standard box style (border `1px solid #e2e8f0`, border-radius 8px, height 40px, padding 0 12px, font-size 14px, flex: 1, min-width 140px)
- Search button: height 40px, background `{{ tenant.primary_color }}`, white text, font-weight 700, border-radius 8px, border none, padding 0 24px, cursor pointer

**Trial counter banner** (if not paid and not gated):
- Show below search form: "Trial: {{ subscription.trial_searches_used }}/3 searches used • {{ days_remaining }} days remaining"
- Background `#eff6ff`, border `1px solid #bfdbfe`, border-radius 8px, padding 10px 16px, font-size 13px, color `#1e40af`

**Results section** (if `results` is not None):

If `results` is empty list:
- "No matches found" message with grey search icon

If results exist:
- Section header: "Search Results ({{ results|length }} match{{ 'es' if results|length != 1 else '' }})"
- Each result as a card (white bg, rounded-12, padding 20px, border-left 4px solid based on risk):
  - HOT: border-left `#ef4444`, badge background `#fee2e2` text `#dc2626`
  - WARM: border-left `#f97316`, badge background `#ffedd5` text `#ea580c`
  - COLD: border-left `#22c55e`, badge background `#dcfce7` text `#16a34a`
  - Top row: guest name (bold 16px) + risk badge (HOT/WARM/COLD pill) + match score "87% match" (right-aligned, `#888`, 14px)
  - Details row: location (city, state) | stay date | reason (from incident_flags first item)
  - Severity badge same logic as dashboard table

---

### 4. `backend/templates/report.html`

**Same sidebar layout as dashboard.html.** Active nav item = Reports.

**Main content:**

Header: "Submit a Guest Report" title + subtitle "Help protect the community by reporting problematic guests."

Dark-background form area (background `#12121f`, border-radius 16px, padding 32px, max-width 700px):

Each section is a white card (border-radius 12px, padding 24px, margin-bottom 16px):

Section label style: font-size 11px, font-weight 700, letter-spacing 0.1em, color `#94a3b8`, text-transform uppercase, border-bottom `1px solid #f1f5f9`, padding-bottom 10px, margin-bottom 16px

**Section 1 — GUEST NAME & PROFILE:**
- First Name (required) + Last Name — side by side (2-column grid)
- Airbnb / Vrbo Profile URL — full width
- All inputs: standard box style (border `1px solid #e2e8f0`, border-radius 8px, height 40px, padding 0 12px, font-size 14px)

**Section 2 — CONTACT INFORMATION:**
- Phone Number + Email — side by side

**Section 3 — GUEST LOCATION:**
- City + State (dropdown) — side by side

**Section 4 — STAY DETAILS:**
- Group Size (number input) + Stay Length in nights (number input) — side by side
- Date Guest Stayed (date input) — full width

**Section 5 — WHAT HAPPENED? (SELECT ALL THAT APPLY):**
- 8 checkboxes in 2-column grid:
  - Had a Party / Extra Guests
  - Damaged Items (Walls, Etc)
  - Over Stayed / Late Check Out
  - Left Bad Review / Dishonest Fake
  - Noise Disturbances / Loud Music
  - Pets without Permission
  - Requested Discount
  - Inaccurate / Misleading Report Airbnb/VRBO
- Checkbox name: `incident_flags` (multiple values) — backend joins them as JSON array

**Section 6 — RATING & DETAILS:**
- Guest Rating: 5 star selector — 5 clickable star SVGs, yellow fill on selected/hover, name="guest_rating" value 1–5
- Details of Incident (required): `<textarea>` — min-height 120px, full width, border `1px solid #e2e8f0`, border-radius 8px, padding 12px, font-size 14px, font-family inherit, resize vertical

**Section 7 — EVIDENCE PHOTOS (OPTIONAL):**
- Two file upload boxes side by side
- Each: dashed border `2px dashed #e2e8f0`, border-radius 12px, height 120px, display flex, align-items center, justify-content center, flex-direction column, gap 8px, cursor pointer
- Upload icon SVG + "Upload Photo 1" / "Upload Photo 2" label + "Click to browse" subtext in grey
- `<input type="file" name="photo1" accept="image/*" style="display:none">` — click triggers file input
- On file selected: show filename below box

**Section 8 — PRIVACY & SUBMIT:**
- Checkbox: `<input type="checkbox" name="privacy_agreed" required>` + label "I agree to the Privacy Policy and confirm the information provided is accurate."
- Submit button: full width, height 48px, background `{{ tenant.primary_color }}`, white text, font-weight 700, border-radius 8px, font-size 15px

If validation error (e.g. `error` passed from POST): show red banner at top of form.

---

### 5. Static Files

#### `backend/static/css/dashboard.css`

Styles for dashboard, search, and report pages:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body { font-family: 'Inter', sans-serif; background: #f0f2f5; }

/* Layout */
.app-layout { display: flex; min-height: 100vh; }

/* Sidebar */
.sidebar {
  width: 240px; min-height: 100vh;
  background: #1a1f2e;
  display: flex; flex-direction: column;
  position: fixed; top: 0; left: 0;
}
.sidebar-top { padding: 24px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.sidebar-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.sidebar-brand img { max-height: 36px; }
.sidebar-brand-name { color: #fff; font-weight: 700; font-size: 16px; }

.sidebar-nav { padding: 12px 8px; flex: 1; }
.nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 16px; border-radius: 8px;
  color: #94a3b8; text-decoration: none;
  font-size: 14px; font-weight: 500;
  transition: background 0.15s, color 0.15s;
  margin-bottom: 2px;
}
.nav-item:hover { background: rgba(255,255,255,0.05); color: #e2e8f0; }
.nav-item.active { background: rgba(59,130,246,0.15); color: #3b82f6; }

.sidebar-bottom {
  padding: 16px; border-top: 1px solid rgba(255,255,255,0.08);
}
.user-card { display: flex; flex-direction: column; gap: 6px; }
.user-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: 15px;
  flex-shrink: 0;
}
.user-info-row { display: flex; align-items: center; gap: 10px; }
.user-role { font-size: 11px; color: #64748b; }
.user-name { font-size: 14px; font-weight: 700; color: #fff; }
.badge-paid { background: #052e16; color: #22c55e; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px; letter-spacing: 0.05em; }
.badge-trial { background: #451a03; color: #f59e0b; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px; letter-spacing: 0.05em; }
.status-row { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #94a3b8; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: #3b82f6; }

/* Main content */
.main-content { margin-left: 240px; padding: 32px; min-height: 100vh; flex: 1; }

/* Page header */
.page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
.page-title { font-size: 28px; font-weight: 700; color: #111; }
.page-subtitle { font-size: 14px; color: #888; margin-top: 4px; }

/* Search input in header */
.header-search { position: relative; }
.header-search input {
  height: 40px; padding: 0 16px 0 40px;
  border: 1px solid #e2e8f0; border-radius: 20px;
  background: #fff; font-size: 14px; font-family: inherit;
  outline: none; width: 240px; color: #111;
}
.header-search input:focus { border-color: #94a3b8; }
.header-search svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8; }

/* Stat cards grid */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
.stat-card {
  background: #fff; border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  padding: 24px; position: relative;
}
.stat-label { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: #94a3b8; text-transform: uppercase; }
.stat-number { font-size: 36px; font-weight: 700; color: #111; margin: 8px 0; }
.stat-sub { font-size: 12px; }
.stat-icon {
  position: absolute; top: 24px; right: 24px;
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}

/* Table card */
.table-card {
  background: #fff; border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  overflow: hidden;
}
.table-card-header {
  padding: 20px 24px; display: flex;
  justify-content: space-between; align-items: center;
  border-bottom: 1px solid #f1f5f9;
}
.table-card-title { font-size: 16px; font-weight: 700; color: #111; }
.table-view-all { font-size: 14px; text-decoration: none; font-weight: 500; }

table { width: 100%; border-collapse: collapse; }
th {
  background: #f8fafc; padding: 12px 24px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
  color: #94a3b8; text-transform: uppercase;
  text-align: left; border-bottom: 1px solid #f1f5f9;
}
td { padding: 16px 24px; border-bottom: 1px solid #f8fafc; font-size: 14px; color: #555; }
tr:last-child td { border-bottom: none; }
tr:hover td { background: #fafbfc; }

.guest-cell { display: flex; align-items: center; gap: 12px; }
.guest-avatar {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: 13px; flex-shrink: 0;
}
.guest-name { font-weight: 700; color: #111; font-size: 14px; }
.guest-id { font-size: 12px; color: #94a3b8; }

.severity-badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; white-space: nowrap; }
.severity-critical { background: #fee2e2; color: #dc2626; }
.severity-high { background: #ffedd5; color: #ea580c; }
.severity-medium { background: #fef9c3; color: #ca8a04; }
.severity-low { background: #dcfce7; color: #16a34a; }
.severity-unknown { background: #f1f5f9; color: #64748b; }

.action-btn { background: none; border: none; cursor: pointer; color: #cbd5e1; padding: 4px; border-radius: 4px; }
.action-btn:hover { color: var(--primary); }

.table-footer {
  padding: 16px 24px; display: flex; justify-content: space-between;
  align-items: center; border-top: 1px solid #f1f5f9;
}
.table-footer-text { font-size: 13px; color: #888; }
.table-pagination { display: flex; gap: 8px; }
.page-btn {
  height: 32px; padding: 0 14px; border: 1px solid #e2e8f0;
  border-radius: 6px; background: #fff; font-size: 13px;
  cursor: pointer; font-family: inherit; color: #555;
}
.page-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.page-btn:hover:not(:disabled) { background: #f8fafc; }

/* Banner */
.banner { border-radius: 8px; padding: 12px 16px; font-size: 14px; margin-bottom: 20px; }
.banner-success { background: #f0fdf4; border: 1px solid #86efac; color: #166534; }
.banner-error { background: #fef2f2; border: 1px solid #fca5a5; color: #dc2626; }
.banner-info { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; }

/* Search page form */
.search-form-card {
  background: #fff; border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  padding: 24px; margin-bottom: 24px;
}
.search-inputs { display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end; }
.search-inputs input, .search-inputs select {
  border: 1px solid #e2e8f0; border-radius: 8px;
  height: 40px; padding: 0 12px; font-size: 14px;
  flex: 1; min-width: 130px; font-family: inherit;
  color: #111; outline: none;
}
.search-inputs input:focus, .search-inputs select:focus { border-color: #94a3b8; }
.btn-search {
  height: 40px; background: var(--primary); color: #fff;
  font-weight: 700; border: none; border-radius: 8px;
  padding: 0 24px; cursor: pointer; font-family: inherit;
  font-size: 14px; white-space: nowrap;
}

/* Result cards */
.result-card {
  background: #fff; border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  padding: 20px; margin-bottom: 12px;
  border-left: 4px solid transparent;
}
.result-hot { border-left-color: #ef4444; }
.result-warm { border-left-color: #f97316; }
.result-cold { border-left-color: #22c55e; }
.result-top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.result-name { font-size: 16px; font-weight: 700; color: #111; }
.result-score { font-size: 14px; color: #888; }
.risk-badge { padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; }
.risk-hot { background: #fee2e2; color: #dc2626; }
.risk-warm { background: #ffedd5; color: #ea580c; }
.risk-cold { background: #dcfce7; color: #16a34a; }

/* Report form */
.report-wrapper { background: #12121f; border-radius: 16px; padding: 32px; max-width: 700px; }
.report-section {
  background: #fff; border-radius: 12px;
  padding: 24px; margin-bottom: 16px;
}
.section-label {
  font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
  color: #94a3b8; text-transform: uppercase;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 10px; margin-bottom: 16px;
}
.form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-full { margin-top: 12px; }
.form-field input, .form-field select, .form-field textarea {
  width: 100%; border: 1px solid #e2e8f0; border-radius: 8px;
  height: 40px; padding: 0 12px; font-size: 14px;
  font-family: inherit; color: #111; outline: none;
}
.form-field input:focus, .form-field select:focus, .form-field textarea:focus { border-color: #94a3b8; }
.form-field textarea { height: auto; min-height: 120px; padding: 12px; resize: vertical; }
.form-field label { display: block; font-size: 12px; color: #888; margin-bottom: 4px; }
.required-star { color: #ef4444; }

.checkbox-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.checkbox-item { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #555; cursor: pointer; }
.checkbox-item input[type=checkbox] { width: 16px; height: 16px; accent-color: var(--primary); cursor: pointer; }

/* Star rating */
.star-rating { display: flex; gap: 6px; margin-bottom: 16px; }
.star { font-size: 28px; cursor: pointer; color: #e2e8f0; transition: color 0.1s; }
.star.active, .star:hover { color: #f59e0b; }

/* File upload */
.upload-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.upload-box {
  border: 2px dashed #e2e8f0; border-radius: 12px;
  height: 120px; display: flex; align-items: center;
  justify-content: center; flex-direction: column;
  gap: 8px; cursor: pointer; transition: border-color 0.15s;
}
.upload-box:hover { border-color: var(--primary); }
.upload-box-label { font-size: 13px; font-weight: 600; color: #555; }
.upload-box-sub { font-size: 12px; color: #aaa; }

/* Submit button */
.btn-submit {
  width: 100%; height: 48px; background: var(--primary);
  color: #fff; font-weight: 700; border: none;
  border-radius: 8px; font-size: 15px; font-family: inherit;
  cursor: pointer; transition: opacity 0.15s;
}
.btn-submit:hover { opacity: 0.88; }

/* Privacy row */
.privacy-row { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: #555; margin-bottom: 16px; }
.privacy-row input[type=checkbox] { margin-top: 2px; width: 16px; height: 16px; accent-color: var(--primary); flex-shrink: 0; }

/* Upgrade gate */
.upgrade-gate {
  max-width: 500px; margin: 60px auto;
  background: #fff; border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  padding: 48px 40px; text-align: center;
}
.upgrade-gate h2 { font-size: 22px; font-weight: 700; color: #111; margin: 16px 0 8px; }
.upgrade-gate p { font-size: 15px; color: #888; margin-bottom: 28px; }
.btn-upgrade {
  display: inline-block; background: var(--primary);
  color: #fff; font-weight: 700; border-radius: 8px;
  padding: 14px 32px; text-decoration: none;
  font-size: 15px; transition: opacity 0.15s;
}
.btn-upgrade:hover { opacity: 0.88; }

/* Responsive */
@media (max-width: 1024px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .sidebar { display: none; }
  .main-content { margin-left: 0; padding: 20px; }
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .form-grid-2 { grid-template-columns: 1fr; }
}
```

#### `backend/static/js/dashboard.js`

```javascript
// Star rating
document.querySelectorAll('.star-rating').forEach(ratingEl => {
  const stars = ratingEl.querySelectorAll('.star');
  const input = ratingEl.querySelector('input[type=hidden]');
  stars.forEach((star, i) => {
    star.addEventListener('click', () => {
      if (input) input.value = i + 1;
      stars.forEach((s, j) => s.classList.toggle('active', j <= i));
    });
    star.addEventListener('mouseenter', () => {
      stars.forEach((s, j) => s.classList.toggle('active', j <= i));
    });
  });
  ratingEl.addEventListener('mouseleave', () => {
    const val = input ? parseInt(input.value) || 0 : 0;
    stars.forEach((s, j) => s.classList.toggle('active', j < val));
  });
});

// File upload preview
document.querySelectorAll('.upload-box').forEach(box => {
  const fileInput = box.querySelector('input[type=file]');
  const label = box.querySelector('.upload-box-label');
  if (!fileInput) return;
  box.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) {
      if (label) label.textContent = fileInput.files[0].name;
      box.style.borderColor = '#22c55e';
    }
  });
});
```

---

### 6. Avatar Color Helper (Jinja2 macro or template filter)

Add a helper to generate consistent avatar background colors from a string. Add as a global Jinja2 function in `main.py`:

```python
import hashlib

def avatar_color(text: str) -> str:
    colors = ["#3b82f6","#8b5cf6","#ec4899","#f97316","#22c55e","#06b6d4","#f59e0b","#ef4444"]
    idx = int(hashlib.md5(str(text).encode()).hexdigest(), 16) % len(colors)
    return colors[idx]

templates.env.globals["avatar_color"] = avatar_color
```

Usage in templates: `style="background: {{ avatar_color(report.first_name) }}"`

---

### 7. Days Remaining Helper

In `dashboard_routes.py` GET /search, compute `days_remaining`:

```python
from datetime import datetime, timezone, timedelta

def get_days_remaining(trial_start_str: str) -> int:
    if not trial_start_str:
        return 0
    trial_start = datetime.fromisoformat(trial_start_str)
    if trial_start.tzinfo is None:
        trial_start = trial_start.replace(tzinfo=timezone.utc)
    expires = trial_start + timedelta(days=7)
    remaining = (expires - datetime.now(timezone.utc)).days
    return max(0, remaining)
```

Pass `days_remaining=get_days_remaining(subscription["trial_start"])` to search.html template context.

---

## RULES

1. All form POSTs use `Form(...)` from FastAPI — NOT Pydantic body models
2. Every template receives `tenant` dict — inject on every render
3. Set `--primary` CSS variable in every template: `<style>:root { --primary: {{ tenant.primary_color }}; }</style>`
4. All DB connections closed after use (try/finally)
5. Never hardcode `tenant_id = 1` — always use `get_current_tenant(request)["id"]`
6. `require_auth()` raises `_AuthRedirect` — wrap protected route handlers in try/except:
   ```python
   from auth import require_auth, _AuthRedirect
   try:
       user = require_auth(request)
   except _AuthRedirect as e:
       return e.response
   ```
7. `search_guests()` from `search_logic.py` expects a list of dicts — convert sqlite3.Row results with `[dict(r) for r in rows]`
8. Image uploads: use `python-multipart`, receive as `UploadFile`, save with `aiofiles`
9. Do NOT modify `search_logic.py`
10. Do NOT rename any routes

---

## FILES TO CREATE / MODIFY

| Action | File |
|---|---|
| MODIFY | `backend/routers/dashboard_routes.py` |
| MODIFY | `backend/main.py` — add `avatar_color` Jinja2 global |
| CREATE | `backend/templates/dashboard.html` |
| CREATE | `backend/templates/search.html` |
| CREATE | `backend/templates/report.html` |
| CREATE | `backend/static/css/dashboard.css` |
| CREATE | `backend/static/js/dashboard.js` |

---

## WHEN PHASE 4 IS COMPLETE

Update `PROGRESS.md` — mark these items as done:
- [x] Member dashboard Jinja2 template (styled per design reference)
- [x] Search page + endpoint (wraps search_logic.py, gated by subscription/trial)
- [x] Report submission page + endpoint
- [x] Trial enforcement: 7 days OR 3 searches

Then STOP. Do not start Phase 5 until instructed.
