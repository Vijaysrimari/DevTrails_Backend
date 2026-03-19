from fastapi import APIRouter

from app.schemas.analytics import AdminAnalyticsResponse
from app.services.analytics_service import get_admin_analytics

router = APIRouter(prefix="/admin", tags=["Admin Analytics"])


@router.get("/analytics", response_model=AdminAnalyticsResponse)
def fetch_analytics() -> AdminAnalyticsResponse:
    return AdminAnalyticsResponse(**get_admin_analytics())
