import { useState } from 'react';
import { OptionType } from '../util/common_types.types';
import { blackScholesSimulation } from './calc/black_scholes';
import styles from './CSS/BlackScholes.module.css';
import OptionGreeks from './OptionGreeks';
import VariableSlider from '../util/VariableSlider';
import OptionTypeSelector from '../util/OptionTypeSelector';

const BlackScholesModule = () => {
  const [spot, setSpot] = useState(100);
  const [strike, setStrike] = useState(100);
  const [time, setTime] = useState(1);
  const [rate, setRate] = useState(0.05);
  const [volatility, setVolatility] = useState(0.2);
  const [optionType, setOptionType] = useState<OptionType>("call");
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

      <OptionTypeSelector 
        optionType={optionType}
        setOptionType={setOptionType}
      />

      <VariableSlider 
        label="Dividend Yield (q)"
        value={dividend}
        min={0}
        max={0.2}
        step={0.001}
        setValue={setDividend}
      />

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
