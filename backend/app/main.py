from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.routers import monte_carlo_options_endpoints
from .api.routers import binomial_endpoints
from .config.config import ALLOWED_ORIGINS

app = FastAPI()

app.include_router(monte_carlo_options_endpoints.router, prefix="/api/monte-carlo-options", tags=["Monte Carlo Options Simulator"])
app.include_router(binomial_endpoints.router, prefix="/api/binomial", tags=["Binomial Pricing Simulator"])

app.add_middleware(
  CORSMiddleware,
  allow_origins=ALLOWED_ORIGINS,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)
