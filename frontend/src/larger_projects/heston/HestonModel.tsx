import { useState } from "react";
import { HestonModelParams, HestonModelResponse } from "./HestonModel.types"
import { api } from "../../api/Api";
import { ThreeDot } from "react-loading-indicators";
import VariableSlider from "../../mini_projects/util/VariableSlider";
import Button from '@mui/material/Button';
import HestonModelResult from "./HestonModelResult";
import styles from "./CSS/HestonModel.module.css";


const HestonModel = () => {
  const [hestonParams, setHestonParams] = useState<HestonModelParams>({
    spot: 100,
    strike: 110,
    time: 1,
    risk_free_rate: 0.05,
    dividends: 0,
    initial_variance: 0.04,
    kappa: 0,
    theta: 0,
    sigma: 0,
    rho: 0,
    option_type: "call"
  });

  const [hestonResponse, setHestonResponse] = useState<HestonModelResponse>();
  const [loading, setLoading] = useState<boolean>(false);

  const runSimulation = () => {
    setLoading(true);
    api.post("/heston/heston-simulation", hestonParams)
    .then((res) => {
      setHestonResponse(res.data);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setLoading(false);
    })

  }

  return (
    <div className={styles["heston-container"]}>
      <h1>Heston Model Option Calculator</h1>

      <h4>Option Parameters</h4>

      <VariableSlider
        label="Spot Price"
        min={0}
        max={200}
        step={1}
        value={hestonParams.spot}
        setValue={(value: number) => setHestonParams({ ...hestonParams, spot: value })}
      />

      <VariableSlider
        label="Strike Price"
        min={0}
        max={200}
        step={1}
        value={hestonParams.strike}
        setValue={(value: number) => setHestonParams({ ...hestonParams, strike: value })}
      />

      <VariableSlider
        label="Time to Maturity (years)"
        min={0.01}
        max={5}
        step={0.01}
        value={hestonParams.time}
        setValue={(value: number) => setHestonParams({ ...hestonParams, time: value })}
      />

      <VariableSlider
        label="Risk-free Rate"
        min={0}
        max={0.2}
        step={0.001}
        value={hestonParams.risk_free_rate}
        setValue={(value: number) => setHestonParams({ ...hestonParams, risk_free_rate: value })}
      />

      <VariableSlider
        label="Dividend Yield"
        min={0}
        max={0.2}
        step={0.001}
        value={hestonParams.dividends}
        setValue={(value: number) => setHestonParams({ ...hestonParams, dividends: value })}
      />

      <h4>Heston Model Parameters</h4>
      
      <VariableSlider
        label="Initial Variance"
        min={0.01}
        max={1}
        step={0.01}
        value={hestonParams.initial_variance}
        setValue={(value: number) => setHestonParams({ ...hestonParams, initial_variance: value })}
      />

      <VariableSlider
        label="Mean Reversion Rate"
        min={0}
        max={5}
        step={0.1}
        value={hestonParams.kappa}
        setValue={(value: number) => setHestonParams({ ...hestonParams, kappa: value })}
      />

      <VariableSlider
        label="Long-term Variance"
        min={0.01}
        max={1}
        step={0.01}
        value={hestonParams.theta}
        setValue={(value: number) => setHestonParams({ ...hestonParams, theta: value })}
      />

      <VariableSlider
        label="Volatility of variance"
        min={0.01}
        max={1}
        step={0.01}
        value={hestonParams.sigma}
        setValue={(value: number) => setHestonParams({ ...hestonParams, sigma: value })}
      />

      <VariableSlider
        label="Correlation"
        min={-1}
        max={1}
        step={0.01}
        value={hestonParams.rho}
        setValue={(value: number) => setHestonParams({ ...hestonParams, rho: value })}
      />

      <Button variant="contained" onClick={runSimulation}>
        Run Simulation
      </Button>

      <div className={styles["binomial-result-container"]}>
        {loading ? <ThreeDot color="white" size="medium" text="" textColor="" /> : 
        hestonResponse && <HestonModelResult data={hestonResponse} />} 
      </div>

    </div>
  );
}

export default HestonModel;