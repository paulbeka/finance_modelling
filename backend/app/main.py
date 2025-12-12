from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.routers import monte_carlo_options_endpoints
from .api.routers import binomial_endpoints
from .api.routers import markowitz_endpoints
from .api.routers import data_util_endpoints
from .api.routers import heston_endpoints

from .config.config import ALLOWED_ORIGINS

app = FastAPI()

app.include_router(monte_carlo_options_endpoints.router, prefix="/api/monte-carlo-options", tags=["Monte Carlo Options Simulator"])
app.include_router(binomial_endpoints.router, prefix="/api/binomial", tags=["Binomial Pricing Simulator"])
app.include_router(markowitz_endpoints.router, prefix="/api/markowitz", tags=["Markowitz Optimizer Engine"])
app.include_router(heston_endpoints.router, prefix="/api/heston", tags=["Heston Model Simulator"])

app.include_router(data_util_endpoints.router, prefix="/api/data_util", tags=["Util"])

app.add_middleware(
  CORSMiddleware,
  allow_origins=ALLOWED_ORIGINS,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)
