# PHASE 3 — Auth Routes + Styled Jinja2 Templates
# CURSOR: Read this entire file before writing any code.

---

## CONTEXT

You are building the GuestGuard FastAPI backend. Phase 2 is complete:
- `backend/database.py` — all tables created, tenant seeded
- `backend/auth.py` — JWT, bcrypt helpers, `get_current_user`, `require_auth`, `require_admin`
- `backend/tenant.py` — `get_current_tenant(request)` reads Host header → tenants table
- `backend/main.py` — app factory, routers registered, static + templates mounted
- `backend/routers/auth_routes.py` — STUB ONLY (empty router, no routes yet)
- `backend/models.py` — `LoginForm`, `RegisterForm`, `ForgotPasswordForm`, `ResetPasswordForm` already defined

**Your job in Phase 3:** Fill in `auth_routes.py` and create all auth templates + static files.

---

## WHAT TO BUILD

### 1. `backend/routers/auth_routes.py`

Implement these routes (names are LOCKED — never rename):

#### GET /login
- Render `templates/login.html`
- Inject `tenant` (from `get_current_tenant(request)`)
- If user already has valid JWT cookie → redirect to /dashboard

#### POST /login
- Form fields: `email`, `password`, `remember_me` (checkbox)
- Look up user by email in DB
- Verify password with `verify_password()`
- If user not found or wrong password → re-render login with `error="Invalid email or password"`
- If `is_verified = 0` → allow login but set `unverified_banner = True` in template context
- On success: call `create_access_token()`, call `set_auth_cookie()`, redirect to /dashboard

#### GET /register
- Render `templates/register.html`
- Inject `tenant`
- If already logged in → redirect to /dashboard

#### POST /register
- Form fields: `full_name`, `email`, `password`, `confirm_password`
- Validate passwords match → re-render with error if not
- Check email not already taken → re-render with error if taken
- Hash password with `hash_password()`
- Insert user row: `tenant_id` from `get_current_tenant(request).id`, `email`, `password_hash`, `signup_domain` = request host, `created_at` = now UTC ISO string, `is_verified = 0`
- Insert subscription row: `tenant_id`, `user_id`, `plan_name = 'trial'`, `is_paid = 0`, `trial_start` = now UTC ISO string, `trial_searches_used = 0`, `status = 'trial'`
- Generate verification token: `secrets.token_urlsafe(32)`, store in `verification_tokens` table with `expires_at` = now + 24 hours
- Send verification email (see Email section below)
- Redirect to `/verify-email?sent=1`

#### GET /verify-email
- Query param: `token` (from email link) or `sent=1` (just registered)
- If `sent=1` → render `templates/verify_email.html` with `state="sent"`
- If `token` provided:
  - Look up token in `verification_tokens` table
  - Check `used = 0` and `expires_at > now`
  - If valid: set `users.is_verified = 1`, set `verification_tokens.used = 1`, render with `state="success"`
  - If invalid/expired: render with `state="invalid"`

#### GET /logout
- Call `clear_auth_cookie()` on a RedirectResponse to /login
- Return the response

#### GET /forgot-password
- Render `templates/forgot_password.html` with `tenant`

#### POST /forgot-password
- Form field: `email`
- Look up user by email (do NOT reveal if email exists — always show "If that email exists, a reset link was sent")
- If user found: generate reset token (`secrets.token_urlsafe(32)`), store in `password_reset_tokens` with `expires_at` = now + 1 hour
- Send reset email (see Email section below)
- Re-render `forgot_password.html` with `sent=True`

#### GET /reset-password
- Query param: `token`
- Validate token exists, unused, not expired
- If invalid: render with `state="invalid"`
- If valid: render `templates/reset_password.html` with `token=token`, `tenant`

#### POST /reset-password
- Form fields: `token`, `password`, `confirm_password`
- Validate passwords match
- Look up token, validate again
- Hash new password, update `users.password_hash`
- Mark token as used
- Redirect to `/login?reset=1`

#### GET /auth/google
- If `GOOGLE_CLIENT_ID` not in env → redirect to /login with `error="Google login not configured"`
- Otherwise: build OAuth redirect URL using `authlib` starlette OAuth client → redirect to Google

#### GET /auth/google/callback
- Handle OAuth callback
- Get user info (email, name) from Google
- Look up or create user in DB (same tenant logic as register)
- If new user: create user row with `is_verified = 1` (OAuth emails are pre-verified), create subscription row (trial)
- Set JWT cookie, redirect to /dashboard

#### GET /auth/facebook
- Same pattern as Google but for Facebook
- If `FACEBOOK_APP_ID` not in env → redirect to /login with `error="Facebook login not configured"`

#### GET /auth/facebook/callback
- Same pattern as Google callback but for Facebook

---

### 2. Email Sending Helper

Add a helper function `send_email(to: str, subject: str, html_body: str)` — put it in `auth_routes.py` or a new `email.py` file.

Use `smtplib` + `email.mime`:
```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
```

Read from env: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `FROM_EMAIL`

If any SMTP env vars are missing → log a warning and skip sending (do NOT crash — dev environments won't have SMTP configured).

**Verification email HTML:**
```
Subject: Verify your email — {brand_name}
Body: Click the link below to verify your email address.
Link: https://{request_host}/verify-email?token={token}
```

**Password reset email HTML:**
```
Subject: Reset your password — {brand_name}
Body: Click the link below to reset your password. This link expires in 1 hour.
Link: https://{request_host}/reset-password?token={token}
```

---

### 3. OAuth Setup (authlib)

At the top of `auth_routes.py` configure the OAuth registry:

```python
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config

config = Config()
oauth = OAuth(config)

oauth.register(
    name='google',
    client_id=os.getenv('GOOGLE_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'},
)

oauth.register(
    name='facebook',
    client_id=os.getenv('FACEBOOK_APP_ID'),
    client_secret=os.getenv('FACEBOOK_APP_SECRET'),
    access_token_url='https://graph.facebook.com/oauth/access_token',
    authorize_url='https://www.facebook.com/dialog/oauth',
    api_base_url='https://graph.facebook.com/',
    client_kwargs={'scope': 'email'},
)
```

OAuth callbacks need `SECRET_KEY` on the app session. Add to `main.py`:
```python
from starlette.middleware.sessions import SessionMiddleware
app.add_middleware(SessionMiddleware, secret_key=os.getenv("APP_SECRET_KEY", "dev-secret"))
```

---

### 4. Templates

Create these files. All templates must be modern and styled — NO plain HTML.

#### `backend/templates/login.html`

Design spec:
- Full page background: `#f5f5f5`
- Centered white card: max-width 420px, border-radius 16px, box-shadow `0 4px 24px rgba(0,0,0,0.08)`, padding 40px
- Vertically + horizontally centered (flexbox on body)
- Font: Inter from Google Fonts
- TOP of card: `<img src="{{ tenant.logo_url }}" alt="{{ tenant.brand_name }}" style="max-height:48px; display:block; margin:0 auto 24px;">` — if no logo, show brand name text
- Heading: "Sign in" — 24px, font-weight 700, centered, color #111
- Subheading: "to continue to your account" — 14px, color #888, centered, margin-bottom 28px
- Error banner (if `error`): red background `#fef2f2`, border `1px solid #fca5a5`, border-radius 8px, padding 12px, text color `#dc2626`, font-size 14px, margin-bottom 16px
- Unverified banner (if `unverified_banner`): yellow background `#fffbeb`, border `1px solid #fcd34d`, text "Please verify your email to access all features." with "Resend verification" link
- Email field: `<input type="email" name="email">` — underline style (no box border, border-bottom only `1px solid #ddd`), width 100%, padding 10px 0, font-size 15px, focus: border-bottom color = `{{ tenant.primary_color }}`
- Password field: same underline style, position relative, show/hide eye icon (SVG, right side, toggles input type)
- Row below password: left = checkbox "Keep me signed in" + label; right = "FORGOT PASSWORD?" link in `{{ tenant.primary_color }}`, font-size 12px, font-weight 700, letter-spacing 0.05em
- Sign In button: full width, height 48px, background `{{ tenant.primary_color }}`, white text, font-weight 700, border-radius 8px, border none, cursor pointer, margin-top 24px, hover: opacity 0.9
- "or" divider: two `<hr>` lines with "or" text centered between them, color #ddd, margin 20px 0
- "Continue with Google" button: full width, height 44px, background white, border `1px solid #ddd`, border-radius 8px, display flex, align-items center, justify-content center, gap 10px, Google SVG icon (multicolor), text color #444, font-size 14px, hover: background #f9f9f9
- "Continue with Facebook" button: same style, Facebook SVG icon (blue #1877F2)
- Bottom link: "Don't have an account? " + "Create account" link → /register, centered, font-size 14px, color #888, link color = `{{ tenant.primary_color }}`
- If `?reset=1` in query: show green success banner "Password reset successfully. Please sign in."

#### `backend/templates/register.html`

Same card layout as login.html.

- Heading: "Create account"
- Subheading: "Join {{ tenant.brand_name }}"
- Fields (all underline style): Full Name, Email, Password (with eye toggle), Confirm Password (with eye toggle)
- Error banner if `error`
- "CREATE ACCOUNT" button: same styling as Sign In button but label text "CREATE ACCOUNT"
- Same "or" divider + Google + Facebook buttons
- Bottom link: "Already have an account? " + "Sign in" → /login

#### `backend/templates/verify_email.html`

Same card layout.

- state="sent": envelope icon (SVG), heading "Check your email", body "We sent a verification link to your email address. Click the link to activate your account.", "Resend verification email" link (GET /resend-verification?email=...)
- state="success": checkmark icon (green SVG), heading "Email verified!", body "Your account is now active.", button "Go to Dashboard" → /dashboard
- state="invalid": X icon (red SVG), heading "Invalid or expired link", body "This verification link has expired or already been used.", button "Request new link" → /forgot-password... actually link to /login with message

#### `backend/templates/forgot_password.html`

Same card layout.

- Heading: "Forgot password"
- Subheading: "Enter your email and we'll send a reset link"
- Email field (underline style)
- "SEND RESET LINK" button
- If `sent=True`: green banner "If that email is registered, a reset link has been sent."
- Back to login link

#### `backend/templates/reset_password.html`

Same card layout.

- state="invalid": show error message, link back to /forgot-password
- Normal state: heading "Reset password", new password field + confirm password field (both with eye toggle), hidden input `token`, "RESET PASSWORD" button

---

### 5. Static Files

#### `backend/static/css/auth.css`

Global auth styles shared by all auth templates (login, register, verify, forgot, reset):

```css
/* Import Inter font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Inter', sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.auth-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 40px;
  width: 100%;
  max-width: 420px;
}

/* underline input fields */
.field-group { margin-bottom: 20px; position: relative; }
.field-group input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #ddd;
  padding: 10px 32px 10px 0;
  font-size: 15px;
  font-family: inherit;
  background: transparent;
  outline: none;
  color: #111;
}
.field-group input:focus { border-bottom-color: var(--primary); }
.field-group input::placeholder { color: #aaa; }

/* eye toggle */
.eye-toggle {
  position: absolute; right: 0; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer; color: #aaa; padding: 4px;
}
.eye-toggle:hover { color: #555; }

/* primary button */
.btn-primary {
  width: 100%; height: 48px;
  background: var(--primary);
  color: #fff; font-weight: 700;
  border: none; border-radius: 8px;
  font-size: 15px; font-family: inherit;
  cursor: pointer; margin-top: 8px;
  transition: opacity 0.15s;
}
.btn-primary:hover { opacity: 0.88; }

/* social buttons */
.btn-social {
  width: 100%; height: 44px;
  background: #fff; border: 1px solid #ddd;
  border-radius: 8px; display: flex;
  align-items: center; justify-content: center;
  gap: 10px; font-size: 14px; color: #444;
  font-family: inherit; cursor: pointer;
  text-decoration: none; margin-bottom: 10px;
  transition: background 0.15s;
}
.btn-social:hover { background: #f9f9f9; }

/* divider */
.divider {
  display: flex; align-items: center;
  gap: 12px; margin: 20px 0; color: #ccc; font-size: 13px;
}
.divider::before, .divider::after {
  content: ''; flex: 1; border-top: 1px solid #e5e5e5;
}

/* banners */
.banner { border-radius: 8px; padding: 12px 16px; font-size: 14px; margin-bottom: 16px; }
.banner-error { background: #fef2f2; border: 1px solid #fca5a5; color: #dc2626; }
.banner-warning { background: #fffbeb; border: 1px solid #fcd34d; color: #92400e; }
.banner-success { background: #f0fdf4; border: 1px solid #86efac; color: #166534; }

/* remember row */
.remember-row {
  display: flex; align-items: center;
  justify-content: space-between; margin: 16px 0;
}
.remember-row label { font-size: 13px; color: #555; display: flex; align-items: center; gap: 6px; cursor: pointer; }
.forgot-link { font-size: 12px; font-weight: 700; letter-spacing: 0.05em; text-decoration: none; color: var(--primary); }
.forgot-link:hover { text-decoration: underline; }

/* bottom link */
.bottom-link { text-align: center; font-size: 14px; color: #888; margin-top: 24px; }
.bottom-link a { color: var(--primary); text-decoration: none; font-weight: 500; }
.bottom-link a:hover { text-decoration: underline; }

/* logo */
.auth-logo { display: block; max-height: 48px; margin: 0 auto 24px; }
.auth-brand-name { text-align: center; font-size: 22px; font-weight: 700; color: #111; margin-bottom: 24px; }

/* headings */
.auth-heading { font-size: 24px; font-weight: 700; text-align: center; color: #111; margin-bottom: 6px; }
.auth-subheading { font-size: 14px; color: #888; text-align: center; margin-bottom: 28px; }
```

#### `backend/static/js/auth.js`

```javascript
// Show/hide password toggle
document.querySelectorAll('.eye-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling;
    if (input.type === 'password') {
      input.type = 'text';
      btn.innerHTML = eyeOffIcon();
    } else {
      input.type = 'password';
      btn.innerHTML = eyeIcon();
    }
  });
});

function eyeIcon() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
}
function eyeOffIcon() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
}
```

---

### 6. SVG Icons needed in templates

**Google icon** (for social button):
```html
<svg width="18" height="18" viewBox="0 0 48 48">
  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
</svg>
```

**Facebook icon** (for social button):
```html
<svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
</svg>
```

---

## RULES

1. All form POSTs use `application/x-www-form-urlencoded` — use `Form(...)` from FastAPI, NOT Pydantic body models
2. Every template receives `tenant` dict — inject it on every render call
3. Set `--primary` CSS variable in every template's `<style>` tag: `<style>:root { --primary: {{ tenant.primary_color }}; }</style>`
4. All DB connections must be closed after use (use try/finally)
5. Never hardcode `tenant_id = 1` — always use `get_current_tenant(request).id`
6. The `full_name` field is stored in a `name` column — BUT the current DB schema does NOT have a `name` column on users. Store full_name in the `signup_domain` field is WRONG. Instead: add a `name` column to users table in `database.py` init_db() as `name TEXT` — or store it nowhere for now and only use it for display via JWT. Simplest: add `name TEXT` to users table in `init_db()` and store it on registration.
7. OAuth routes: if credentials not in env, gracefully redirect to /login with error param instead of crashing
8. Do NOT modify `search_logic.py`
9. Do NOT modify the route names

---

## GOOGLE SVG EYE ICONS — Alternative (simpler inline)

If the JS approach is complex, you can use this simpler version directly in HTML:

```html
<div class="field-group">
  <input type="password" name="password" placeholder="Password" id="password-field">
  <button type="button" class="eye-toggle" onclick="togglePass('password-field', this)">
    <!-- eye SVG here -->
  </button>
</div>
<script>
function togglePass(id, btn) {
  var inp = document.getElementById(id);
  inp.type = inp.type === 'password' ? 'text' : 'password';
}
</script>
```

---

## FILES TO CREATE / MODIFY

| Action | File |
|---|---|
| MODIFY | `backend/routers/auth_routes.py` |
| MODIFY | `backend/database.py` — add `name TEXT` to users table in CREATE TABLE IF NOT EXISTS |
| MODIFY | `backend/main.py` — add SessionMiddleware |
| CREATE | `backend/templates/login.html` |
| CREATE | `backend/templates/register.html` |
| CREATE | `backend/templates/verify_email.html` |
| CREATE | `backend/templates/forgot_password.html` |
| CREATE | `backend/templates/reset_password.html` |
| CREATE | `backend/static/css/auth.css` |
| CREATE | `backend/static/js/auth.js` |
| CREATE | `backend/static/img/` directory (leave empty, default-logo.svg goes here) |

---

## WHEN PHASE 3 IS COMPLETE

Update `PROGRESS.md` — mark these items as done:
- [x] Auth: /login, /register (JWT, sessions, email verification)
- [x] Social login: Google OAuth2 + Facebook OAuth2
- [x] Login/Register Jinja2 templates (styled per design reference)

Then STOP. Do not start Phase 4 until instructed.
