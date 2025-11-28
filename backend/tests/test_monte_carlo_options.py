import numpy as np

from app.services.monte_carlo_options import monte_carlo_options_simulator


np.random.seed(0)


def test_returns_option_price_only():
    result = monte_carlo_options_simulator(
        S=100, K=100, T=1, r=0.05, sigma=0.2, q=0,
        simulations=1000, steps=10, option_type="call",
        return_paths=False
    )

    assert "option_price" in result
    assert isinstance(result["option_price"], float)


def test_returns_paths_when_enabled():
    result = monte_carlo_options_simulator(
        S=100, K=100, T=1, r=0.05, sigma=0.2, q=0,
        simulations=200, steps=5, option_type="call",
        return_paths=True
    )

    assert "option_price" in result
    assert "paths" in result
    assert isinstance(result["paths"], list)
    assert len(result["paths"]) <= 20 
    assert len(result["paths"][0]) == 6 


def test_put_option_gives_higher_value_with_lower_stock_price():
    price_high_S = monte_carlo_options_simulator(
        S=120, K=100, T=1, r=0.05, sigma=0.2, q=0,
        simulations=2000, steps=30, option_type="put"
    )["option_price"]

    price_low_S = monte_carlo_options_simulator(
        S=80, K=100, T=1, r=0.05, sigma=0.2, q=0,
        simulations=2000, steps=30, option_type="put"
    )["option_price"]

    assert price_low_S > price_high_S


def test_call_option_with_dividends_is_correct():
    mc_price_with_dividends = monte_carlo_options_simulator(
        S=100, K=100, T=1, r=0.05, sigma=0.2, q=0.1,
        simulations=2000, steps=100, option_type="call"
    )["option_price"]
    actual_price = 5.30
    assert abs(actual_price - mc_price_with_dividends) <= 0.3


def test_put_option_with_dividends_is_correct():
    mc_price_with_dividends = monte_carlo_options_simulator(
        S=100, K=100, T=1, r=0.05, sigma=0.2, q=0.1,
        simulations=2000, steps=100, option_type="put"
    )["option_price"]
    actual_price = 9.94
    assert abs(actual_price - mc_price_with_dividends) <= 0.3


def test_option_price_non_negative():
    result = monte_carlo_options_simulator(
        S=100, K=100, T=1, r=0.05, sigma=0.2, q=0,
        simulations=1000, steps=10
    )["option_price"]


    assert result >= 0
