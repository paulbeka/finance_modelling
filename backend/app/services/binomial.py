import numpy as np
import math


def simulate_binomial(
  S, K, T, r, sigma, q, steps, option_type, option_style, lattice_type 
):
  # TODO : NOW MAKE IT WORK FOR DIFFERENT OPTION STYLES (AMERICAN, EUROPEAN, ASIAN, BARRIER)
  dt = T/steps

  u, d, p = get_lattice_parameters(dt, r, sigma, q, lattice_type)

  discount_factor = np.exp(-(r+q) * dt)

  C = S * d ** (np.arange(steps, -1, -1)) * u ** (np.arange(0, steps+1, 1))
  if option_type == "call":
    C = np.maximum(np.zeros(steps+1), C-K)
  elif option_type == "put":
    C = np.maximum(np.zeros(steps+1), K-C)
  else:
    raise ValueError("Value should only be a call or a put.")

  for i in range(steps, 0, -1):
    if option_style == "european":
      C = discount_factor * ( (C[1:i+1] * p) + (C[0:i] * (1-p)) )
    elif option_style == "american":
      S_prices = S * (d ** np.arange(i-1, -1, -1)) * (u ** np.arange(0, i))
      new_C = discount_factor * (p * C[1:i+1] + (1 - p) * C[0:i])
      C = new_C 
      if option_type == "put":
        C = np.maximum(C, K - S_prices)
      else:
        C = np.maximum(C, S_prices - K)

  binomial_price = C[0]

  return { "binomial_price" : binomial_price }
  

def get_lattice_parameters(dt, r, sigma, q, lattice_type):
  if lattice_type == "CRR":
    u = math.exp(sigma * math.sqrt(dt))
    d = 1 / u
    p = (math.exp((r-q) * dt) - d) / (u - d)

  elif lattice_type == "JR":
    u = math.exp(((r-q) - 0.5 * sigma**2) * dt + sigma * math.sqrt(dt))
    d = math.exp(((r-q) - 0.5 * sigma**2) * dt - sigma * math.sqrt(dt))
    p = 0.5

  elif lattice_type == "TIAN":
    a = math.exp((r-q) * dt)
    b = math.exp((sigma**2) * dt)
    u = 0.5 * a * b * (b + 1 + math.sqrt(b**2 + 2*b - 3))
    d = 0.5 * a * b * (b + 1 - math.sqrt(b**2 + 2*b - 3))
    p = (a - d) / (u - d)

  elif lattice_type == "TRG":
    u = math.exp(sigma * math.sqrt(dt) + ((r-q) - 0.5 * sigma*sigma) * dt)
    d = math.exp(-sigma * math.sqrt(dt) + ((r-q) - 0.5 * sigma*sigma) * dt)
    p = 0.5

  else:
    u = math.exp(sigma * math.sqrt(dt))
    d = 1 / u
    p = (math.exp((r-q) * dt) - d) / (u - d)

  return u, d, p

