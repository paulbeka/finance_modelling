from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.routers import monte_carlo_options_simulator
from .config.config import ALLOWED_ORIGINS

app = FastAPI()

app.include_router(monte_carlo_options_simulator.router, prefix="/api/monte-carlo-options", tags=["Monte Carlo Options Simulator"])

app.add_middleware(
  CORSMiddleware,
  allow_origins=ALLOWED_ORIGINS,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

@app.get("/")
def hello_world():
    return {"message": "Hello, World!"}
