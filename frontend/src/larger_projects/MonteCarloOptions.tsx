import { useState } from "react";
import VariableSlider from "../mini_projects/util/VariableSlider";
import OptionTypeSelector from "../mini_projects/util/OptionTypeSelector";
import OptionStyleSelector from "../mini_projects/util/OptionStyleSelector";
import { OptionStyle, OptionType } from "../mini_projects/util/common_types.types";
import { api } from "../api/Api";
import styles from "./CSS/monte_carlo.module.css";
import { SimulationResult } from "./SimulationResult.types";
import { blackScholesSimulation } from "../mini_projects/blackscholes/calc/black_scholes";
import { Switch } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import MonteCarloChartDisplay from "./MonteCarloChartDisplay";
import { Mosaic } from "react-loading-indicators";
import Button from '@mui/material/Button';


const MonteCarloOptions = () => {
  const [num_simulations, setNumSimulations] = useState(1000);
  const [num_steps, setNumSteps] = useState(100);

  const [spot, setSpot] = useState(100);
  const [strike, setStrike] = useState(100);
  const [time, setTime] = useState(1);
  const [risk_free_rate, setRate] = useState(0.05);
  const [sigma, setSigma] = useState(0.2);
  const [dividends, setDividends] = useState(0);
  const [option_type, setOptionType] = useState<OptionType>("call");
  const [option_style, setOptionStyle] = useState<OptionStyle>("european");
  const [return_paths, setReturnPaths] = useState<boolean>(true);

  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const runSimulation = () => {
    setLoading(true);
    api.post("/monte-carlo-options/single-option", {
      spot,
      strike,
      time,
      risk_free_rate,
      sigma,
      dividends,
      num_simulations,
      num_steps,
      option_type,
      option_style,
      return_paths
    }).then(response => {
      setLoading(false);
      setResult(response.data as SimulationResult);
    }).catch(error => {
      console.error("Error running simulation:", error);
    });
  };

  const blackScholesPrice = blackScholesSimulation(spot, strike, time, risk_free_rate, sigma, option_type, dividends);

  return (
    <div className={styles["monte-carlo-options-container"]}>
      <h1>Monte Carlo Option Price Simulation</h1>

      <h3>Option Variables</h3>

      <OptionTypeSelector 
        optionType={option_type}
        setOptionType={setOptionType}
      />

      <OptionStyleSelector 
        optionType={option_style}
        setOptionType={setOptionStyle}
      />

      <VariableSlider 
        label="Dividend Yield (q)"
        value={dividends}
        min={0}
        max={0.2}
        step={0.001}
        setValue={setDividends}
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
        value={risk_free_rate}
        min={0}
        max={0.2}
        step={0.001}
        setValue={setRate}
      />

      <VariableSlider 
        label="Volatility"
        value={sigma}
        min={0.01}
        max={1}
        step={0.01}
        setValue={setSigma}
      />

      <h3>Simulation Settings</h3>

      <VariableSlider 
        label="Number of Simulations"
        min={100}
        max={10000}
        step={100}
        value={num_simulations}
        setValue={setNumSimulations}
      />

      <VariableSlider 
        label="Number of Steps per Simulation"
        min={10}
        max={1000}
        step={10}
        value={num_steps}
        setValue={setNumSteps}
      />

      <div className={styles["run-simulation-container"]}>
        <FormControlLabel control={<Switch onChange={() => setReturnPaths(!return_paths)} defaultChecked={return_paths}  />} label="Show Graph Output" />

        <Button variant="contained" onClick={() => runSimulation()}>
          Run Simulation
        </Button>
      </div>

      <div className={styles["output-container"]}>
        <div className={styles["output-box-container"]}>
          Monte Carlo Option Price Estimate: 
          <div className={styles["output-box"]}>
            {result ? (
              <>
                ${result.option_price.toFixed(2)}{" "}
                <span style={{ fontWeight: "normal" }}>
                  (difference of ${(Number(result.option_price.toFixed(2)) - Number(blackScholesPrice.toFixed(2))).toFixed(2)})
                </span>
              </>
            ) : (
              <i style={{ fontWeight: "normal" }}>Run Simulation First</i>
            )}
          </div>
        </div>
        <div className={styles["output-box-container"]}>
          Black-Scholes Option Price Estimate:
          <div className={styles["output-box"]}>
            ${blackScholesPrice.toFixed(2)}
          </div>
        </div>
      </div>

      {
        loading && return_paths ? <div className={styles["loading-container"]}><Mosaic color="#3f50b5" size="medium" text="" textColor="" /></div> : 
        result && result.paths && <MonteCarloChartDisplay data={result.paths} />
      }
        

    </div>
  )
}

export default MonteCarloOptions;