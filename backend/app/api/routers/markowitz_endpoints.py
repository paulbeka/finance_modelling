from fastapi import APIRouter

from ...schemas.markowitz_schema import MarkowitzRequest, MarkowitzResponse
from ...services.markowitz import simulate_markowitz_optimization


router = APIRouter()


@router.post("/optimize")
def optimize_portfolio(request: MarkowitzRequest) -> MarkowitzResponse:
  return simulate_markowitz_optimization(request.assets, request.timeframe, request.risk_free_rate)
