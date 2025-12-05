from fastapi import APIRouter

from ...schemas.markowitz_schema import MarkowitzRequest, MarkowitzResponse

markowitz_router = APIRouter()


@markowitz_router.post("/markowitz/optimize")
def optimize_portfolio(request: MarkowitzRequest) -> MarkowitzResponse:
  pass
