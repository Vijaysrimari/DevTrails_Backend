from typing import Literal

from pydantic import BaseModel, EmailStr, Field

RoleType = Literal["worker", "admin"]


class SignupRequest(BaseModel):
    full_name: str = Field(..., min_length=2)
    phone_number: str = Field(..., min_length=8)
    email: EmailStr
    password: str = Field(..., min_length=6)
    delivery_platform: str
    city: str
    delivery_zone: str
    weekly_earnings: float = Field(..., ge=0)
    upi_id: str
    role: RoleType = "worker"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class AuthResponse(BaseModel):
    message: str
    role: RoleType
    full_name: str
    email: EmailStr
