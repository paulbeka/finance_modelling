import { useEffect, useState } from "react";
import AssetSelector from "./AssetSelector";
import VariableSlider from "../../mini_projects/util/VariableSlider";

const PortfolioOptimisation = () => {
  const [assets, setAssets] = useState<string[]>();
  const [portfolioAllocation, setPortfolioAllocation] = useState<{ ticker: string, weight: number }>(); 
  
  const rebalancePortfolioOnNewAsset = () => {

  }

  useEffect(() => {
    rebalancePortfolioOnNewAsset();
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
            min={0}
            max={100}
          />
        </div>
      )}

      <div>Run Simulation</div>

    </div>
  )
}

export default PortfolioOptimisation;