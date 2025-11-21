import { useState } from 'react';
import { blackScholesSimulation, OptionType } from './calc/black_scholes';
import Slider from '@mui/material/Slider';
import styles from './CSS/BlackScholes.module.css';
import OptionGreeks from './OptionGreeks';


const VariableSlider = (props: any) => {
  return (
    <div className={styles["variable-container"]}>
      <label className={styles["variable-label"]}>{props.label}</label>
      <Slider
        size="small"
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={(_, value) => props.setValue(value as number)}
        valueLabelDisplay="auto"
        style={{ flex: 1 }}
      />
      <input
        type="number"
        value={props.value}
        step={props.step}
        onChange={(e) => props.setValue(Number(e.target.value))}
        className={styles["input-field"]}
      />
    </div>
  )
};


const BlackScholesModule = () => {
  const [spot, setSpot] = useState(100);
  const [strike, setStrike] = useState(100);
  const [time, setTime] = useState(1);
  const [rate, setRate] = useState(0.05);
  const [volatility, setVolatility] = useState(0.2);
  const [optionType, setOptionType] = useState<"call" | "put">("call");
  const [dividend, setDividend] = useState(0);

  const price = blackScholesSimulation(
    spot,
    strike,
    time,
    rate,
    volatility,
    optionType,
    dividend
  );

  return (
    <div className={styles["black-scholes-module-container"]}>
      <h3>Black-Scholes Calculator</h3>

      <div className={styles["variable-container"]}>
        <label className={styles["variable-label"]}>Option Type</label>
        <select
          value={optionType}
          onChange={(e) => setOptionType(e.target.value as OptionType)}
          className={styles["input-field"]}
        >
          <option value="call">Call</option>
          <option value="put">Put</option>
        </select>
      </div>

      <div className={styles["variable-container"]}>
        <label className={styles["variable-label"]}>Dividend Yield (q)</label>
        <Slider
          size="small"
          value={dividend}
          min={0}
          max={0.2}
          step={0.001}
          onChange={(_, value) => setDividend(value as number)}
          valueLabelDisplay="auto"
          style={{ flex: 1 }}
        />
        <input
          type="number"
          value={dividend}
          step="0.001"
          onChange={(e) => setDividend(Number(e.target.value))}
          className={styles["input-field"]}
        />
      </div>

      <VariableSlider 
        label="Spot Price"
        value={spot}
        min={0}
        max={300}
        setValue={setSpot}
      />

      <VariableSlider 
        label="Strike Price"
        value={strike}
        min={0}
        max={300}
        setValue={setStrike}
      />

      <VariableSlider 
        label="Time to Maturity (Years)"
        value={time}
        min={0.01}
        max={5}
        step={0.01}
        setValue={setTime}
      />

      <VariableSlider 
        label="Risk-Free Rate"
        value={rate}
        min={0}
        max={0.2}
        step={0.001}
        setValue={setRate}
      />

      <VariableSlider 
        label="Volatility"
        value={volatility}
        min={0.01}
        max={1}
        step={0.01}
        setValue={setVolatility}
      />

      <div className={styles["option-price-container"]}>
        <p>
          Option Price: ${price.toFixed(2)}
        </p>
      </div>

      <OptionGreeks
        spot={spot}
        strike={strike}
        time={time}
        rate={rate}
        volatility={volatility}
        optionType={optionType}
        dividend={dividend}
      />
    </div>
  );
};

export default BlackScholesModule;
