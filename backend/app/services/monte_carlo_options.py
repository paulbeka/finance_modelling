import numpy as np


N_RET_PATHS = 20


def monte_carlo_options_simulator(
  S, K, T, r, sigma, simulations, steps, option_type="call", option_style="european",
  return_paths=False
):
  """
  A function to calculate the MC expected retrun of an option given a singular stock
  """
  dt = T / steps
  discount_factor = np.exp(-r * T)
  paths = np.zeros((simulations, steps + 1))
  paths[:, 0] = S

  for t in range(1, steps + 1):
    z = np.random.standard_normal(simulations)
    paths[:, t] = paths[:, t - 1] * np.exp((r - 0.5 * sigma ** 2) * dt + sigma * np.sqrt(dt) * z)
  
  if option_style == "european":
    if option_type == "call":
      payoffs = np.maximum(paths[:, -1] - K, 0)
    else:
      payoffs = np.maximum(K - paths[:, -1], 0)
  else:
    payoffs = np.zeros(simulations)
  
  options_price = discount_factor * np.mean(payoffs)

  if return_paths:
    selected_paths = paths[np.random.choice(simulations, size=min(N_RET_PATHS, simulations), replace=False)]
    return {"options_price": options_price, "paths": selected_paths.tolist()}
  return {"options_price": options_price }

def monte_carlo_portfolio_options_simulator(
    
):
  """
  """
  pass