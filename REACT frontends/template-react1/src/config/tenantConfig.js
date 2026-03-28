const BASE = import.meta.env.VITE_FASTAPI_URL || '';

export const tenantConfig = {
  login_url: `${BASE}/login`,
  register_url: `${BASE}/register`,
  pricing_url: `${BASE}/register`,
  contact_url: `${BASE}/register`,
  report_url: `${BASE}/submit-report`,
};
