import numpy as np
import pandas as pd
from scipy.spatial import ConvexHull
from scipy.interpolate import PchipInterpolator

from .util.asset_utils import get_historical_tick_data
from ..schemas.markowitz_schema import MarkowitzResponse


N_PORTFOLIOS = 500
N_TRADING_DAYS = 525


def simulate_markowitz_optimization(assets: list[str], timeframe: float, r: float):
  asset_prices = get_historical_tick_data(assets, timeframe)

  returns = asset_prices.pct_change().dropna()
  returns = returns.loc[:, returns.std() > 0]
  if returns.shape[1] == 0:
    raise ValueError("All assets have zero variance! Please retry with different assets.")
  
  mean_returns = returns.mean().values
  mean_returns = (1 + mean_returns)**N_TRADING_DAYS - 1  # annualise
  cov_matrix = returns.cov().values * N_TRADING_DAYS

  points = []
  weights_list = []

  for _ in range(N_PORTFOLIOS):
    w = rand_weights(len(assets))
    mu = np.dot(w, mean_returns)
    sigma = np.sqrt(w @ cov_matrix @ w.T)
    points.append([sigma, mu])
    weights_list.append(w)

  efficient_frontier_x, efficient_frontier_y = get_efficient_frontier(points)

  sharpe_ratios = [(p[1] - r) / p[0] for p in points]
  best_idx = int(np.argmax(sharpe_ratios))

  best_point = points[best_idx]
  best_weights = weights_list[best_idx]

  weight_dict = {asset: float(best_weights[i]) for i, asset in enumerate(assets)}

  return MarkowitzResponse(
    points=format_points_for_mui(points),
    weights=weight_dict,
    efficient_frontier_x=efficient_frontier_x,
    efficient_frontier_y=efficient_frontier_y,
    expected_return=float(best_point[1]),
    sharpe=float(sharpe_ratios[best_idx]),
    volatility=float(best_point[0])
  )


def rand_weights(n):
  k = np.random.rand(n)
  return k / sum(k)


def get_efficient_frontier(points: list[list[float]]):
  points_arr = np.asarray(points)

  hull = ConvexHull(points_arr)
  hull_pts = points_arr[hull.vertices]

  hull_pts = hull_pts[np.argsort(hull_pts[:, 0])]

  frontier = [hull_pts[0], hull_pts[1]]
  for point in hull_pts[2:]:
    while len(frontier) >= 2:
      x1, y1 = frontier[-2]
      x2, y2 = frontier[-1]
      x3, y3 = point

      slope12 = (y2 - y1) / (x2 - x1)
      slope23 = (y3 - y2) / (x3 - x2)

      if slope23 >= slope12:
        frontier.pop()
      else:
        break
    frontier.append(point)

  frontier = np.asarray(frontier)
  xs = frontier[:, 0]
  ys = frontier[:, 1]

  spline = PchipInterpolator(xs, ys)
  xs_new = np.linspace(xs.min(), xs.max(), 200)
  ys_new = spline(xs_new)

  return xs_new, ys_new


def format_points_for_mui(points: list[list[float]]) -> list[dict[str, float]]:
  return [
    {"x": float(sigma), "y": float(mu)}
    for sigma, mu in points
  ]
