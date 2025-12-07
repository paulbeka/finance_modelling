from pydantic import BaseModel


class MarkowitzRequest(BaseModel):
  assets: list[str]
  timeframe: int
  risk_free_rate: float


class MarkowitzResponse(BaseModel):
  points: list[dict[str, float]]
  weights: dict[str, float]
  efficient_frontier_x: list[float]
  efficient_frontier_y: list[float]
  expected_return: float
  sharpe: float
  volatility: float
