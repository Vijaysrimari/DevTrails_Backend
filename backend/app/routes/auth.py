from fastapi import APIRouter, HTTPException

from app.schemas.auth import AuthResponse, LoginRequest, SignupRequest
from app.services.auth_service import login_user, signup_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup", response_model=AuthResponse)
def signup(payload: SignupRequest) -> AuthResponse:
    try:
        user = signup_user(payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    return AuthResponse(
        message="Signup successful",
        role=user["role"],
        full_name=user["full_name"],
        email=user["email"],
    )


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest) -> AuthResponse:
    try:
        user = login_user(payload)
    except ValueError as exc:
        raise HTTPException(status_code=401, detail=str(exc)) from exc

    return AuthResponse(
        message="Login successful",
        role=user["role"],
        full_name=user["full_name"],
        email=user["email"],
    )
