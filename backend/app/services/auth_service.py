import json
from pathlib import Path

from app.schemas.auth import LoginRequest, SignupRequest

USERS_DB_PATH = Path(__file__).resolve().parents[2] / "users.json"


def _load_users() -> list[dict]:
    if not USERS_DB_PATH.exists():
        return []
    with USERS_DB_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)


def _save_users(users: list[dict]) -> None:
    with USERS_DB_PATH.open("w", encoding="utf-8") as file:
        json.dump(users, file, indent=2)


def signup_user(payload: SignupRequest) -> dict:
    users = _load_users()

    if any(user["email"] == payload.email for user in users):
        raise ValueError("Email already registered")

    new_user = payload.model_dump()
    users.append(new_user)
    _save_users(users)
    return new_user


def login_user(payload: LoginRequest) -> dict:
    users = _load_users()
    for user in users:
        if user["email"] == payload.email and user["password"] == payload.password:
            return user
    raise ValueError("Invalid email or password")
