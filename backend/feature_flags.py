from datetime import datetime, timezone

from database import get_db


DEFAULT_FLAGS = {
    "maintenance_mode": 0,
    "new_registrations": 1,
    "public_report_form": 1,
    "trial_search_limit": 1,
    "twilio_verification": 0,
}


def _now_utc() -> str:
    return datetime.now(timezone.utc).isoformat()


def ensure_feature_flags() -> None:
    conn = get_db()
    try:
        for key, value in DEFAULT_FLAGS.items():
            conn.execute(
                """
                INSERT OR IGNORE INTO feature_flags (key, value, updated_at)
                VALUES (?, ?, ?)
                """,
                (key, value, _now_utc()),
            )
        conn.commit()
    finally:
        conn.close()


def get_feature_flags() -> dict[str, int]:
    ensure_feature_flags()
    conn = get_db()
    try:
        rows = conn.execute("SELECT key, value FROM feature_flags").fetchall()
        flags = {row["key"]: int(row["value"]) for row in rows}
        for key, value in DEFAULT_FLAGS.items():
            flags.setdefault(key, value)
        return flags
    finally:
        conn.close()


def is_feature_enabled(name: str) -> bool:
    return get_feature_flags().get(name, 0) == 1


def set_feature_flag(name: str, value: int) -> None:
    ensure_feature_flags()
    conn = get_db()
    try:
        conn.execute(
            """
            UPDATE feature_flags
            SET value = ?, updated_at = ?
            WHERE key = ?
            """,
            (int(value), _now_utc(), name),
        )
        conn.commit()
    finally:
        conn.close()
