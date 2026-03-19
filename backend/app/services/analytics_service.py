def get_admin_analytics() -> dict:
    # Static sample analytics for dashboard visualization.
    return {
        "total_workers_insured": 12450,
        "active_policies": 11890,
        "claims_triggered": 372,
        "total_payouts": 1825000.0,
        "risk_distribution": [
            {"name": "Low", "value": 34},
            {"name": "Medium", "value": 43},
            {"name": "High", "value": 23},
        ],
        "premium_revenue": [
            {"month": "Jan", "revenue": 220000},
            {"month": "Feb", "revenue": 260000},
            {"month": "Mar", "revenue": 280000},
            {"month": "Apr", "revenue": 310000},
            {"month": "May", "revenue": 355000},
        ],
        "weather_disruptions": [
            {"week": "W1", "incidents": 12},
            {"week": "W2", "incidents": 17},
            {"week": "W3", "incidents": 9},
            {"week": "W4", "incidents": 22},
        ],
    }
