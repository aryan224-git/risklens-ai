from fastapi import FastAPI
from backend.api.routes import router

app = FastAPI(
    title="RiskLens AI",
    version="1.0.0",
)

app.include_router(router)