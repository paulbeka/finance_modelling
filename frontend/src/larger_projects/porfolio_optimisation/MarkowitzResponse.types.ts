export type MarkowitzResponse = {
  points: {[key: string]: number}[];
  weights: {[key: string]: number}
  efficient_frontier: number[][]
  expected_return: number;
  sharpe: number;
  volatility: number;
}
