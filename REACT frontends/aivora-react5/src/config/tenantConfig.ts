const BASE: string = process.env.REACT_APP_FASTAPI_URL || '';

export const tenantConfig = {
  login_url: `${BASE}/login`,
  register_url: `${BASE}/register`,
  pricing_url: `${BASE}/register`,
  contact_url: `${BASE}/register`,
};
