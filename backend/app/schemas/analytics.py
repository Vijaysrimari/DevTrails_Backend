from pydantic import BaseModel


class AdminAnalyticsResponse(BaseModel):
    total_workers_insured: int
    active_policies: int
    claims_triggered: int
    total_payouts: float
    risk_distribution: list[dict]
    premium_revenue: list[dict]
    weather_disruptions: list[dict]
