import { useMemo, useState } from "react";
import styles from "./CSS/RetirementCalculator.module.css";
import { runMonteCarlo, RetirementInputs } from "./retirementMath";

const RetirementCalculator = () => {
  const [inputs, setInputs] = useState<RetirementInputs>({
    currentAge: 30,
    currentPortfolio: 50000,

    targetMonthlyIncome: 3000,

    monthlyContribution: 1000,
    annualContributionIncrease: 0.03,

    expectedAnnualReturn: 0.07,
    annualVolatility: 0.15,

    inflationRate: 0.02,

    safeWithdrawalRate: 0.04,
    maxAge: 90,
  });

  const update = (field: keyof RetirementInputs, value: number) => {
    setInputs((prev: RetirementInputs): RetirementInputs => ({
        ...prev,
        [field]: value,
    }));
  };

  const result = useMemo(() => runMonteCarlo(inputs), [inputs]);

  return (
    <div className={styles["retirement-calculator-container"]}>
      <h1>Financial Freedom When?</h1>

      <h3>Portfolio</h3>

      <input
        type="number"
        placeholder="Current age"
        value={inputs.currentAge}
        onChange={(e) => update("currentAge", Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Current portfolio (€)"
        value={inputs.currentPortfolio}
        onChange={(e) => update("currentPortfolio", Number(e.target.value))}
      />

      <h3>Contributions</h3>

      <input
        type="number"
        placeholder="Monthly contribution"
        value={inputs.monthlyContribution}
        onChange={(e) => update("monthlyContribution", Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Contribution increase (%)"
        value={inputs.annualContributionIncrease * 100}
        onChange={(e) =>
          update("annualContributionIncrease", Number(e.target.value) / 100)
        }
      />

      <h3>Target</h3>

      <input
        type="number"
        placeholder="Target monthly income (today €)"
        value={inputs.targetMonthlyIncome}
        onChange={(e) => update("targetMonthlyIncome", Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Safe withdrawal rate (%)"
        value={inputs.safeWithdrawalRate * 100}
        onChange={(e) =>
          update("safeWithdrawalRate", Number(e.target.value) / 100)
        }
      />

      <h3>Market assumptions</h3>

      <input
        type="number"
        placeholder="Expected return (%)"
        value={inputs.expectedAnnualReturn * 100}
        onChange={(e) =>
          update("expectedAnnualReturn", Number(e.target.value) / 100)
        }
      />

      <input
        type="number"
        placeholder="Volatility (%)"
        value={inputs.annualVolatility * 100}
        onChange={(e) =>
          update("annualVolatility", Number(e.target.value) / 100)
        }
      />

      <input
        type="number"
        placeholder="Inflation (%)"
        value={inputs.inflationRate * 100}
        onChange={(e) =>
          update("inflationRate", Number(e.target.value) / 100)
        }
      />

      <h3>Results</h3>

      <div>
        <p>50% chance: {result.age50 ?? "Not reached"}</p>
        <p>80% chance: {result.age80 ?? "Not reached"}</p>
        <p>90% chance: {result.age90 ?? "Not reached"}</p>
      </div>
    </div>
  );
};

export default RetirementCalculator;