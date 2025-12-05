import { useState } from "react";
import AssetSelector from "./AssetSelector";
import { Button, Slider, Box, Typography } from "@mui/material";
import styles from "./CSS/PortfolioOptimisation.module.css";
import { Mosaic } from "react-loading-indicators";
import MarkowitzChartDisplay from "./MarkowitzChartDisplay";
import { MarkowitzResponse } from "./MarkowitzResponse.types";
import VariableSlider from "../../mini_projects/util/VariableSlider";
import { api } from "../../api/Api";


const PortfolioOptimisation = () => {
  const [assets, setAssets] = useState<string[] | undefined>([]);
  const [timeframe, setTimeframe] = useState<number>(1);
  const [risk_free_rate, setRiskFreeRate] = useState<number>(0.05);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<MarkowitzResponse>();
  
  const runSimulation = () => {
    setError("");
    if (!assets || assets.length < 1) {
      setError("Please input at least 2 assets.")
      return;
    }

    setLoading(true);
    api.post("/markowitz/optimize", {
      assets, timeframe, risk_free_rate
    }).then((res) => {
      setResult(res.data);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  return (
    <div className={styles["portfolio-optimisation-container"]}>
      <h1>Portfolio Optimizer</h1>

      <AssetSelector
        assets={assets}
        setAssets={setAssets}
      />

      <Box sx={{ width: "auto" }}>
        <Typography gutterBottom>Timeframe (1-10 years of historical data): </Typography>
        <Slider
          aria-label="Timeframe"
          value={timeframe}
          onChange={(_, value) => setTimeframe(value)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />
      </Box>

      <VariableSlider
        label={"Risk free rate"}
        min={-0.1}
        max={0.2}
        step={0.01}
        value={risk_free_rate}
        setValue={setRiskFreeRate}
      />

      <Button variant="contained" onClick={() => runSimulation()}>
        Run Simulation
      </Button>

      <div className={styles["results-container"]}>
        {
          loading ? <div className={styles["loading-container"]}><Mosaic color="#3f50b5" size="medium" text="" textColor=""/></div> : 
          error ? <p>{error}</p> : result && <MarkowitzChartDisplay data={result} />
        }
      </div>

    </div>
  )
}

export default PortfolioOptimisation;