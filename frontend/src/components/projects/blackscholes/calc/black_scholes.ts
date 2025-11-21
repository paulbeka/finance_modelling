import { erf } from 'mathjs';

export type OptionType = "call" | "put";

export const blackScholesSimulation = (
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number,
  type: OptionType,
  q: number = 0
) => {
  const d1 = (Math.log(S / K) + (r - q + 0.5 * (sigma **2)) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);

  const Nd1 = 0.5 * (1 + erf(d1 / Math.sqrt(2)));
  const Nd2 = 0.5 * (1 + erf(d2 / Math.sqrt(2)));
  const N_minus_d1 = 1 - Nd1;
  const N_minus_d2 = 1 - Nd2;

  if (type === "call") {
    return S * Math.exp(-q * T) * Nd1 - K * Math.exp(-r * T) * Nd2;
  }
  return K * Math.exp(-r * T) * N_minus_d2 - S * Math.exp(-q * T) * N_minus_d1;
}

export const blackScholesGreeks = (
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number,
  type: OptionType,
  q: number = 0
) => {
  const d1 = (Math.log(S / K) + (r - q + 0.5 * (sigma **2)) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  const Nd1 = 0.5 * (1 + erf(d1 / Math.sqrt(2)));
  const Nd2 = 0.5 * (1 + erf(d2 / Math.sqrt(2)));
  const n_d1 = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * d1 * d1);
  const N_minus_d1 = 1 - Nd1;
  const N_minus_d2 = 1 - Nd2;
  let delta, gamma, theta, vega, rho;

  if (type === "call") {
    delta = Math.exp(-q * T) * Nd1;
    theta = (- (S * n_d1 * sigma * Math.exp(-q * T)) / (2 * Math.sqrt(T))) - r * K * Math.exp(-r * T) * Nd2 + q * S * Math.exp(-q * T) * Nd1;
    rho = K * T * Math.exp(-r * T) * Nd2;
  } else {
    delta = Math.exp(-q * T) * (Nd1 - 1);
    theta = (- (S * n_d1 * sigma * Math.exp(-q * T)) / (2 * Math.sqrt(T))) + r * K * Math.exp(-r * T) * N_minus_d2 - q * S * Math.exp(-q * T) * N_minus_d1;
    rho = -K * T * Math.exp(-r * T) * N_minus_d2;
  }
  gamma = (n_d1 * Math.exp(-q * T)) / (S * sigma * Math.sqrt(T));
  vega = S * Math.exp(-q * T) * n_d1 * Math.sqrt(T);
  return { delta, gamma, theta, vega, rho };
}
