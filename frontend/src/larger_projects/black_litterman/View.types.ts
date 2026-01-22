export type AbsoluteView = {
  type: "absolute";
  asset: string;
  expectedReturn: number;
  cofidence: number;
}

export type RelativeView = {
  type: "relative";
  outperformingAsset: string;
  underperformingAsset: string;
  expectedReturnDifference: number;
  confidence: number;
}