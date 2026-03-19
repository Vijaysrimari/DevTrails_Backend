from pathlib import Path

import joblib
import numpy as np
import pandas as pd

MODEL_PATH = Path(__file__).resolve().parents[2] / "premium_model.pkl"
MODEL = joblib.load(MODEL_PATH)
FEATURE_COLUMNS = [
    "rainfall",
    "flood_risk",
    "aqi",
    "disruption_days",
    "worker_income",
    "zone_risk",
]


def predict_weekly_premium(features: list[float]) -> float:
    """Return a single weekly premium prediction from ordered feature values."""
    input_df = pd.DataFrame([features], columns=FEATURE_COLUMNS)
    prediction = MODEL.predict(input_df)
    return float(np.asarray(prediction)[0])
