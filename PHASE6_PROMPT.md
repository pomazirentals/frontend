# PHASE 6 — Admin Dashboard (11 Panels)
# CURSOR: Read this entire file before writing any code.

---

## CONTEXT

Phases 1–5 are complete:
- Auth, dashboard, search, report, billing all done
- `/admin` route stub exists but is empty

**Your job in Phase 6:** Build the full admin dashboard — 11 panels, all at `/admin`, loaded dynamically via JS fetch (no full page reloads between panels).

---

## ARCHITECTURE OF THE ADMIN DASHBOARD

- Single page: `GET /admin` renders `templates/admin/admin_main.html`
- Left sidebar has 11 nav items — clicking one fetches the panel HTML via `GET /admin/panel/{panel_name}` and swaps it into `#panel-content`
- Each panel is a separate Jinja2 partial template in `templates/admin/panels/`
- Default panel on load: `overview`
- All `/admin` routes require `is_admin = True` on the JWT — use `require_admin(request)`

---

## WHAT TO BUILD

### 1. `backend/routers/admin_routes.py`

#### GET /admin
- Call `require_admin(request)` — redirect to /login if not admin
- Get tenant from `get_current_tenant(request)`
- Render `templates/admin/admin_main.html` with `tenant`, `user`, `active_panel="overview"`

#### GET /admin/panel/{panel_name}
- Call `require_admin(request)`
- Get tenant
- `panel_name` must be one of: `overview`, `users`, `guest_db`, `moderation`, `search_system`, `billing`, `verification`, `system_admin`, `tenant_mgmt`, `performance`, `ai_assistant`
- If not in allowed list → return 404
- Query the DB data needed for that panel (see each panel spec below)
- Return `TemplateResponse` for `templates/admin/panels/{panel_name}.html`
- These are **partial HTML** responses — no full `<html>` wrapper, just the panel content div

#### POST /admin/panel/users/action
- Call `require_admin(request)`
- Form fields: `action` (ban, unban, verify, make_admin, remove_admin), `user_id`
- Execute the action on the users table
- Log to admin_logs: `admin_user_id`, `action`, `target=f"user:{user_id}"`, `detail`, `created_at=now`
- Return JSON `{"success": true, "message": "..."}`

#### POST /admin/panel/moderation/action
- Call `require_admin(request)`
- Form fields: `action` (approve, reject), `report_id`
- Update `guest_reports.status` to `'approved'` or `'rejected'`
- Log to admin_logs
- Return JSON `{"success": true}`

#### POST /admin/panel/tenant_mgmt/save
- Call `require_admin(request)`
- Form fields: `id` (optional — if present, update; if absent, insert), `domain`, `brand_name`, `logo_url`, `primary_color`, `active`
- INSERT or UPDATE tenants table
- Log to admin_logs
- Return JSON `{"success": true}`

#### POST /admin/panel/tenant_mgmt/delete
- Call `require_admin(request)`
- Form field: `tenant_id`
- Set `tenants.active = 0` (soft delete — never hard delete)
- Log to admin_logs
- Return JSON `{"success": true}`

#### POST /admin/panel/system_admin/toggle
- Call `require_admin(request)`
- Form fields: `setting_name`, `value` (0 or 1)
- For now: store in a simple in-memory dict `FEATURE_FLAGS` (acceptable for MVP)
- Return JSON `{"success": true, "setting": setting_name, "value": value}`

#### POST /admin/ai-assistant
- Call `require_admin(request)`
- Form field: `message` (user's question)
- Build context string from live DB:
  ```python
  stats = {
    "total_users": conn.execute("SELECT COUNT(*) FROM users").fetchone()[0],
    "paid_users": conn.execute("SELECT COUNT(*) FROM subscriptions WHERE is_paid=1").fetchone()[0],
    "trial_users": conn.execute("SELECT COUNT(*) FROM subscriptions WHERE is_paid=0").fetchone()[0],
    "total_reports": conn.execute("SELECT COUNT(*) FROM guest_reports").fetchone()[0],
    "pending_reports": conn.execute("SELECT COUNT(*) FROM guest_reports WHERE status='pending'").fetchone()[0],
    "total_searches": conn.execute("SELECT COUNT(*) FROM search_history").fetchone()[0],
    "total_tenants": conn.execute("SELECT COUNT(*) FROM tenants WHERE active=1").fetchone()[0],
  }
  ```
- Call Anthropic API:
  ```python
  import anthropic
  client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
  system_prompt = f"""You are an admin assistant for GuestGuard, a guest-screening SaaS platform.
  Current platform stats: {stats}
  Answer admin questions about the platform, users, reports, and subscriptions.
  Be concise and data-driven."""

  response = client.messages.create(
      model="claude-opus-4-6",
      max_tokens=1024,
      system=system_prompt,
      messages=[{"role": "user", "content": message}],
  )
  reply = response.content[0].text
  ```
- Return JSON `{"reply": reply}`
- If `ANTHROPIC_API_KEY` not set → return JSON `{"reply": "AI Assistant is not configured. Add ANTHROPIC_API_KEY to .env to enable."}`

---

### 2. Panel Data Queries

For each `GET /admin/panel/{panel_name}`, query and pass this data:

**overview:**
```python
{
  "total_users": COUNT users,
  "paid_users": COUNT subscriptions WHERE is_paid=1,
  "trial_users": COUNT subscriptions WHERE is_paid=0 AND status='trial',
  "total_reports": COUNT guest_reports,
  "pending_reports": COUNT guest_reports WHERE status='pending',
  "total_searches": COUNT search_history,
  "revenue_monthly": paid_users * 7,  # simple estimate
  "recent_logs": last 5 rows from admin_logs ORDER BY created_at DESC,
  "tenants": all rows from tenants WHERE active=1,
}
```

**users:**
```python
{
  "users": JOIN users + subscriptions, last 50, ORDER BY users.created_at DESC
  # columns: id, email, name, signup_domain, is_verified, is_admin, created_at, last_login, plan_name, is_paid, status
}
```

**guest_db:**
```python
{
  "reports": all guest_reports ORDER BY created_at DESC LIMIT 50,
  "total": COUNT guest_reports,
}
```

**moderation:**
```python
{
  "pending": guest_reports WHERE status='pending' ORDER BY created_at DESC,
  "recent_approved": guest_reports WHERE status='approved' ORDER BY created_at DESC LIMIT 10,
  "recent_rejected": guest_reports WHERE status='rejected' ORDER BY created_at DESC LIMIT 10,
}
```

**search_system:**
```python
{
  "total_searches": COUNT search_history,
  "searches_today": COUNT search_history WHERE date(searched_at) = date('now'),
  "top_searchers": GROUP BY user_id, COUNT(*) as cnt, JOIN users.email, ORDER BY cnt DESC LIMIT 10,
  "recent_searches": last 20 search_history rows JOIN users.email,
}
```

**billing:**
```python
{
  "paid": subscriptions WHERE is_paid=1 JOIN users.email,
  "trial": subscriptions WHERE is_paid=0 JOIN users.email,
  "cancelled": subscriptions WHERE status='cancelled' JOIN users.email,
  "mrr": COUNT(paid) * 7,
}
```

**verification:**
```python
{
  "unverified_users": users WHERE is_verified=0 ORDER BY created_at DESC,
  "verified_count": COUNT users WHERE is_verified=1,
  "unverified_count": COUNT users WHERE is_verified=0,
  "pending_tokens": COUNT verification_tokens WHERE used=0,
}
```

**system_admin:**
```python
{
  "recent_logs": admin_logs ORDER BY created_at DESC LIMIT 50,
  "feature_flags": FEATURE_FLAGS dict,
}
```

**tenant_mgmt:**
```python
{
  "tenants": all tenants ORDER BY created_at DESC,
}
```

**performance:**
```python
{
  "by_domain": for each tenant: {domain, brand_name, user_count, paid_count, report_count, search_count}
  # user_count: COUNT users WHERE signup_domain = tenant.domain
  # paid_count: COUNT subscriptions JOIN users WHERE signup_domain = tenant.domain AND is_paid=1
  # report_count: COUNT guest_reports WHERE tenant_id = tenant.id
  # search_count: COUNT search_history WHERE tenant_id = tenant.id
}
```

**ai_assistant:** No DB query needed — just pass `tenant`, `user`

---

### 3. `backend/templates/admin/admin_main.html`

Full HTML page. Font: Inter. No Bootstrap.

**Layout: two-column — fixed left sidebar (220px) + main content area.**

**Left sidebar (background #0f172a, full height fixed):**

Top: GuestGuard logo/brand (white text, padding 20px 16px, border-bottom 1px solid rgba(255,255,255,0.06))

Nav items (padding 8px):
Each `<a>` tag has `data-panel="panel_name"` attribute and calls `loadPanel(this)` on click.

```
1.  Platform Overview     (icon: grid/dashboard)
2.  User Management       (icon: users)
3.  Guest Database        (icon: database)
4.  Report Moderation     (icon: flag)
5.  Search System         (icon: search)
6.  Billing & Subs        (icon: credit-card)
7.  Verification System   (icon: shield-check)
8.  System Administration (icon: settings)
9.  Tenant Management     (icon: globe)
10. Site Performance      (icon: bar-chart)
11. AI Assistant          (icon: sparkles/bot)
```

Nav item style:
- Padding: 9px 14px, border-radius 8px, color #94a3b8, font-size 13px, font-weight 500
- Display: flex, align-items center, gap 10px, text-decoration none, margin-bottom 2px
- Hover: background rgba(255,255,255,0.05), color #e2e8f0
- Active class `.active`: background rgba(59,130,246,0.15), color #3b82f6

Bottom of sidebar:
- Admin user info: avatar (colored circle, initials), name, "Administrator" label, logout link

**Main content area (margin-left 220px, background #f1f5f9, min-height 100vh):**

Top bar (background white, border-bottom 1px solid #e2e8f0, padding 14px 28px, flex, space-between):
- Left: `<h1 id="panel-title">Platform Overview</h1>` — 18px, font-weight 700, color #111
- Right: current date/time (JS), tenant brand name badge

Content area: `<div id="panel-content" style="padding:28px">` — panels load here

Loading spinner: `<div id="loading-spinner" style="display:none">` — centered spinner shown during fetch

---

### 4. JS for panel switching

In `admin_main.html` or `backend/static/js/admin.js`:

```javascript
async function loadPanel(el, panelName) {
  // If called from nav click, el is the <a> tag
  // panelName can be passed directly for initial load
  const name = panelName || el.getAttribute('data-panel');

  // Update active nav state
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navEl = el || document.querySelector(`[data-panel="${name}"]`);
  if (navEl) navEl.classList.add('active');

  // Update title
  const titles = {
    overview: 'Platform Overview',
    users: 'User Management',
    guest_db: 'Guest Database',
    moderation: 'Report Moderation',
    search_system: 'Search System',
    billing: 'Billing & Subscriptions',
    verification: 'Verification System',
    system_admin: 'System Administration',
    tenant_mgmt: 'Tenant Management',
    performance: 'Site Performance',
    ai_assistant: 'AI Assistant',
  };
  document.getElementById('panel-title').textContent = titles[name] || name;

  // Show spinner
  document.getElementById('loading-spinner').style.display = 'flex';
  document.getElementById('panel-content').style.opacity = '0.4';

  try {
    const res = await fetch(`/admin/panel/${name}`);
    const html = await res.text();
    document.getElementById('panel-content').innerHTML = html;
    document.getElementById('panel-content').style.opacity = '1';
  } catch(e) {
    document.getElementById('panel-content').innerHTML = '<p style="color:#ef4444">Failed to load panel.</p>';
  } finally {
    document.getElementById('loading-spinner').style.display = 'none';
  }
}

// Load default panel on page load
document.addEventListener('DOMContentLoaded', () => loadPanel(null, 'overview'));

// Nav click handlers — attach after DOM ready
document.querySelectorAll('[data-panel]').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); loadPanel(el); });
});

// Helper: admin action (ban/verify/etc)
async function adminAction(url, body, successMsg) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams(body),
  });
  const data = await res.json();
  if (data.success) {
    showToast(successMsg || data.message || 'Done', 'success');
    // Reload current panel
    const active = document.querySelector('.nav-item.active');
    if (active) loadPanel(active);
  } else {
    showToast('Action failed', 'error');
  }
}

// Toast notification
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
```

Toast CSS (add to admin.css):
```css
.toast {
  position: fixed; bottom: 28px; right: 28px;
  padding: 12px 20px; border-radius: 8px; font-size: 14px;
  font-weight: 500; z-index: 9999; animation: slideIn 0.2s ease;
}
.toast-success { background: #052e16; color: #22c55e; border: 1px solid #16a34a; }
.toast-error { background: #450a0a; color: #ef4444; border: 1px solid #dc2626; }
@keyframes slideIn { from { transform: translateY(20px); opacity:0; } to { transform:translateY(0); opacity:1; } }
```

---

### 5. Panel Templates (all are partials — no `<html>` wrapper)

Each panel is a `<div class="panel">` with its content inside.

Common panel styles (in `admin.css`):
```css
.panel-section {
  background: #fff; border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  padding: 24px; margin-bottom: 20px;
}
.panel-section-title {
  font-size: 15px; font-weight: 700; color: #111;
  margin-bottom: 16px; padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
}
.admin-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.admin-table th {
  background: #f8fafc; padding: 10px 14px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
  color: #94a3b8; text-transform: uppercase; text-align: left;
  border-bottom: 1px solid #f1f5f9;
}
.admin-table td { padding: 12px 14px; border-bottom: 1px solid #f8fafc; color: #444; }
.admin-table tr:hover td { background: #fafbfc; }
.stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px; }
.mini-stat {
  background: #fff; border-radius: 10px; padding: 18px 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.mini-stat-label { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; color: #94a3b8; text-transform: uppercase; }
.mini-stat-value { font-size: 28px; font-weight: 800; color: #111; margin-top: 6px; }
.mini-stat-sub { font-size: 12px; color: #888; margin-top: 4px; }
.badge { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
.badge-green { background: #dcfce7; color: #16a34a; }
.badge-orange { background: #ffedd5; color: #ea580c; }
.badge-red { background: #fee2e2; color: #dc2626; }
.badge-blue { background: #dbeafe; color: #1d4ed8; }
.badge-grey { background: #f1f5f9; color: #64748b; }
.btn-sm {
  padding: 5px 12px; border-radius: 6px; font-size: 12px;
  font-weight: 600; border: none; cursor: pointer; font-family: inherit;
}
.btn-sm-red { background: #fee2e2; color: #dc2626; }
.btn-sm-red:hover { background: #fecaca; }
.btn-sm-green { background: #dcfce7; color: #16a34a; }
.btn-sm-green:hover { background: #bbf7d0; }
.btn-sm-blue { background: #dbeafe; color: #1d4ed8; }
.btn-sm-blue:hover { background: #bfdbfe; }
```

---

#### `templates/admin/panels/overview.html`

```
Stat row (4 cards):
- Total Users | {{ data.total_users }}
- Paid Subscribers | {{ data.paid_users }} | Est. MRR: ${{ data.revenue_monthly }}
- Total Reports | {{ data.total_reports }} | {{ data.pending_reports }} pending
- Total Searches | {{ data.total_searches }}

Active Tenants table:
- Columns: DOMAIN | BRAND NAME | COLOR | STATUS
- Each row: domain, brand_name, colored dot (primary_color), Active badge

Recent Admin Activity:
- Last 5 admin_logs entries: action, target, detail, created_at
```

#### `templates/admin/panels/users.html`

```
Stat row: Total Users | Paid | Trial | Unverified

Search/filter bar: <input placeholder="Filter by email..."> (client-side JS filter)

Users table:
- Columns: USER | EMAIL | JOINED | STATUS | MEMBERSHIP | VERIFIED | ACTIONS
- USER: initials avatar + name (or email if no name)
- STATUS: Active badge (green) or Banned badge (red) — NOTE: add `is_banned` check if column exists, else all Active
- MEMBERSHIP: PAID badge (green) or TRIAL badge (orange)
- VERIFIED: checkmark (green) or X (red)
- ACTIONS: buttons per row:
  - If is_verified=0: "Verify" btn-sm-blue → adminAction('/admin/panel/users/action', {action:'verify', user_id:id})
  - If is_admin=0: "Make Admin" btn-sm-blue
  - If is_admin=1: "Remove Admin" btn-sm-red
  - "Ban" btn-sm-red (if not banned)

Client-side filter script at bottom of partial:
<script>
document.getElementById('user-filter').addEventListener('input', function() {
  const q = this.value.toLowerCase();
  document.querySelectorAll('.user-row').forEach(row => {
    row.style.display = row.dataset.email.toLowerCase().includes(q) ? '' : 'none';
  });
});
</script>
```

#### `templates/admin/panels/guest_db.html`

```
Stat row: Total Records | Approved | Pending | Rejected

Guest records table:
- Columns: GUEST NAME | LOCATION | REPORTED | SEVERITY | STATUS | ACTIONS
- GUEST NAME: first_name + last_name
- LOCATION: city, state
- REPORTED: created_at formatted
- SEVERITY: badge from guest_rating (same logic as dashboard)
- STATUS: badge (pending=orange, approved=green, rejected=red)
- ACTIONS: "View" button (placeholder)
```

#### `templates/admin/panels/moderation.html`

```
Two sections:

PENDING REVIEW (most important):
- Each pending report as a card (not table):
  - White card, border-left 4px solid orange
  - Guest name, location, incident flags (comma-separated), details (truncated 200 chars)
  - Submitted: date | Submitted by: user_id
  - Action buttons row: "Approve" (green) | "Reject" (red)
  - Approve: adminAction('/admin/panel/moderation/action', {action:'approve', report_id:id})
  - Reject: adminAction('/admin/panel/moderation/action', {action:'reject', report_id:id})

If no pending: empty state message "No reports pending review. All clear!"

RECENTLY MODERATED table (compact):
- Columns: GUEST | DATE | STATUS | MODERATED
- Last 10 approved + rejected combined, sorted by updated_at
```

#### `templates/admin/panels/search_system.html`

```
Stat row: Total Searches | Searches Today | Unique Searchers | Avg per User

Top Searchers table:
- Columns: USER EMAIL | SEARCHES | LAST SEARCH
- Top 10 users by search count

Recent Searches table:
- Columns: USER | QUERY | MATCH SCORE | RISK LEVEL | DATE
- Last 20 searches
- RISK LEVEL: HOT/WARM/COLD badge
- MATCH SCORE: formatted as percentage
```

#### `templates/admin/panels/billing.html`

```
Stat row: Paid Subscribers | Trial Users | Cancelled | MRR (${{ mrr }})

Paid Subscribers table:
- Columns: USER | EMAIL | MEMBER SINCE | NEXT BILLING | STRIPE SUB ID | STATUS
- Status: badge (active=green, past_due=orange, cancelled=red)

Trial Users table:
- Columns: USER EMAIL | TRIAL STARTED | SEARCHES USED | DAYS LEFT
- Days left: computed from trial_start
- If trial expired: "Expired" badge in red

Cancelled table (compact):
- USER EMAIL | CANCELLED DATE
```

#### `templates/admin/panels/verification.html`

```
Stat row: Verified Users | Unverified | Pending Tokens | Verification Rate %

Toggle (UI only for now — no backend feature flag needed):
- "Phone Verification (Twilio)" toggle switch — OFF by default, disabled with label "Coming soon"

Unverified Users table:
- Columns: EMAIL | SIGNUP DOMAIN | JOINED | TOKEN EXPIRES | ACTION
- ACTION: "Send Verification Email" btn-sm-blue — for now just a placeholder (real implementation would resend the email)

Note at top: "Email verification is required. Users without verified email see a banner but can still log in."
```

#### `templates/admin/panels/system_admin.html`

```
Feature Flags section:
Toggle switches for:
- "Maintenance Mode" (default off)
- "New Registrations" (default on)
- "Public Report Form" (default on)
- "Trial Search Limit" (default on)
Each toggle: onclick calls adminAction('/admin/panel/system_admin/toggle', {setting_name:name, value:0or1})

Admin Action Log table:
- Columns: TIME | ADMIN | ACTION | TARGET | DETAIL
- Last 50 entries from admin_logs
- Empty state if no logs yet
```

#### `templates/admin/panels/tenant_mgmt.html`

```
Add/Edit Tenant form (white card, at top):
- Fields: Domain *, Brand Name *, Logo URL, Primary Color (color picker input), Active (checkbox)
- Hidden field: id (empty for new, filled when editing)
- "Save Tenant" button → POST /admin/panel/tenant_mgmt/save via JS fetch
- Form submission via adminAction() pattern

Tenants table:
- Columns: DOMAIN | BRAND NAME | COLOR | LOGO | ACTIVE | ACTIONS
- COLOR: colored circle (40px, that color)
- LOGO: <img> thumbnail (max-height 32px) or "None"
- ACTIVE: green badge "Active" or grey "Inactive"
- ACTIONS: "Edit" btn-sm-blue (fills form above with this tenant's data), "Deactivate" btn-sm-red

Edit JS (at bottom of partial):
<script>
function editTenant(id, domain, brandName, logoUrl, primaryColor, active) {
  document.getElementById('tenant-id').value = id;
  document.getElementById('tenant-domain').value = domain;
  document.getElementById('tenant-brand').value = brandName;
  document.getElementById('tenant-logo').value = logoUrl || '';
  document.getElementById('tenant-color').value = primaryColor;
  document.getElementById('tenant-active').checked = active == 1;
  document.getElementById('tenant-form-title').textContent = 'Edit Tenant';
  document.getElementById('tenant-form').scrollIntoView({behavior:'smooth'});
}

document.getElementById('tenant-save-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this));
  data.active = this.querySelector('#tenant-active').checked ? 1 : 0;
  await adminAction('/admin/panel/tenant_mgmt/save', data, 'Tenant saved');
});
</script>
```

#### `templates/admin/panels/performance.html`

```
Performance by Domain table:
- Columns: DOMAIN | BRAND | USERS | PAID | SEARCHES | REPORTS | CONVERSION %
- CONVERSION %: (paid / users * 100) if users > 0 else 0, formatted "12.5%"
- Sort by users DESC

Simple bar chart (CSS only, no JS library needed):
- For each domain: label + horizontal bar (width = users/max_users * 100%) in brand primary_color
- Shows relative signup volume per domain

MRR by domain: paid_count * $7
```

#### `templates/admin/panels/ai_assistant.html`

```
Chat interface card (white, border-radius 16px, padding 0, overflow hidden):

Chat history area (id="chat-history", height 420px, overflow-y auto, padding 20px, background #f8fafc):
- Initial message (hardcoded): AI bubble — "Hello! I'm your GuestGuard AI assistant. I have access to live platform data. Ask me anything about users, reports, revenue, or platform health."

Input area (border-top 1px solid #f1f5f9, padding 16px, display flex, gap 10px, background white):
- <textarea id="ai-input" placeholder="Ask about your platform..." rows="1" style="flex:1; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px; font-family:inherit; font-size:14px; resize:none; outline:none">
- Send button: brand color, padding 10px 20px, border-radius 8px, "Send" text

Message bubble styles:
- User message: right-aligned, background #3b82f6 (or --primary), white text, border-radius 16px 16px 4px 16px, padding 10px 14px, max-width 70%, margin-bottom 12px
- AI message: left-aligned, background white, border 1px solid #e2e8f0, border-radius 16px 16px 16px 4px, padding 10px 14px, max-width 70%, margin-bottom 12px
- Typing indicator: AI bubble with "..." animated dots

JS at bottom of partial:
<script>
const chatHistory = document.getElementById('chat-history');
const aiInput = document.getElementById('ai-input');

document.getElementById('ai-send-btn').addEventListener('click', sendMessage);
aiInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });

async function sendMessage() {
  const msg = aiInput.value.trim();
  if (!msg) return;
  aiInput.value = '';

  // Add user bubble
  chatHistory.innerHTML += `<div style="display:flex;justify-content:flex-end;margin-bottom:12px">
    <div style="background:var(--primary,#3b82f6);color:#fff;padding:10px 14px;border-radius:16px 16px 4px 16px;max-width:70%;font-size:14px">${escapeHtml(msg)}</div>
  </div>`;

  // Typing indicator
  chatHistory.innerHTML += `<div id="typing" style="display:flex;margin-bottom:12px">
    <div style="background:#fff;border:1px solid #e2e8f0;padding:10px 14px;border-radius:16px 16px 16px 4px;font-size:14px;color:#888">...</div>
  </div>`;
  chatHistory.scrollTop = chatHistory.scrollHeight;

  const res = await fetch('/admin/ai-assistant', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({message: msg}),
  });
  const data = await res.json();
  document.getElementById('typing')?.remove();

  chatHistory.innerHTML += `<div style="display:flex;margin-bottom:12px">
    <div style="background:#fff;border:1px solid #e2e8f0;padding:10px 14px;border-radius:16px 16px 16px 4px;max-width:70%;font-size:14px;color:#111">${escapeHtml(data.reply)}</div>
  </div>`;
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
</script>
```

---

### 6. `backend/static/css/admin.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', sans-serif; background: #f1f5f9; }

/* Layout */
.admin-layout { display: flex; min-height: 100vh; }

/* Sidebar */
.admin-sidebar {
  width: 220px; min-height: 100vh; background: #0f172a;
  display: flex; flex-direction: column;
  position: fixed; top: 0; left: 0; z-index: 100;
}
.sidebar-brand-row {
  padding: 18px 16px; border-bottom: 1px solid rgba(255,255,255,0.06);
  display: flex; align-items: center; gap: 10px;
}
.sidebar-brand-row img { max-height: 32px; }
.sidebar-brand-text { color: #fff; font-weight: 700; font-size: 15px; }

.admin-nav { padding: 10px 8px; flex: 1; overflow-y: auto; }
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 14px; border-radius: 8px;
  color: #94a3b8; font-size: 13px; font-weight: 500;
  text-decoration: none; margin-bottom: 2px;
  cursor: pointer; transition: background 0.12s, color 0.12s;
  border: none; background: none; width: 100%; text-align: left;
  font-family: inherit;
}
.nav-item:hover { background: rgba(255,255,255,0.05); color: #e2e8f0; }
.nav-item.active { background: rgba(59,130,246,0.15); color: #3b82f6; }
.nav-item svg { flex-shrink: 0; }

.sidebar-user-section {
  padding: 14px 16px; border-top: 1px solid rgba(255,255,255,0.06);
}
.sidebar-user { display: flex; align-items: center; gap: 10px; }
.sidebar-avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: #3b82f6; color: #fff; font-weight: 700;
  font-size: 13px; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.sidebar-user-name { font-size: 13px; font-weight: 600; color: #e2e8f0; }
.sidebar-user-role { font-size: 11px; color: #64748b; }
.sidebar-logout { font-size: 11px; color: #64748b; text-decoration: none; }
.sidebar-logout:hover { color: #ef4444; }

/* Main */
.admin-main { margin-left: 220px; display: flex; flex-direction: column; min-height: 100vh; }

.admin-topbar {
  background: #fff; border-bottom: 1px solid #e2e8f0;
  padding: 14px 28px; display: flex;
  justify-content: space-between; align-items: center;
  position: sticky; top: 0; z-index: 50;
}
.admin-topbar h1 { font-size: 18px; font-weight: 700; color: #111; }
.topbar-right { display: flex; align-items: center; gap: 14px; font-size: 13px; color: #888; }
.tenant-badge {
  background: #f1f5f9; padding: 4px 10px; border-radius: 20px;
  font-size: 12px; font-weight: 600; color: #555;
}

#panel-content { padding: 28px; transition: opacity 0.15s; }

/* Loading spinner */
#loading-spinner {
  display: none; position: fixed;
  top: 0; left: 220px; right: 0; bottom: 0;
  background: rgba(241,245,249,0.6);
  align-items: center; justify-content: center; z-index: 200;
}
.spinner {
  width: 36px; height: 36px; border: 3px solid #e2e8f0;
  border-top-color: #3b82f6; border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Panel sections */
.panel-section {
  background: #fff; border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  padding: 24px; margin-bottom: 20px;
}
.panel-section-title {
  font-size: 15px; font-weight: 700; color: #111;
  margin-bottom: 16px; padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
  display: flex; justify-content: space-between; align-items: center;
}

/* Stat rows */
.stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px; }
.mini-stat {
  background: #fff; border-radius: 10px; padding: 18px 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.mini-stat-label { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; color: #94a3b8; text-transform: uppercase; }
.mini-stat-value { font-size: 28px; font-weight: 800; color: #111; margin-top: 6px; }
.mini-stat-sub { font-size: 12px; color: #888; margin-top: 4px; }

/* Tables */
.admin-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.admin-table th {
  background: #f8fafc; padding: 10px 14px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
  color: #94a3b8; text-transform: uppercase; text-align: left;
  border-bottom: 1px solid #f1f5f9;
}
.admin-table td { padding: 12px 14px; border-bottom: 1px solid #f8fafc; color: #444; vertical-align: middle; }
.admin-table tr:last-child td { border-bottom: none; }
.admin-table tr:hover td { background: #fafbfc; }

/* Badges */
.badge { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; white-space: nowrap; }
.badge-green { background: #dcfce7; color: #16a34a; }
.badge-orange { background: #ffedd5; color: #ea580c; }
.badge-red { background: #fee2e2; color: #dc2626; }
.badge-blue { background: #dbeafe; color: #1d4ed8; }
.badge-grey { background: #f1f5f9; color: #64748b; }

/* Buttons */
.btn-sm {
  padding: 5px 12px; border-radius: 6px; font-size: 12px;
  font-weight: 600; border: none; cursor: pointer; font-family: inherit;
  transition: background 0.12s;
}
.btn-sm-red { background: #fee2e2; color: #dc2626; }
.btn-sm-red:hover { background: #fecaca; }
.btn-sm-green { background: #dcfce7; color: #16a34a; }
.btn-sm-green:hover { background: #bbf7d0; }
.btn-sm-blue { background: #dbeafe; color: #1d4ed8; }
.btn-sm-blue:hover { background: #bfdbfe; }

/* Forms */
.admin-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.admin-form-field label { display: block; font-size: 12px; color: #888; margin-bottom: 4px; font-weight: 500; }
.admin-form-field input, .admin-form-field select {
  width: 100%; border: 1px solid #e2e8f0; border-radius: 8px;
  height: 38px; padding: 0 12px; font-size: 13px;
  font-family: inherit; color: #111; outline: none;
}
.admin-form-field input:focus { border-color: #94a3b8; }
.btn-primary-sm {
  height: 38px; background: #3b82f6; color: #fff;
  font-weight: 700; border: none; border-radius: 8px;
  padding: 0 20px; cursor: pointer; font-family: inherit; font-size: 13px;
}
.btn-primary-sm:hover { background: #2563eb; }

/* Toggle switch */
.toggle-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
.toggle-row:last-child { border-bottom: none; }
.toggle-label { font-size: 14px; color: #333; font-weight: 500; }
.toggle-sub { font-size: 12px; color: #888; margin-top: 2px; }
.toggle-switch { position: relative; width: 44px; height: 24px; }
.toggle-switch input { opacity: 0; width: 0; height: 0; }
.toggle-slider {
  position: absolute; cursor: pointer; inset: 0;
  background: #e2e8f0; border-radius: 24px; transition: 0.2s;
}
.toggle-slider:before {
  content: ''; position: absolute;
  height: 18px; width: 18px; left: 3px; bottom: 3px;
  background: #fff; border-radius: 50%; transition: 0.2s;
}
.toggle-switch input:checked + .toggle-slider { background: #22c55e; }
.toggle-switch input:checked + .toggle-slider:before { transform: translateX(20px); }

/* Moderation cards */
.mod-card {
  background: #fff; border-radius: 10px; padding: 18px 20px;
  border-left: 4px solid #f97316; margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.mod-card-name { font-size: 15px; font-weight: 700; color: #111; margin-bottom: 4px; }
.mod-card-meta { font-size: 12px; color: #888; margin-bottom: 8px; }
.mod-card-flags { font-size: 13px; color: #555; margin-bottom: 8px; }
.mod-card-detail { font-size: 13px; color: #666; font-style: italic; margin-bottom: 12px; }
.mod-actions { display: flex; gap: 8px; }

/* Empty state */
.empty-state { text-align: center; padding: 48px 20px; color: #94a3b8; }
.empty-state svg { margin: 0 auto 12px; display: block; }
.empty-state p { font-size: 14px; }

/* Toast */
.toast {
  position: fixed; bottom: 28px; right: 28px;
  padding: 12px 20px; border-radius: 8px; font-size: 14px;
  font-weight: 500; z-index: 9999;
  animation: slideIn 0.2s ease;
}
.toast-success { background: #052e16; color: #22c55e; border: 1px solid #16a34a; }
.toast-error { background: #450a0a; color: #ef4444; border: 1px solid #dc2626; }
@keyframes slideIn { from { transform:translateY(20px);opacity:0; } to { transform:translateY(0);opacity:1; } }

/* AI Chat */
#chat-history { height: 420px; overflow-y: auto; padding: 20px; background: #f8fafc; }
.chat-input-row { border-top: 1px solid #f1f5f9; padding: 16px; display: flex; gap: 10px; background: #fff; }
.chat-input-row textarea {
  flex: 1; border: 1px solid #e2e8f0; border-radius: 8px;
  padding: 10px 14px; font-family: inherit; font-size: 14px;
  resize: none; outline: none; color: #111;
}
.chat-input-row textarea:focus { border-color: #94a3b8; }
.btn-send {
  background: #3b82f6; color: #fff; border: none;
  border-radius: 8px; padding: 0 20px; cursor: pointer;
  font-weight: 700; font-family: inherit; font-size: 14px;
}
.btn-send:hover { background: #2563eb; }

/* Performance bars */
.perf-bar-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
.perf-bar-label { font-size: 13px; color: #555; width: 160px; flex-shrink: 0; }
.perf-bar-track { flex: 1; height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden; }
.perf-bar-fill { height: 100%; border-radius: 4px; transition: width 0.4s; }
.perf-bar-count { font-size: 13px; color: #888; width: 40px; text-align: right; }

@media (max-width: 900px) {
  .stat-row { grid-template-columns: 1fr 1fr; }
  .admin-form-grid { grid-template-columns: 1fr; }
}
```

---

## FILES TO CREATE / MODIFY

| Action | File |
|---|---|
| MODIFY | `backend/routers/admin_routes.py` |
| CREATE | `backend/templates/admin/admin_main.html` |
| CREATE | `backend/templates/admin/panels/overview.html` |
| CREATE | `backend/templates/admin/panels/users.html` |
| CREATE | `backend/templates/admin/panels/guest_db.html` |
| CREATE | `backend/templates/admin/panels/moderation.html` |
| CREATE | `backend/templates/admin/panels/search_system.html` |
| CREATE | `backend/templates/admin/panels/billing.html` |
| CREATE | `backend/templates/admin/panels/verification.html` |
| CREATE | `backend/templates/admin/panels/system_admin.html` |
| CREATE | `backend/templates/admin/panels/tenant_mgmt.html` |
| CREATE | `backend/templates/admin/panels/performance.html` |
| CREATE | `backend/templates/admin/panels/ai_assistant.html` |
| CREATE | `backend/static/css/admin.css` |
| CREATE | `backend/static/js/admin.js` |

---

## RULES

1. All `/admin/*` routes call `require_admin(request)` — redirect to /login if not admin
2. Panel routes return **partial HTML** (no `<html>` wrapper) — just `<div class="panel">...</div>`
3. Never hardcode `tenant_id = 1`
4. All DB connections closed in try/finally
5. `FEATURE_FLAGS` dict can be a module-level variable in `admin_routes.py` — fine for MVP
6. If `ANTHROPIC_API_KEY` not set → return graceful message, do not crash
7. `POST /stripe/webhook` (Phase 5) does NOT require auth — all other admin routes do
8. Do NOT modify `search_logic.py`

---

## WHEN PHASE 6 IS COMPLETE

Update `PROGRESS.md` — mark done:
- [x] Admin dashboard: 11-panel Jinja2 UI
- [x] POST /admin/ai-assistant (Anthropic API, reads live DB)

Then STOP. Do not start Phase 7 until instructed.
