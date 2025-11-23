import { useState } from "react";
import VariableSlider from "../mini_projects/util/VariableSlider";
import OptionTypeSelector from "../mini_projects/util/OptionTypeSelector";
import OptionStyleSelector from "../mini_projects/util/OptionStyleSelector";
import { OptionStyle, OptionType } from "../mini_projects/util/common_types.types";
import { api } from "../api/Api";
import styles from "./CSS/monte_carlo.module.css";
import { SimulationResult } from "./SimulationResult.types";


const MonteCarloOptions = () => {
  const [numSimulations, setNumSimulations] = useState(1000);
  const [numSteps, setNumSteps] = useState(100);

  const [spot, setSpot] = useState(100);
  const [strike, setStrike] = useState(100);
  const [time, setTime] = useState(1);
  const [rate, setRate] = useState(0.05);
  const [volatility, setVolatility] = useState(0.2);
  const [optionType, setOptionType] = useState<OptionType>("call");
  const [optionStyle, setOptionStyle] = useState<OptionStyle>("european");
  const [dividend, setDividend] = useState(0);

  const [results, setResults] = useState<SimulationResult | null>(null);

  const runSimulation = () => {
    api.post("/monte-carlo/simulate", {
      numSimulations,
      numSteps,
      spot,
      strike,
      time,
      rate,
      volatility,
      optionType,
      optionStyle,
      dividend
    }).then(response => {
      setResults(response.data as SimulationResult);
    }).catch(error => {
      console.error("Error running simulation:", error);
    });
  };

  return (
    <div className={styles["monte-carlo-options-container"]}>
      <h1>Monte Carlo Option Price Simulation</h1>

      <h3>Option Variables</h3>

      <OptionTypeSelector 
        optionType={optionType}
        setOptionType={setOptionType}
      />

      <OptionStyleSelector 
        optionType={optionStyle}
        setOptionType={setOptionStyle}
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

      <h3>Simulation Settings</h3>

      <VariableSlider 
        label="Number of Simulations"
        min={100}
        max={10000}
        step={100}
        value={numSimulations}
        setValue={setNumSimulations}
      />

      <VariableSlider 
        label="Number of Steps per Simulation"
        min={10}
        max={500}
        step={10}
        value={numSteps}
        setValue={setNumSteps}
      />

      <button onClick={() => runSimulation()}>
        Run Simulation
      </button>

    </div>
  )
}

export default MonteCarloOptions;