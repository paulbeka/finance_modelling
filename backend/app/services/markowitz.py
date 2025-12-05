import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from .util.asset_utils import get_historical_tick_data


N_PORTFOLIOS = 500


def simulate_markowitz_optimization(assets: list[str], timeframe: float, r: float):
  asset_prices = get_historical_tick_data(assets, timeframe)

  returns = asset_prices.pct_change().dropna()
  mean_returns = returns.mean().values
  cov_matrix = returns.cov().values
    
  means, stds = np.column_stack([simulate_portfolio(mean_returns, cov_matrix) for _ in range(N_PORTFOLIOS)])
  # plt.figure(figsize=(12,8))
  # plt.scatter(stds, means, cmap='viridis')
  # plt.colorbar(label='Sharpe Ratio')
  # plt.xlabel('Volatility')
  # plt.ylabel('Return')
  # plt.savefig('cover.png')
  # plt.show()

  return None
  

def simulate_portfolio(p, c):
  w = rand_weights(p.shape[0])
  mu = np.dot(w, p)
  sigma = np.sqrt(w @ c @ w.T)
  return mu, sigma


def rand_weights(n):
    k = np.random.rand(n)
    return k / sum(k)
  

