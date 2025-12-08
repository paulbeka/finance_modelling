import numpy as np
import pandas as pd
import pytest
from unittest.mock import patch

from app.services.markowitz import (
  get_efficient_frontier,
  simulate_markowitz_optimization,
)

np.random.seed(0)


@pytest.fixture
def fake_price_data():
  dates = pd.date_range("2020-01-01", periods=600)
  return pd.DataFrame({
    "S&P": np.linspace(100, 200, 600),
    "NASDAQ": np.linspace(50, 120, 600),
    "STOXX": np.linspace(80, 90, 600),
  }, index=dates)


def test_get_efficient_frontier_basic():
  points = [
    [0.1, 0.05],
    [0.2, 0.10],
    [0.35, 0.12],
  ]
  xs, ys = get_efficient_frontier(points)
  assert len(xs) == len(ys)
  assert np.all(np.diff(xs) >= 0)


@patch("app.services.markowitz.get_historical_tick_data")
def test_optimize_portfolio_basic(mock_get_data, fake_price_data):
  mock_get_data.return_value = fake_price_data
  result = simulate_markowitz_optimization(["S&P", "NASDAQ", "STOXX"], 1.0, 0.02)
  assert isinstance(result.points, list)
  assert isinstance(result.weights, dict)
  assert len(result.weights) == 3
  assert np.isclose(sum(result.weights.values()), 1.0, atol=1e-6)
  assert len(result.efficient_frontier_x) == 200
  assert len(result.efficient_frontier_y) == 200
  assert result.expected_return is not None
  assert result.volatility >= 0
  assert isinstance(result.sharpe, float)


@patch("app.services.markowitz.get_historical_tick_data")
def test_optimize_portfolio_zero_variance(mock_get_data):
  dates = pd.date_range("2020-01-01", periods=600)
  df = pd.DataFrame({"S&P": np.ones(600)}, index=dates)
  mock_get_data.return_value = df
  with pytest.raises(ValueError):
      simulate_markowitz_optimization(["S&P"], 1.0, 0.02)


@patch("app.services.markowitz.get_historical_tick_data")
def test_optimize_portfolio_num_points(mock_get_data, fake_price_data):
  mock_get_data.return_value = fake_price_data
  result = simulate_markowitz_optimization(["S&P", "NASDAQ", "STOXX"], 1.0, 0.0)
  assert len(result.points) == 500
