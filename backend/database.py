import sqlite3
import os
from datetime import datetime, timezone
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "guests.db")


def get_db():
    """Return a database connection with row_factory set."""
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db():
    """Create all tables if they don't exist, then seed default tenant."""
    conn = get_db()
    cursor = conn.cursor()

    cursor.executescript("""
        CREATE TABLE IF NOT EXISTS tenants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            domain TEXT UNIQUE NOT NULL,
            brand_name TEXT NOT NULL,
            logo_url TEXT,
            primary_color TEXT DEFAULT '#3b82f6',
            active INTEGER DEFAULT 1,
            created_at TEXT
        );

        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tenant_id INTEGER NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            name TEXT,
            phone TEXT,
            phone_verified INTEGER DEFAULT 0,
            is_verified INTEGER DEFAULT 0,
            is_admin INTEGER DEFAULT 0,
            signup_domain TEXT,
            ip_address TEXT,
            signup_ip TEXT,
            login_ip TEXT,
            created_at TEXT,
            last_login TEXT,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id)
        );

        CREATE TABLE IF NOT EXISTS guest_reports (
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
            ip_address TEXT,
            submitted_ip TEXT,
            created_at TEXT,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id)
        );

        CREATE TABLE IF NOT EXISTS search_history (
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

        CREATE TABLE IF NOT EXISTS subscriptions (
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

        CREATE TABLE IF NOT EXISTS verification_tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT UNIQUE NOT NULL,
            created_at TEXT,
            expires_at TEXT,
            used INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS password_reset_tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT UNIQUE NOT NULL,
            created_at TEXT,
            expires_at TEXT,
            used INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS admin_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            admin_user_id INTEGER,
            action TEXT,
            target TEXT,
            detail TEXT,
            created_at TEXT
        );

        CREATE TABLE IF NOT EXISTS feature_flags (
            key TEXT PRIMARY KEY,
            value INTEGER NOT NULL DEFAULT 0,
            updated_at TEXT
        );
    """)

    # Seed default tenant for local dev
    now = datetime.now(timezone.utc).isoformat()
    cursor.execute(
        """
        INSERT OR IGNORE INTO tenants (domain, brand_name, logo_url, primary_color, active, created_at)
        VALUES (?, ?, ?, ?, 1, ?)
        """,
        ("localhost", "GuestGuard", "/static/img/default-logo.svg", "#3b82f6", now),
    )

    # Seed additional tenant domain from env (used for Railway/production hostname)
    extra_domain = os.getenv("DEFAULT_TENANT_DOMAIN", "").strip().lower()
    if extra_domain and extra_domain != "localhost":
        cursor.execute(
            """
            INSERT OR IGNORE INTO tenants (domain, brand_name, logo_url, primary_color, active, created_at)
            VALUES (?, ?, ?, ?, 1, ?)
            """,
            (extra_domain, "GuestGuard", "/static/img/default-logo.svg", "#3b82f6", now),
        )

    conn.commit()

    # Seed admin user from env vars — used for first-time Railway setup.
    # Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in Railway env vars,
    # then restart the service once to create the account. Remove them after.
    seed_email = os.getenv("SEED_ADMIN_EMAIL", "").strip()
    seed_password = os.getenv("SEED_ADMIN_PASSWORD", "").strip()
    if seed_email and seed_password:
        from passlib.context import CryptContext
        pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")
        hashed = pwd_ctx.hash(seed_password[:72])
        # Use tenant_id=1 (the localhost/default tenant seeded above)
        cursor.execute(
            "SELECT id FROM tenants ORDER BY id LIMIT 1"
        )
        tenant_row = cursor.fetchone()
        tenant_id = tenant_row["id"] if tenant_row else 1
        cursor.execute(
            """
            INSERT OR IGNORE INTO users
                (tenant_id, email, password_hash, name, is_verified, is_admin, created_at)
            VALUES (?, ?, ?, 'Admin', 1, 1, ?)
            """,
            (tenant_id, seed_email, hashed, now),
        )
        conn.commit()

    # Migration: add name column to existing databases
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN name TEXT")
        conn.commit()
    except Exception:
        pass  # Column already exists

    # Migration: add phone columns to existing databases
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN phone TEXT")
        conn.commit()
    except Exception:
        pass
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN phone_verified INTEGER DEFAULT 0")
        conn.commit()
    except Exception:
        pass

    # Migration: add ip_address columns to existing databases
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN ip_address TEXT")
        conn.commit()
    except Exception:
        pass
    try:
        cursor.execute("ALTER TABLE guest_reports ADD COLUMN ip_address TEXT")
        conn.commit()
    except Exception:
        pass
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN signup_ip TEXT")
        conn.commit()
    except Exception:
        pass
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN login_ip TEXT")
        conn.commit()
    except Exception:
        pass
    try:
        cursor.execute("ALTER TABLE guest_reports ADD COLUMN submitted_ip TEXT")
        conn.commit()
    except Exception:
        pass

    conn.close()
