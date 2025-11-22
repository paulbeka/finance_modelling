export type OptionType = "call" | "put";

export const BINOMIAL_LATTICE_TYPES = ["CRR", "JR", "TIAN", "TRG"] as const;

export type BinomialLatticeType = typeof BINOMIAL_LATTICE_TYPES[number];
