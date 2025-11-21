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