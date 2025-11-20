import { erf } from 'mathjs';

export const blackScholesSimulation = (
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number
) => {
  let d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * Math.sqrt(T));
  let d2 = d1 - sigma * Math.sqrt(T);
  let N_d1 = 0.5 * (1 + erf(d1 / Math.sqrt(2)));
  let N_d2 = 0.5 * (1 + erf(d2 / Math.sqrt(2)));
  return S * N_d1 - K * Math.exp(-r * T) * N_d2;
}