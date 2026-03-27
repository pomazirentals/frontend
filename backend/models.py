from typing import Optional
from pydantic import BaseModel, EmailStr


# ---------------------------------------------------------------------------
# Auth models
# ---------------------------------------------------------------------------

class LoginForm(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool = False


class RegisterForm(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    confirm_password: str


class ForgotPasswordForm(BaseModel):
    email: EmailStr


class ResetPasswordForm(BaseModel):
    token: str
    password: str
    confirm_password: str


# ---------------------------------------------------------------------------
# Report models
# ---------------------------------------------------------------------------

class GuestReportForm(BaseModel):
    first_name: str
    last_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    airbnb_vrbo_profile: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    prev_group_size: Optional[int] = None
    prev_stay_length: Optional[int] = None
    stay_date: Optional[str] = None
    guest_rating: Optional[int] = None
    incident_flags: Optional[str] = None  # JSON-encoded list of checked items
    report_reason: Optional[str] = None
    details_of_incident: str
    privacy_agreed: bool = False


# ---------------------------------------------------------------------------
# Search models
# ---------------------------------------------------------------------------

class GuestSearchForm(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None


# ---------------------------------------------------------------------------
# Tenant models
# ---------------------------------------------------------------------------

class TenantCreate(BaseModel):
    domain: str
    brand_name: str
    logo_url: Optional[str] = None
    primary_color: str = "#3b82f6"
    active: bool = True


class TenantUpdate(BaseModel):
    brand_name: Optional[str] = None
    logo_url: Optional[str] = None
    primary_color: Optional[str] = None
    active: Optional[bool] = None


# ---------------------------------------------------------------------------
# Subscription / billing models
# ---------------------------------------------------------------------------

class SubscriptionStatus(BaseModel):
    user_id: int
    is_paid: bool
    plan_name: str
    status: str
    trial_start: Optional[str]
    trial_searches_used: int
    member_since: Optional[str]
    next_billing: Optional[str]
