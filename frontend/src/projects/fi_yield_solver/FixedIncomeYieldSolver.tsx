import { useState } from "react";
import { getYieldFromMarketPriceAndBondMaturity } from "./calc/fixed_income";
import VariableSlider from "../util/VariableSlider";
import './CSS/FixedIncomeYieldSolver.css';


const FixedIncomeYieldSolver = () => {

  const [marketPrice, setMarketPrice] = useState<number>(950);
  const [faceValue, setFaceValue] = useState<number>(1000);
  const [couponRate, setCouponRate] = useState<number>(0.05);
  const [maturityYears, setMaturityYears] = useState<number>(10);
  const [paymentsPerYear, setPaymentsPerYear] = useState<number>(2);

  const calculatedYield = getYieldFromMarketPriceAndBondMaturity(
    marketPrice,
    faceValue,
    couponRate,
    maturityYears,
    paymentsPerYear
  );

  return (
    <div className="fixed-income-yield-solver-container">
      <h3>Fixed-Income Yield Solver</h3>

      <VariableSlider
        label="Market Price"
        value={marketPrice}
        min={500}
        max={1500}
        step={1}
        setValue={setMarketPrice}
      />

      <VariableSlider
        label="Face Value"
        value={faceValue}
        min={500}
        max={1500}
        step={1}
        setValue={setFaceValue}
      />

      <VariableSlider
        label="Coupon Rate"
        min={0}
        max={0.2}
        step={0.001}
        value={couponRate}
        setValue={setCouponRate}
      />

      <VariableSlider
        label="Maturity (Years)"
        min={1}
        max={30}
        step={1}
        value={maturityYears}
        setValue={setMaturityYears}
      />

      <VariableSlider
        label="Payments Per Year"
        min={1}
        max={12}
        step={1}
        value={paymentsPerYear}
        setValue={setPaymentsPerYear}
      />

      <h3>Calculated Yield: {(calculatedYield * 100).toFixed(4)}%</h3>
      
    </div>
  )
}

export default FixedIncomeYieldSolver;