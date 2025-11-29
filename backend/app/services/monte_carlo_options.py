import numpy as np


N_RET_PATHS = 20


def monte_carlo_options_simulator(
  S, K, T, r, q, sigma, simulations, steps, option_type="call", return_paths=False
):
  """
  A function to calculate the MC expected retrun of an option given a singular stock
  """
  dt = T / steps
  discount_factor = np.exp(-r * T)
  paths = np.zeros((simulations, steps + 1))
  paths[:, 0] = S

  for t in range(1, steps + 1):
    z = np.random.standard_normal(simulations // 2)
    z = np.concatenate([z, -z])
    paths[:, t] = paths[:, t - 1] * np.exp(((r-q) - 0.5 * sigma ** 2) * dt + sigma * np.sqrt(dt) * z)
  
  if option_type == "call":
    payoffs = np.maximum(paths[:, -1] - K, 0)
  else:
    payoffs = np.maximum(K - paths[:, -1], 0)
  
  option_price = discount_factor * np.mean(payoffs)

  if return_paths:
    selected_paths = paths[np.random.choice(simulations, size=min(N_RET_PATHS, simulations), replace=False)]
    return {"option_price": option_price, "paths": selected_paths.tolist()}
  return {"option_price": option_price }
  
