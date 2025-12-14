import numpy as np

def simulate_heston(S: float, K: float, T: float, r: float, q: float, v: float, 
                    kappa: float, theta: float, sigma: float, rho: float, option_type: str):

  N_STEPS = 252
  N_SIMULATIONS = 10
  theta **= 2
  v **= 2

  dt = T / N_STEPS
  mu = np.array([0, 0])
  cov = np.array([[1, rho], [rho, 1]])

  prices = np.full(shape=(N_STEPS, N_SIMULATIONS), fill_value=S)
  variances = np.full((N_STEPS, N_SIMULATIONS), fill_value=v)

  Z = np.random.multivariate_normal(mu, cov, [N_STEPS, N_SIMULATIONS])
  for i in range(1, N_STEPS):
    prev_v = np.maximum(variances[i-1], 0.0) # Avoid abs() to reduce bias 
    prices[i] = prices[i-1] * np.exp((r - q - 0.5 * prev_v) * dt + np.sqrt(prev_v * dt) * Z[i,:,0])
    variances[i] = np.abs(prev_v + kappa*(theta - prev_v) * dt + sigma * np.sqrt(prev_v * dt) * Z[i,:,1])  
    
  for i in range(N_SIMULATIONS):
    if option_type == "call":
      prices[-1, i] = np.maximum(prices[-1, i] - K, 0)
    else:
      prices[-1, i] = np.maximum(K - prices[-1, i], 0)

  prices[-1] *= np.exp(-r * T)
  
  return { 
    "prices": prices.tolist(), 
    "volatility": variances.tolist() 
  }
