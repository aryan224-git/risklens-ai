import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.routes import router


# Load environment variables from root .env
load_dotenv()


app = FastAPI(
    title="RiskLens AI",
    description="Explainable AI-powered fraud risk analysis API",
    version="1.0.0",
)


frontend_origins = os.getenv(
    "FRONTEND_ORIGINS",
    "http://localhost:5173"
)

allowed_origins = [
    origin.strip()
    for origin in frontend_origins.split(",")
    if origin.strip()
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)


@app.get("/")
def root():
    return {
        "name": "RiskLens AI",
        "status": "running",
        "docs": "/docs"
    }