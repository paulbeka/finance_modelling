import { OptionType, BinomialLatticeType } from "../../util/common_types.types";

const calculateBinomial = (
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number,
  steps: number,
  optionType: OptionType,
  latticeType: BinomialLatticeType = "CRR"
): number => {
  const dt = T / steps;

  const {u, d, p} = getLatticeParameters(dt, r, sigma, latticeType);
  const discountFactor = Math.exp(-r * dt);

  const assetPrices = new Float64Array(steps + 1);
  const optionValues = new Float64Array(steps + 1);

  for (let i = 0; i <= steps; i++) {
    assetPrices[i] = S * Math.pow(u, steps - i) * Math.pow(d, i);
  }

  for (let i = 0; i <= steps; i++) {
    optionValues[i] =
      optionType === "call"
        ? Math.max(0, assetPrices[i] - K)
        : Math.max(0, K - assetPrices[i]);
  }

  for (let step = steps - 1; step >= 0; step--) {
    for (let i = 0; i <= step; i++) {
      optionValues[i] =
        discountFactor * (p * optionValues[i] + (1 - p) * optionValues[i + 1]);
    }
  }

  return optionValues[0];
};

const getLatticeParameters = (
  dt: number,
  r: number,
  sigma: number,
  latticeType: BinomialLatticeType
): { u: number; d: number; p: number } => {
  let u: number, d: number, p: number;
  switch (latticeType) {
    case "CRR":
      u = Math.exp(sigma * Math.sqrt(dt));
      d = 1 / u;
      p = (Math.exp(r * dt) - d) / (u - d);
      break;
    case "JR":
      u = Math.exp((r - 0.5 * sigma ** 2) * dt + (sigma * Math.sqrt(dt)));
      d = Math.exp((r - 0.5 * sigma ** 2) * dt - (sigma * Math.sqrt(dt)));
      p = 0.5;
      break;
    case "TIAN":
      const a = Math.exp(r * dt);
      const b = Math.exp(sigma * Math.sqrt(dt));
      u = 0.5 * a * b * (b + 1 + Math.sqrt(b * b + 2 * b - 3));
      d = 0.5 * a * b * (b + 1 - Math.sqrt(b * b + 2 * b - 3));
      p = (a - d) / (u - d);
      break;  
    case "TRG":
      u = Math.exp(sigma * Math.sqrt(dt) + (r - 0.5 * sigma * sigma) * dt);
      d = Math.exp(-sigma * Math.sqrt(dt) + (r - 0.5 * sigma * sigma) * dt);
      p = 0.5;
      break;
    default:
      u = Math.exp(sigma * Math.sqrt(dt));
      d = 1 / u;
      p = (Math.exp(r * dt) - d) / (u - d);
      break;
  }
  return { u, d, p };
}

export default calculateBinomial;
