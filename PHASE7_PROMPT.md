# PHASE 7 — React Marketing Sites: Wire Login/Register Links to FastAPI
# CURSOR: Read this entire file before writing any code.

---

## CONTEXT

Phases 1–6 are complete. The FastAPI backend is fully built.

**Your job in Phase 7:** Update all 5 React marketing sites so every "Login", "Register", "Get Started", and pricing CTA button links to the FastAPI backend — not to internal React routes or placeholder hrefs.

---

## THE CORE PROBLEM TO FIX

All 5 React sites are deployed on Netlify (each on its own domain).
The FastAPI backend is deployed on Railway (its own URL).

Currently some sites use relative paths like `/login` — on Netlify, that stays on Netlify's domain instead of going to FastAPI.

**The fix:** Each React site reads the FastAPI backend URL from an environment variable and prefixes all auth/CTA links with it.

---

## ENVIRONMENT VARIABLE PATTERN

**Vite-based sites** (template-react1, template-react2, pandawa-react3):
- Env var name: `VITE_FASTAPI_URL`
- Access in code: `import.meta.env.VITE_FASTAPI_URL`
- Example value: `https://guestguard.up.railway.app`

**CRA-based sites** (template-react4, aivora-react5):
- Env var name: `REACT_APP_FASTAPI_URL`
- Access in code: `process.env.REACT_APP_FASTAPI_URL`
- Example value: `https://guestguard.up.railway.app`

---

## CHANGES REQUIRED PER SITE

---

### SITE 1: `template-react1` (Vite + JSX)

**File: `src/config/tenantConfig.js`**

Replace entire file with:
```js
const BASE = import.meta.env.VITE_FASTAPI_URL || '';

export const tenantConfig = {
  login_url: `${BASE}/login`,
  register_url: `${BASE}/register`,
  pricing_url: `${BASE}/register`,
  contact_url: `${BASE}/register`,
};
```

Note: `pricing_url` and `contact_url` are intentionally mapped to `/register` — all CTAs funnel to signup.

**File: `src/App.jsx`**

The file already imports `tenantConfig` and uses `tenantConfig.login_url` and `tenantConfig.register_url` in the nav. Those are already correct.

The issue is "Get Started Now" CTAs and pricing buttons use `tenantConfig.contact_url` — that is now fixed by the tenantConfig change above (contact_url now points to register). No changes needed in App.jsx.

**File: `.env.example` (create in root of template-react1)**
```
VITE_FASTAPI_URL=https://your-fastapi-url.railway.app
```

---

### SITE 2: `template-react2` (Vite + JSX)

Same changes as template-react1 — identical structure.

**File: `src/config/tenantConfig.js`** — same replacement as above

**File: `.env.example`** — same as above

---

### SITE 3: `pandawa-react3` (Vite + JSX)

Same changes as template-react1.

**File: `src/config/tenantConfig.js`** — same replacement as above

**File: `.env.example`** — same as above

---

### SITE 4: `template-react4` (CRA + craco)

**File: `src/config/tenantConfig.js`**

Replace entire file with:
```js
const BASE = process.env.REACT_APP_FASTAPI_URL || '';

export const tenantConfig = {
  login_url: `${BASE}/login`,
  register_url: `${BASE}/register`,
  pricing_url: `${BASE}/register`,
  contact_url: `${BASE}/register`,
};
```

**File: `src/components/navbar.js`**

The navbar already uses `tenantConfig.login_url` and `tenantConfig.register_url` as `href` on `<a>` tags — this is correct. ✓

The "Get started" button in the navbar currently has no `href`. Fix it:

Find this block:
```jsx
<div className="get-started navbar-thq-get-started-elm1">
  <span className="navbar-thq-text-elm1">Get started</span>
</div>
```

Replace with:
```jsx
<a href={tenantConfig.register_url} className="get-started navbar-thq-get-started-elm1">
  <span className="navbar-thq-text-elm1">Get started</span>
</a>
```

Also find the mobile menu "Get started" button:
```jsx
<div className="get-started">
  <span className="navbar-thq-text-elm2">Get started</span>
</div>
```

Replace with:
```jsx
<a href={tenantConfig.register_url} className="get-started">
  <span className="navbar-thq-text-elm2">Get started</span>
</a>
```

**File: `.env.example` (create in root of template-react4)**
```
REACT_APP_FASTAPI_URL=https://your-fastapi-url.railway.app
```

---

### SITE 5: `aivora-react5` (CRA + TypeScript)

**File: `src/config/tenantConfig.ts`**

Replace entire file with:
```ts
const BASE: string = process.env.REACT_APP_FASTAPI_URL || '';

export const tenantConfig = {
  login_url: `${BASE}/login`,
  register_url: `${BASE}/register`,
  pricing_url: `${BASE}/register`,
  contact_url: `${BASE}/register`,
};
```

**File: `src/components/Header/Header.tsx`**

This file uses React Router `<Link to={tenantConfig.login_url}>` — but since the FastAPI URL is external (different domain), React Router `Link` won't work for cross-domain navigation.

Find all instances of:
```tsx
<Link to={tenantConfig.login_url}
```
Replace with:
```tsx
<a href={tenantConfig.login_url}
```

Find all instances of:
```tsx
<Link to={tenantConfig.register_url}
```
Replace with:
```tsx
<a href={tenantConfig.register_url}
```

Find all instances of:
```tsx
<Link to={tenantConfig.contact_url}
```
Replace with:
```tsx
<a href={tenantConfig.contact_url}
```

Find all instances of:
```tsx
<Link to={tenantConfig.pricing_url}
```
Replace with:
```tsx
<a href={tenantConfig.pricing_url}
```

Do the same in these files if they also use `<Link to={tenantConfig.*}>`:
- `src/components/HeaderTwo/HeaderTwo.tsx`
- `src/components/HeaderThree/HeaderThree.tsx`
- `src/components/ai-chatbot-components/CTASection/CTASection.tsx`
- Any other component that imports tenantConfig

**Search the entire `src/` directory for `tenantConfig` usage:**
```
grep -r "tenantConfig" src/ --include="*.tsx" --include="*.ts" -l
```
For each file found: replace `<Link to={tenantConfig.` with `<a href={tenantConfig.` and add closing `</a>` where `</Link>` was.

**File: `.env.example` (create in root of aivora-react5)**
```
REACT_APP_FASTAPI_URL=https://your-fastapi-url.railway.app
```

---

## NETLIFY DEPLOYMENT CONFIG

Create a `netlify.toml` in the root of each React site. This tells Netlify how to build it and ensures unknown routes don't 404 (the sites have no React Router routes, so this is minimal).

**For Vite sites (template-react1, template-react2, pandawa-react3):**

`netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**For CRA sites (template-react4, aivora-react5):**

`netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## HOW THE FASTAPI_URL ENV VAR GETS SET ON NETLIFY

The Cursor prompt does NOT set this — that's a deployment step.
But add a comment to each `.env.example` explaining:

```
# Set this in Netlify → Site Settings → Environment Variables
# Value should be your Railway FastAPI URL, e.g.:
# VITE_FASTAPI_URL=https://guestguard.up.railway.app
# (no trailing slash)
```

---

## SUMMARY OF ALL FILES TO MODIFY / CREATE

| Site | Action | File |
|---|---|---|
| template-react1 | MODIFY | `src/config/tenantConfig.js` |
| template-react1 | CREATE | `.env.example` |
| template-react1 | CREATE | `netlify.toml` |
| template-react2 | MODIFY | `src/config/tenantConfig.js` |
| template-react2 | CREATE | `.env.example` |
| template-react2 | CREATE | `netlify.toml` |
| pandawa-react3 | MODIFY | `src/config/tenantConfig.js` |
| pandawa-react3 | CREATE | `.env.example` |
| pandawa-react3 | CREATE | `netlify.toml` |
| template-react4 | MODIFY | `src/config/tenantConfig.js` |
| template-react4 | MODIFY | `src/components/navbar.js` — add href to Get Started buttons |
| template-react4 | CREATE | `.env.example` |
| template-react4 | CREATE | `netlify.toml` |
| aivora-react5 | MODIFY | `src/config/tenantConfig.ts` |
| aivora-react5 | MODIFY | All `.tsx` files that use `<Link to={tenantConfig.*}>` → `<a href={...}>` |
| aivora-react5 | CREATE | `.env.example` |
| aivora-react5 | CREATE | `netlify.toml` |

---

## RULES

1. Do NOT add any new pages, routes, or components to the React sites
2. Do NOT build a React login page, dashboard, or any app functionality
3. Only change: tenantConfig URLs, Get Started button hrefs, Link→a replacements, netlify.toml, .env.example
4. Do NOT touch any visual styling, animations, or layout
5. Do NOT modify anything in the `backend/` folder
6. The `contact_url` and `pricing_url` in tenantConfig intentionally point to `register` — this is correct, all CTAs should funnel to signup

---

## WHEN PHASE 7 IS COMPLETE

Update `PROGRESS.md` — mark done:
- [x] React marketing sites — login/register links pointing to FastAPI

Then update `PROGRESS.md` build order — mark ALL phases complete:
- [x] Phase 1: Docs + contract lock
- [x] Phase 2: FastAPI DB schema + tenant system
- [x] Phase 3: Auth routes + styled Jinja2 templates
- [x] Phase 4: Member dashboard, search, report pages
- [x] Phase 5: Stripe + billing
- [x] Phase 6: Admin dashboard (11 panels)
- [x] Phase 7: React sites wired to FastAPI

Then STOP. All phases are complete.
