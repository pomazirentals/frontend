import sqlite3
import re
from rapidfuzz import fuzz

DB_NAME = "guests.db"

def normalize_phone(phone_str):
    """Removes non-digits. Returns empty string if None."""
    if not phone_str:
        return ""
    return re.sub(r'\D', '', str(phone_str))

def calculate_confidence(candidate, query):
    """
    Compares a candidate record from DB against the query.
    Returns a score (0-100) representing the likelihood of a match.
    """
    # Unpack candidate (matches the SELECT order in search_guests)
    c_id, c_first, c_last, c_phone, c_city, c_state, c_reason = candidate
    
    # Unpack query
    q_first = query.get('first_name', '')
    q_last = query.get('last_name', '')
    q_phone = normalize_phone(query.get('phone', ''))
    q_city = query.get('city', '')
    q_state = query.get('state', '')

    scores = {}

    # 1. Phone Match (High Confidence)
    c_phone_norm = normalize_phone(c_phone)
    if q_phone and c_phone_norm:
        # Check if one contains the other (handles +1 or missing area codes)
        if q_phone in c_phone_norm or c_phone_norm in q_phone:
            scores['phone'] = 100
        else:
            scores['phone'] = 0
    else:
        scores['phone'] = None # Skipped if data missing

    # 2. Name Match (Fuzzy)
    # Combine first/last for better matching ("Rob Smith" vs "Smith, Rob")
    c_full_name = f"{c_first} {c_last}"
    q_full_name = f"{q_first} {q_last}"
    
    # token_sort_ratio handles mixed order well
    scores['name'] = fuzz.token_sort_ratio(c_full_name, q_full_name)

    # 3. Location Match (Fuzzy)
    c_loc = f"{c_city} {c_state}"
    q_loc = f"{q_city} {q_state}"
    scores['location'] = fuzz.token_set_ratio(c_loc, q_loc)

    # --- WEIGHTING LOGIC ---
    # We adjust weights based on what data is available.
    
    final_score = 0
    
    if scores['phone'] is not None:
        # If we have phone numbers, they are the strongest indicator.
        # Weights: Phone(50%), Name(30%), Location(20%)
        final_score = (
            (scores['phone'] * 0.50) + 
            (scores['name'] * 0.30) + 
            (scores['location'] * 0.20)
        )
    else:
        # If no phone comparison possible, rely on Name/Loc.
        # Weights: Name(60%), Location(40%)
        final_score = (
            (scores['name'] * 0.60) + 
            (scores['location'] * 0.40)
        )

    return round(final_score, 1)

def search_guests(query_dict):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Fetch ALL records (for small DBs <10k, this is faster than complex SQL filters)
    cursor.execute("SELECT id, first_name, last_name, phone, city, state, report_reason FROM reported_guests")
    all_guests = cursor.fetchall()
    conn.close()

    results = []
    for guest in all_guests:
        score = calculate_confidence(guest, query_dict)
        
        # Determine "Temperature"
        temp = "COLD"
        if score > 85: temp = "HOT"
        elif score > 50: temp = "WARM"

        results.append({
            "match_score": score,
            "temperature": temp,
            "data": {
                "first_name": guest[1],
                "last_name": guest[2],
                "phone": guest[3],
                "location": f"{guest[4]}, {guest[5]}",
                "reason": guest[6]
            }
        })

    # Sort by score descending (Highest match first)
    results.sort(key=lambda x: x['match_score'], reverse=True)
    return results

if __name__ == "__main__":
    # TEST CASE
    test_query = {
        "first_name": "Mike",
        "last_name": "Scot", 
        "phone": "5551234", # Intentionally partial
        "city": "Scranton",
        "state": "PA"
    }
    
    print(f"--- Searching for: {test_query} ---")
    matches = search_guests(test_query)
    
    for m in matches[:5]: # Show top 5
        print(f"[{m['temperature']}] Score: {m['match_score']}% | {m['data']['first_name']} {m['data']['last_name']} ({m['data']['location']})")
