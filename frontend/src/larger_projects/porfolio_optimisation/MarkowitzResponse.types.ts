export type MarkowitzResponse = {
  points: number[][];
  weights: {[key: string]: number}
  efficient_frontier: number[][]
  expected_return: number;
  sharpe: number;
  volatility: number;
}
