import { OptionType } from "../../mini_projects/util/common_types.types";

export type HestonModelParams = {
  spot: number;
  strike: number
  time: number;
  risk_free_rate: number;
  dividends: number;
  initial_variance: number;
  kappa: number;
  theta: number;
  sigma: number;
  rho: number;
  option_type: OptionType;
}

export type HestonModelResponse = {
  prices: number[][];
  variances: number[][];
  final_option_price: number;
}
