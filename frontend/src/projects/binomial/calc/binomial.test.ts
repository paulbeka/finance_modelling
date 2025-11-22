import calculateBinomial from "./binomial";

describe("Binomial Options Pricing", () => {
  test("vanilla call option pricing (standard case)", () => {
    const price = calculateBinomial(100, 100, 1, 0.05, 0.2, 100, "call");
    expect(price).toBeCloseTo(10.45, 1);
  });
  
  test("vanilla put option pricing (standard case)", () => {
    const price = calculateBinomial(100, 100, 1, 0.05, 0.2, 100, "put");
    expect(price).toBeCloseTo(5.57, 1); 
  });

  test("option with very short maturity, so price near intrinsic", () => {
    const T = 0.0001;
    const call = calculateBinomial(105, 100, T, 0.05, 0.2, 10, "call");
    expect(call).toBeCloseTo(5, 1);
    const put = calculateBinomial(95, 100, T, 0.05, 0.2, 10, "put");
    expect(put).toBeCloseTo(5, 1);
  });

  test("negative interest rate should still compute (edge case)", () => {
    const price = calculateBinomial(100, 100, 1, -0.01, 0.2, 100, "call");
    expect(price).toBeGreaterThan(0);
  });

  test("sigma very large (market chaos)", () => {
    const price = calculateBinomial(100, 100, 1, 0.05, 5, 100, "call");
    expect(price).toBeGreaterThan(90);
  });

  test("strike = 0 should return S (call becomes free money)", () => {
    const price = calculateBinomial(100, 0, 1, 0.05, 0.2, 100, "call");
    expect(price).toBeCloseTo(100, 2); 
  });

  test("S = 0 (asset worthless) so call is useless, put = discounted strike", () => {
    const call = calculateBinomial(0, 100, 1, 0.05, 0.2, 100, "call");
    const put  = calculateBinomial(0, 100, 1, 0.05, 0.2, 100, "put");
    expect(call).toBeCloseTo(0, 4);
    expect(put).toBeCloseTo(100 * Math.exp(-0.05), 2);
  });

});