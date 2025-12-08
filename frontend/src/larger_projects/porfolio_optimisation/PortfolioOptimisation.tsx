import { useState } from "react";
import AssetSelector from "./AssetSelector";
import { Button, Slider, Box, Typography, Chip } from "@mui/material";
import styles from "./CSS/PortfolioOptimisation.module.css";
import { Mosaic } from "react-loading-indicators";
import MarkowitzChartDisplay from "./MarkowitzChartDisplay";
import { MarkowitzResponse } from "./MarkowitzResponse.types";
import VariableSlider from "../../mini_projects/util/VariableSlider";
import preSelectedAssets from "./data/PreSelectedAssets.json";
import { api } from "../../api/Api";


type PreSelectedAsset = {
  assets: string[],
  timeframe: number,
  name: string
}


const PortfolioOptimisation = () => {
  const [assets, setAssets] = useState<string[] | undefined>([]);
  const [timeframe, setTimeframe] = useState<number>(1);
  const [risk_free_rate, setRiskFreeRate] = useState<number>(0.05);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<MarkowitzResponse>();

  const [beta, setBeta] = useState<number>(1.0);

  const selectPreGrouping = (grouping: PreSelectedAsset) => {
    setAssets(grouping.assets);
    setTimeframe(grouping.timeframe);
  }
  
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
      <h1>Asset Portfolio Optimizer</h1>

      <h3>Some Pre-Selected Values</h3>

      {preSelectedAssets.map(grouping => (
        <Box onClick={() => selectPreGrouping(grouping)} className={styles["preselect-option"]} sx={{ gap: 1, alignItems: "center" }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {grouping.name}:
          </Typography>

          {grouping.assets.map(asset => (
            <Chip 
              key={asset} 
              label={asset} 
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      ))}

      <br />

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
        label={"Beta"}
        min={0}
        max={1.2}
        step={0.01}
        value={beta}
        setValue={setBeta}
      />

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
          error ? 
            <div className={styles["error-container"]}>
              <p>{error}</p>
            </div> : result && 
          <div>
            <MarkowitzChartDisplay data={result} riskFreeRate={risk_free_rate} beta={beta} />
          </div>
        }
      </div>

    </div>
  )
}

export default PortfolioOptimisation;