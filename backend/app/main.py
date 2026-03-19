from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.analytics import router as analytics_router
from app.routes.auth import router as auth_router
from app.routes.prediction import router as prediction_router

app = FastAPI(title="AI Parametric Insurance API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction_router)
app.include_router(auth_router)
app.include_router(analytics_router)


@app.get("/")
def healthcheck() -> dict:
    return {"status": "ok", "message": "AI Parametric Insurance Backend Running"}
