export type OptionType = "call" | "put";

export const OPTION_STYLES = ["european", "american"] as const;

export type OptionStyle = typeof OPTION_STYLES[number];

export const BINOMIAL_LATTICE_TYPES = ["CRR", "JR", "TIAN", "TRG"] as const;

export type BinomialLatticeType = typeof BINOMIAL_LATTICE_TYPES[number];
