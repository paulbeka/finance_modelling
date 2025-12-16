import numpy as np

N_RET_PATHS = 20

def simulate_heston(
    S: float, K: float, T: float, r: float, q: float, v: float,
    kappa: float, theta: float, sigma: float, rho: float, option_type: str
):
	N_STEPS = 252
	N_SIMULATIONS = 5000

	dt = T / N_STEPS
	mu = np.array([0.0, 0.0])
	cov = np.array([[1.0, rho], [rho, 1.0]])

	prices = np.full((N_STEPS, N_SIMULATIONS), S, dtype=float)
	variances = np.full((N_STEPS, N_SIMULATIONS), v, dtype=float)

	Z = np.random.multivariate_normal(mu, cov, size=(N_STEPS, N_SIMULATIONS))

	for i in range(1, N_STEPS):
		v_prev = variances[i - 1]
		v_pos = np.maximum(v_prev, 0.0)

		prices[i] = prices[i - 1] * np.exp(
			(r - q - 0.5 * v_pos) * dt + np.sqrt(v_pos * dt) * Z[i, :, 0]
		)

		variances[i] = v_prev + kappa * (theta - v_pos) * dt + sigma * np.sqrt(v_pos * dt) * Z[i, :, 1]

	ST = prices[-1]
	if option_type == "call":
		payoffs = np.maximum(ST - K, 0.0)
	else:
		payoffs = np.maximum(K - ST, 0.0)

	discounted_payoffs = np.exp(-r * T) * payoffs
	option_price = float(np.mean(discounted_payoffs))

	m = min(N_RET_PATHS, N_SIMULATIONS)
	idx = np.random.choice(N_SIMULATIONS, size=m, replace=False)

	selected_prices = prices[:, idx]
	selected_variances = variances[:, idx]

	return {
		"prices": selected_prices.T.tolist(),
		"variances": selected_variances.T.tolist(),
		"final_option_price": option_price
	}
