import { useEffect, useState } from "react";
import AssetSelector from "./AssetSelector";
import VariableSlider from "../../mini_projects/util/VariableSlider";
import { Button } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from "./CSS/PortfolioOptimisation.module.css";


const PortfolioOptimisation = () => {
  const [assets, setAssets] = useState<string[] | undefined>([]);
  const [portfolioAllocation, setPortfolioAllocation] = useState<{[key: string]: number}>({}); 
  
  useEffect(() => {
    if (!assets) return;

    setPortfolioAllocation(prev => {
      const updated = { ...prev };

      assets.forEach(asset => {
        if (!(asset in updated)) {
          updated[asset] = 100;
        }
      });

      return updated;
    });
    rebalancePortfolio();
  }, [assets]);

  const rebalancePortfolio = (fixedAsset?: string, fixedValue?: number) => {
    setPortfolioAllocation(prev => {
      const updated = {
        ...prev,
        ...(fixedAsset ? { [fixedAsset]: fixedValue ?? prev[fixedAsset] ?? 0 } : {})
      };

      const fixed = fixedAsset ? fixedValue ?? updated[fixedAsset] : 0;

      let total = 0;
      for (const asset in updated) {
        if (asset !== fixedAsset) total += updated[asset];
      }

      const newDict: { [key: string]: number } = {};

      for (const asset in updated) {
        if (asset === fixedAsset) {
          newDict[asset] = fixed;
        } else {
          newDict[asset] = (updated[asset] / total) * (100 - fixed);
        }
      }

      return newDict;
    });
  };

  const removeAssetFromPortfolio = (asset: string) => {
    setAssets(prev => {
      return prev?.filter(val => val !== asset);
    });
    setPortfolioAllocation(prev => {
      delete prev[asset];
      return prev;
    });
    rebalancePortfolio();
  }

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
        <div className={styles["asset-slider"]}>
          <VariableSlider
            label={asset}
            value={portfolioAllocation[asset]}
            min={0}
            max={100}
            setValue={(newValue: number) => {
              rebalancePortfolio(asset, newValue);
            }}
          />
          <FaRegTrashAlt className={styles["trash-icon"]} onClick={() => removeAssetFromPortfolio(asset)}/>
        </div>
      )}

      <Button variant="contained" onClick={runSimulation}>
        Run Simulation
      </Button>

    </div>
  )
}

export default PortfolioOptimisation;