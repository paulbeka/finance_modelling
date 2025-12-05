from fastapi import BaseModel


class MarkowitzRequest(BaseModel):
  assets: list[str]
  timeframe: int


class MarkowitzResponse(BaseModel):
  points: list[list[float]]
  weights: dict[str, int]
  efficient_frontier: list[list[float]]
  expected_return: float
  sharpe: float
  volatility: float
