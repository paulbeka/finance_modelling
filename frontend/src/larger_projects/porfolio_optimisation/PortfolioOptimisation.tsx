import { useState } from "react";
import AssetSelector from "./AssetSelector";

const PortfolioOptimisation = () => {
  const [assets, setAssets] = useState<string[]>();

  return (
    <div>
      <h1>Portfolio Optimizer</h1>

      <AssetSelector
        assets={assets}
        setAssets={setAssets}
      />

    </div>
  )
}

export default PortfolioOptimisation;