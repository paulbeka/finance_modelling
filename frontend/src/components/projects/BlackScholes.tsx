import { useState, useEffect } from 'react';
import { blackScholesSimulation, OptionType } from '../../simulations/black_scholes';
import Slider from '@mui/material/Slider';
import '../projects/CSS/Project.css';


const VariableSlider = (props: any) => {
  return (
    <div className="variable-container">
      <label className="variable-label">{props.label}</label>
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
        className="input-field"
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
    <div className="black-scholes-module-container">
      <h3>Black-Scholes Calculator</h3>

      <div className="variable-container">
        <label className="variable-label">Option Type</label>
        <select
          value={optionType}
          onChange={(e) => setOptionType(e.target.value as OptionType)}
          className="input-field"
        >
          <option value="call">Call</option>
          <option value="put">Put</option>
        </select>
      </div>

      <div className="variable-container">
        <label className="variable-label">Dividend Yield (q)</label>
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
          className="input-field"
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

      <h4 style={{ marginTop: '30px' }}>
        Option Price: <span style={{ fontSize: '1rem' }}>$ {price.toFixed(2)}</span>
      </h4>
    </div>
  );
};

export default BlackScholesModule;
