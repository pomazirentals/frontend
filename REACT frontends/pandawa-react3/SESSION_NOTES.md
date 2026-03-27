# Session Notes & Architecture Review

## Project State: `pandawa-react3` (React/Vite)

### 1. Architectural Review (Strict Rules Enforcement)
We audited the current codebase against the strict architectural rules (no hardcoded domains, backend owns tenant logic, relative navigation).
**Status:** ❌ Non-compliant.

**Issues Found:**
- **Hardcoded Domains:** `App.jsx` contains hardcoded absolute URLs for external links (`https://pandawa.framer.ai/support`) and branding assets.
- **Frontend Tenant Logic:** The frontend is statically hardcoding the brand identity ("Pandawa") rather than rendering data from the backend.
- **Absolute Navigation:** `src/config/tenantConfig.js` constructs absolute URLs using the API base URL (`login_url: ${BASE}/login`), violating the "relative navigation only" rule.

**Proposed Redesign (Pending Implementation):**
1. **Centralize API Layer:** Create a single `api.js` service that exclusively handles `import.meta.env.VITE_FASTAPI_URL`.
2. **Backend Resolves Tenant:** `App.jsx` must fetch tenant config on load (logo, brand name, specific URLs) from the backend based on origin/headers.
3. **Relative Navigation:** Remove absolute URL generation in `tenantConfig.js` and update all internal links to be strictly relative (e.g., `/login`).

### 2. Deployment Strategy: Netlify
- We discussed the correct way to upload the site to Netlify.
- **Decision/Recommendation:** The industry standard is to deploy **through GitHub (Continuous Deployment)** rather than manual CLI uploads. This provides automated builds, deploy previews, and easy rollbacks.

### Next Steps for Future Sessions:
1. Link the local project to a GitHub repository.
2. Connect the GitHub repository to Netlify for continuous deployment.
3. Implement the proposed architectural redesign for the frontend to ensure strict compliance with the domain-agnostic rules.
