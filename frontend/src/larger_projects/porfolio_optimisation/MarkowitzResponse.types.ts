export type MarkowitzResponse = {
  points: { x: number; y: number }[];
  frontier: {[key: string]: number}[];
  weights: {[key: string]: number};
  efficient_frontier_x: number[];
  efficient_frontier_y: number[];
  expected_return: number;
  sharpe: number;
  volatility: number;
}
