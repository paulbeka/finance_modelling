export type RetirementInputs = {
  currentAge: number;
  currentPortfolio: number;

  targetMonthlyIncome: number;

  monthlyContribution: number;
  annualContributionIncrease: number;

  expectedAnnualReturn: number;
  annualVolatility: number;

  inflationRate: number;

  safeWithdrawalRate: number;
  maxAge: number;
};

interface SuccessResult {
    age: number;
    successProbability: number;
}

function randomNormal(mean: number, stdDev: number): number {
  let u = 0;
  let v = 0;

  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();

  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + z * stdDev;
}

export function runMonteCarlo(inputs: RetirementInputs) {
  const SIMULATIONS = 500; // keep reasonable for UI

  const years = inputs.maxAge - inputs.currentAge + 1;
  const allSimulations: number[][] = [];

  for (let i = 0; i < SIMULATIONS; i++) {
    let portfolio = inputs.currentPortfolio;
    const path: number[] = [];

    for (let y = 0; y < years; y++) {
      const annualContribution =
        inputs.monthlyContribution *
        12 *
        Math.pow(1 + inputs.annualContributionIncrease, y);

      const r = randomNormal(
        inputs.expectedAnnualReturn,
        inputs.annualVolatility
      );

      portfolio =
        (portfolio + annualContribution / 2) * (1 + r) +
        annualContribution / 2;

      path.push(Math.max(0, portfolio));
    }

    allSimulations.push(path);
  }

  const results: SuccessResult[] = [];

  for (let y = 0; y < years; y++) {
    const age = inputs.currentAge + y;

    const incomeFuture =
      inputs.targetMonthlyIncome *
      Math.pow(1 + inputs.inflationRate, y);

    const requiredPortfolio =
      (incomeFuture * 12) / inputs.safeWithdrawalRate;

    const values = allSimulations.map((sim) => sim[y]);

    const success =
      values.filter((v) => v >= requiredPortfolio).length / SIMULATIONS;

    results.push({
      age,
      successProbability: success,
    });
  }

  const findAge = (threshold: number) =>
    results.find((r) => r.successProbability >= threshold)?.age;

  return {
    results,
    age50: findAge(0.5),
    age80: findAge(0.8),
    age90: findAge(0.9),
  };
}