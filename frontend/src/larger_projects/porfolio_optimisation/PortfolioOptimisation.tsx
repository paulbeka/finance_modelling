import { useEffect, useState } from "react";
import AssetSelector from "./AssetSelector";
import VariableSlider from "../../mini_projects/util/VariableSlider";
import { Button } from "@mui/material";
import styles from "./CSS/PortfolioOptimisation.module.css";

const PortfolioOptimisation = () => {
  const [assets, setAssets] = useState<string[] | undefined>([]);
  const [portfolioAllocation, setPortfolioAllocation] = useState<{[key: string]: number}>({}); 
  
  useEffect(() => {
    for (var asset in assets) {
      if (!(asset in portfolioAllocation)) {
        setPortfolioAllocation(prev => ({
          ...prev,
          asset: 10
        }));
      }
    }
  }, [assets])

  const rebalancePortfolio = async (fixedAsset?: string, fixedValue?: number) => {
    const original = portfolioAllocation;
    const fixed = fixedAsset ? fixedValue ?? original[fixedAsset] : 0;

    let total = 0;
    for (const asset in original) {
      if (asset !== fixedAsset) total += original[asset];
    }

    const newDict: {[key: string]: number} = {};

    for (const asset in original) {
      if (asset === fixedAsset) {
        newDict[asset] = fixed; 
      } else {
        newDict[asset] = (original[asset] / total) * (100 - fixed);
      }
    }

    setPortfolioAllocation(newDict);
  };

  const runSimulation = () => {
    
  }

  return (
    <div className={styles["portfolio-optimisation-container"]}>
      <h1>Portfolio Optimizer</h1>

      <AssetSelector
        assets={assets}
        setAssets={setAssets}
      />

      {assets?.map((asset) => 
        <div>
          <VariableSlider
            label={asset}
            value={portfolioAllocation[asset]}
            min={0}
            max={100}
            setValue={(newValue: any) => {
              setPortfolioAllocation(prev => ({
                ...prev,
                [asset]: newValue
              }));
              rebalancePortfolio(asset, newValue);
            }}
          />
        </div>
      )}

      <Button variant="contained" onClick={runSimulation}>
        Run Simulation
      </Button>

    </div>
  )
}

export default PortfolioOptimisation;