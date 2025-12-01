import { useState } from "react";
import { BinomialLatticeType, OptionStyle, OptionType } from "../../mini_projects/util/common_types.types";
import OptionTypeSelector from "../../mini_projects/util/OptionTypeSelector";
import OptionStyleSelector from "../../mini_projects/util/OptionStyleSelector";
import DropDownLatticeSelector from "../../mini_projects/util/DropDownLatticeSelector";
import VariableSlider from "../../mini_projects/util/VariableSlider";
import Button from '@mui/material/Button';
import { ThreeDot } from "react-loading-indicators";
import styles from "./CSS/BinomialEstimation.module.css";
import { api } from "../../api/Api";

const BinomialEstimation = () => {
  const [option_type, setOptionType] = useState<OptionType>("call");
  const [option_style, setOptionStyle] = useState<OptionStyle>("european");
  const [lattice_type, setLatticeType] = useState<BinomialLatticeType>("CRR");
  const [num_steps, setNumSteps] = useState<number>(100);
  const [spot, setSpot] = useState<number>(100);
  const [strike, setStrike] = useState<number>(100);
  const [time, setTime] = useState<number>(1);
  const [risk_free_rate, setRate] = useState<number>(0.05);
  const [sigma, setSigma] = useState<number>(0.2);
  const [dividends, setDividends] = useState<number>(0);

  const [binomialPrice, setBinomialPrice] = useState<number>();

  const [loading, setLoading] = useState<boolean>(false);

  const runSimulation = () => {
    setLoading(true);
    api.post("/binomial/binomial-simulation", {
      spot,
      strike,
      time, 
      risk_free_rate,
      sigma,
      dividends,
      num_steps,
      option_type,
      option_style,
      lattice_type
    })
    .then((res) => {
      setBinomialPrice(res.data.binomial_price);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setLoading(false));
  }
 
  return (
    <div className={styles["binomial-container"]}>
      <h3>Binomial Model Calculator (Fast)</h3>
      
      <OptionTypeSelector
        optionType={option_type}
        setOptionType={setOptionType}
      />

      <OptionStyleSelector
        optionStyle={option_style}
        setOptionStyle={setOptionStyle}
      />

      <DropDownLatticeSelector 
        latticeType={lattice_type}
        setLatticeType={setLatticeType}
      />

      <VariableSlider
        label="Number of Steps"
        min={1}
        max={5000}
        step={1}
        value={num_steps}
        setValue={setNumSteps}
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
        min={-0.1}
        max={0.2}
        step={0.001}
        value={risk_free_rate}
        setValue={setRate}
      />

      <VariableSlider
        label="Volatility (%)"
        min={0.1}
        max={1}
        step={0.01}
        value={sigma}
        setValue={setSigma}
      />

      <VariableSlider
        label="Dividends (yield)"
        min={0}
        max={1}
        step={0.01}
        value={dividends}
        setValue={setDividends}
      />

      <Button variant="contained" onClick={runSimulation}>
        Run Simulation
      </Button>

      <div className={styles["binomial-result-container"]}>
        {loading ? <ThreeDot color="white" size="medium" text="" textColor="" /> : 
          binomialPrice !== undefined ? <p style={{ fontWeight: "bold" }}>${binomialPrice.toFixed(2)}</p> : 
          <i>Run the simulation for a result</i>}
      </div>
    </div>
  )
}

export default BinomialEstimation;