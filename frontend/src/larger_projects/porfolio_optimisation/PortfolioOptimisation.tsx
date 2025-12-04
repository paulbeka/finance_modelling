import { useEffect, useState } from "react";
import AssetSelector from "./AssetSelector";
import VariableSlider from "../../mini_projects/util/VariableSlider";

const PortfolioOptimisation = () => {
  const [assets, setAssets] = useState<string[] | undefined>(["AAPL", "STOXX 600", "S&P"]);
  const [portfolioAllocation, setPortfolioAllocation] = useState<{[key: string]: number}>({
    "AAPL": 10,
    "STOXX 600": 50,
    "S&P": 10
  }); 
  
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

  useEffect(() => {
    rebalancePortfolio();
  }, [assets])

  return (
    <div>
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

      <div>Run Simulation</div>

    </div>
  )
}

export default PortfolioOptimisation;