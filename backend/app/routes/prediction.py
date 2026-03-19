from fastapi import APIRouter

from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.model_service import predict_weekly_premium

router = APIRouter(prefix="/predict", tags=["Prediction"])


@router.post("", response_model=PredictionResponse)
def predict_premium(payload: PredictionRequest) -> PredictionResponse:
    features = [
        payload.rainfall,
        payload.flood_risk,
        payload.aqi,
        payload.disruption_days,
        payload.worker_income,
        payload.zone_risk,
    ]
    premium = predict_weekly_premium(features)
    return PredictionResponse(predicted_premium=round(premium, 2))
