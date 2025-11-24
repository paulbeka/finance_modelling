from fastapi import FastAPI
from .api.routers import monte_carlo_options_simulator

app = FastAPI()

app.include_router(monte_carlo_options_simulator.router, prefix="/api/monte-carlo-options", tags=["Monte Carlo Options Simulator"])

@app.get("/")
def hello_world():
    return {"message": "Hello, World!"}
