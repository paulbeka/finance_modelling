import { useState } from "react";
import styles from "./CSS/BinomialModel.module.css";
import { BinomialLatticeType, OptionType } from "../util/common_types.types";
import OptionTypeSelector from "../util/OptionTypeSelector";
import VariableSlider from "../util/VariableSlider";
import DropDownLatticeSelector from "../util/DropDownLatticeSelector";
import calculateBinomial from "./calc/binomial";
import { blackScholesSimulation } from "../blackscholes/calc/black_scholes";
import { isMobile } from "react-device-detect";

const BinomialModule = () => {
  const [steps, setSteps] = useState<number>(10);
  const [spot, setSpot] = useState(100);
  const [strike, setStrike] = useState(100);
  const [time, setTime] = useState(1);
  const [rate, setRate] = useState(0.05);
  const [volatility, setVolatility] = useState(0.2);
  const [optionType, setOptionType] = useState<OptionType>("call");
  const [latticeType, setLatticeType] = useState<BinomialLatticeType>("CRR");

  const binomialEstimation = calculateBinomial(
    spot,
    strike,
    time,
    rate,
    volatility,
    steps,
    optionType,
    latticeType
  ); 

  const blackScholesPrice = blackScholesSimulation(
    spot,
    strike,
    time,
    rate,
    volatility,
    optionType
  );

  return (
    <div className={styles["binomial-module-container"]}>
      <h3>European Option Binomial Model Calculator (Slow)</h3>
      
      <OptionTypeSelector
        optionType={optionType}
        setOptionType={setOptionType}
      />

      <DropDownLatticeSelector 
        latticeType={latticeType}
        setLatticeType={setLatticeType}
      />

      <VariableSlider
        label="Number of Steps"
        min={1}
        max={50}
        step={1}
        value={steps}
        setValue={setSteps}
      />

      <VariableSlider
        label="Stock Price"
        min={10}
        max={300}
        step={1}
        value={spot}
        setValue={setSpot}
      />

      <VariableSlider
        label="Strike Price"
        min={10}
        max={300}
        step={1}
        value={strike}
        setValue={setStrike}
      />

      <VariableSlider
        label="Time to Maturity (Years)"
        min={0.1}
        max={5}
        step={0.1}
        value={time}
        setValue={setTime}
      />

      <VariableSlider
        label="Risk-Free Rate (%)"
        min={0}
        max={0.2}
        step={0.001}
        value={rate}
        setValue={setRate}
      />

      <VariableSlider
        label="Volatility (%)"
        min={0.1}
        max={1}
        step={0.01}
        value={volatility}
        setValue={setVolatility}
      />

      <div className={isMobile ? styles["mobile-option-price-container"] : styles["option-price-container"]}>
        <div className={styles["option-price-item"]}>
          <p style={{ marginTop: "5px" }}>Binomial Price Estimation:</p> 
          <div className={styles["option-price-item-price"]}>
            ${binomialEstimation.toFixed(2)}
          </div>
        </div>
        <div className={styles["option-price-item"]}>
          <p style={{ marginTop: "5px" }}>Black Scholes Price:</p>
          <div className={styles["option-price-item-price"]}>
            ${blackScholesPrice.toFixed(2)}
          </div>
        </div>
        <div className={styles["option-price-item"]}>
          <p style={{ marginTop: "5px" }}>Difference:</p> 
          <div className={styles["option-price-item-price"]}>
            ${(Math.abs(binomialEstimation - blackScholesPrice)).toFixed(4)}
          </div>
        </div>
      </div>

    </div>
  )
}

export default BinomialModule;