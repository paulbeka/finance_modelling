

export const getYieldFromMarketPriceAndBondMaturity = (
  marketPrice: number,
  faceValue: number,
  couponRate: number,
  maturityYears: number,
  paymentsPerYear: number
): number => {
  if (maturityYears < 0) {
    throw new RangeError("Please choose a maturity above 0.");
  }
  if (paymentsPerYear < 0) {
    throw new RangeError("Payments per year need to be above 0.");
  }

  const maxIterations = 100;
  const tolerance = 1e-6;
  
  let lowerBound = 0;
  let upperBound = 1;
  let yieldEstimate = (lowerBound + upperBound) / 2;
  
  const payment = (couponRate * faceValue) / paymentsPerYear;
  const totalPayments = maturityYears * paymentsPerYear;
  
  for (let i = 0; i < maxIterations; i++) {
    let presentValue = 0;
    for (let t = 1; t <= totalPayments; t++) {
      let cashFlow = payment;
      if (t === totalPayments) {
        cashFlow += faceValue;
      }
      presentValue += cashFlow / Math.pow(1 + yieldEstimate / paymentsPerYear, t);
    }
    if (Math.abs(presentValue - marketPrice) < tolerance) {
      return yieldEstimate;
    }
    if (presentValue > marketPrice) {
      lowerBound = yieldEstimate;
    } else {
      upperBound = yieldEstimate;
    }
    yieldEstimate = (lowerBound + upperBound) / 2;
  }
  
  return yieldEstimate;
}