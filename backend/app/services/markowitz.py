import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from .util.asset_utils import get_historical_tick_data
from ..schemas.markowitz_schema import MarkowitzResponse

N_PORTFOLIOS = 500


def simulate_markowitz_optimization(assets: list[str], timeframe: float, r: float):
  asset_prices = get_historical_tick_data(assets, timeframe)

  returns = asset_prices.pct_change().dropna()
  mean_returns = returns.mean().values
  mean_returns = (1 + mean_returns)**252 - 1 # annualise
  cov_matrix = returns.cov().values * 252

  points = []
  weights_list = []

  for _ in range(N_PORTFOLIOS):
    w = rand_weights(len(assets))
    mu = np.dot(w, mean_returns)
    sigma = np.sqrt(w @ cov_matrix @ w.T)
    points.append([sigma, mu])
    weights_list.append(w)

  efficient_frontier = sorted(points, key=lambda x: x[0])

  sharpe_ratios = [(p[1] - r) / p[0] for p in points]
  best_idx = int(np.argmax(sharpe_ratios))

  best_point = points[best_idx]
  best_weights = weights_list[best_idx]
  best_vol = best_point[0]
  best_ret = best_point[1]
  best_sharpe = sharpe_ratios[best_idx]

  weight_dict = {asset: float(best_weights[i]) for i, asset in enumerate(assets)}

  return MarkowitzResponse(
    points=format_points_for_mui(points),
    weights=weight_dict,
    efficient_frontier=efficient_frontier,
    expected_return=float(best_ret),
    sharpe=float(best_sharpe),
    volatility=float(best_vol)
  )
  

def rand_weights(n):
    k = np.random.rand(n)
    return k / sum(k)
  

def format_points_for_mui(points: list[list[float]]) -> list[dict[str, float]]:
  return [
    {"x": float(sigma), "y": float(mu)}
    for sigma, mu in points
  ]