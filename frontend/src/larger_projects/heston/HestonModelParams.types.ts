import { OptionType } from "../../mini_projects/util/common_types.types";

export type HestonModelParams = {
  S: number;
  K: number
  T: number;
  r: number;
  q: number;
  v: number;
  kappa: number;
  theta: number;
  sigma: number;
  rho: number;
  optionType: OptionType;
}
