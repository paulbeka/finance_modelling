import { useState } from "react";
import AssetSelector from "./AssetSelector";
import { Button, Slider, Box, Typography } from "@mui/material";
import styles from "./CSS/PortfolioOptimisation.module.css";
import { Mosaic } from "react-loading-indicators";
import MarkowitzChartDisplay from "./MarkowitzChartDisplay";
import { MarkowitzResponse } from "./MarkowitzResponse.types";
import { api } from "../../api/Api";


const PortfolioOptimisation = () => {
  const [assets, setAssets] = useState<string[] | undefined>([]);
  const [timeframe, setTimeframe] = useState<number>();

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<MarkowitzResponse>();
  
  const runSimulation = () => {
    setLoading(true);
    api.post("/markowitz/optimize", {
      assets, timeframe
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

      <Button variant="contained" onClick={() => runSimulation()}>
        Run Simulation
      </Button>

      <div className={styles["results-container"]}>
        {
          loading ? <div className={styles["loading-container"]}><Mosaic color="#3f50b5" size="medium" text="" textColor=""/></div> : 
          result && <MarkowitzChartDisplay data={result} />
        }
      </div>

    </div>
  )
}

export default PortfolioOptimisation;