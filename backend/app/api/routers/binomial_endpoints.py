from fastapi import APIRouter
from ...schemas.binomial_schema import BinomialInput, BinomialOutput
from ...services.binomial import simulate_binomial

router = APIRouter()

@router.post("/binomial-simulation", response_model=BinomialOutput)
def call_binomial(request: BinomialInput):
  simulation_output = simulate_binomial(
    S=request.spot,
    K=request.strike,
    T=request.time,
    r=request.risk_free_rate,
    sigma=request.sigma,
    q=request.dividends,
    steps=request.num_steps,
    option_type=request.option_type,
    option_style=request.option_style,
    lattice_type=request.lattice_type
  )
  return simulation_output