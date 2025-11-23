import { blackScholesSimulation } from "./black_scholes";

describe("Black-Scholes Options Pricing", () => {
  test("vanilla call option pricing (standard case)", () => {
    const price = blackScholesSimulation(100, 100, 1, 0.05, 0.2, "call", 0);
    expect(price).toBeCloseTo(10.4506, 4);
  });

  test("vanilla put option pricing (standard case)", () => {
    const price = blackScholesSimulation(100, 100, 1, 0.05, 0.2, "put", 0);
    expect(price).toBeCloseTo(5.5735, 4); 
  });

  test("option with very short maturity, so price near intrinsic", () => {
    const T = 0.0001;
    const call = blackScholesSimulation(105, 100, T, 0.05, 0.2, "call", 0);
    expect(call).toBeCloseTo(5, 1);

    const put = blackScholesSimulation(95, 100, T, 0.05, 0.2, "put", 0);
    expect(put).toBeCloseTo(5, 1);
  });

  test("negative interest rate should still compute (edge case)", () => {
    const price = blackScholesSimulation(100, 100, 1, -0.01, 0.2, "call", 0);
    expect(price).toBeGreaterThan(0);
  });

  test("sigma very large (market chaos )", () => {
    const price = blackScholesSimulation(100, 100, 1, 0.05, 5, "call", 0);
    expect(price).toBeGreaterThan(90);
  });

  test("strike = 0 should return S (call becomes free money)", () => {
    const price = blackScholesSimulation(100, 0, 1, 0.05, 0.2, "call", 0);
    expect(price).toBeCloseTo(100, 2); 
  });

  test("S = 0 (asset worthless) so call is useless, put = discounted strike", () => {
    const call = blackScholesSimulation(0, 100, 1, 0.05, 0.2, "call", 0);
    const put  = blackScholesSimulation(0, 100, 1, 0.05, 0.2, "put", 0);

    expect(call).toBeCloseTo(0, 4);
    expect(put).toBeCloseTo(100 * Math.exp(-0.05), 2);
  });
});
