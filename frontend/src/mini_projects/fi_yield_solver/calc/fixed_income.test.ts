import { getYieldFromMarketPriceAndBondMaturity } from "./fixed_income";

type YieldTestItem = {
  price: number;
  par: number;
  coupon: number;
  maturity: number;
  payments: number;
  expected: number;
}

describe("test the fixed income yield solver calculation", () => {
  test("test yield is correct for some pre-defined parameters", () => {
    const testParameters: YieldTestItem[] = [
      {"price": 1000, "par": 1000, coupon: 0.05, maturity: 10, payments: 2, expected: 0.050000 },
      {"price": 500, "par": 1500, coupon: 0.1, maturity: 5, payments: 4, expected: 0.428704 },
      {"price": 1000, "par": 900, coupon: 0.02, maturity: 15, payments: 2, expected: 0.011890 }, 
    ];

    testParameters.forEach((testItem: YieldTestItem) => {
      const result = getYieldFromMarketPriceAndBondMaturity(
        testItem["price"], testItem["par"], testItem["coupon"], testItem["maturity"], testItem["payments"]
      )
      expect(result).toBeCloseTo(testItem["expected"]);
    });
  });

  test("test yield is rejected for non-valid parameters", () => {
    const testParameters: YieldTestItem[] = [
      {"price": 1000, "par": 1000, coupon: 0.05, maturity: 10, payments: -2, expected: 0 },
      {"price": 500, "par": 1500, coupon: 0.1, maturity: -5, payments: 4, expected: 0 }
    ];

    testParameters.forEach((testItem: YieldTestItem) => {
      expect(() => getYieldFromMarketPriceAndBondMaturity(
        testItem["price"], testItem["par"], testItem["coupon"], testItem["maturity"], testItem["payments"]
      )).toThrowError();

    });
  });
});