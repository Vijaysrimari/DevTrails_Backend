from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    rainfall: float = Field(..., ge=0)
    flood_risk: float = Field(..., ge=0)
    aqi: float = Field(..., ge=0)
    disruption_days: float = Field(..., ge=0)
    worker_income: float = Field(..., ge=0)
    zone_risk: float = Field(..., ge=0)


class PredictionResponse(BaseModel):
    predicted_premium: float
