import { useState } from "react";
import styles from "./CSS/BinomialModel.module.css";
import { OptionType } from "../util/common_types.types";
import OptionTypeSelector from "../util/OptionTypeSelector";
import VariableSlider from "../util/VariableSlider";
import calculateBinomial from "./calc/binomial";

const BinomialModule = () => {
  const [steps, setSteps] = useState<number>(10);
  const [spot, setSpot] = useState(100);
  const [strike, setStrike] = useState(100);
  const [time, setTime] = useState(1);
  const [rate, setRate] = useState(0.05);
  const [volatility, setVolatility] = useState(0.2);
  const [optionType, setOptionType] = useState<OptionType>("call");


  const binomialEstimation = calculateBinomial(
    spot,
    strike,
    time,
    rate,
    volatility,
    steps,
    optionType
  ); 

  return (
    <div className={styles["binomial-module-container"]}>
      <h3>Binomial Model Calculator</h3>
      
      <OptionTypeSelector
        optionType={optionType}
        setOptionType={setOptionType}
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

      <div className={styles["option-price-container"]}>
        <p>
          Option Price: ${binomialEstimation.toFixed(2)}
        </p>
      </div>

    </div>
  )
}

export default BinomialModule;