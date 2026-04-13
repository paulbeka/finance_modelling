type RetirementInputs = {
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