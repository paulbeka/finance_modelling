import { useEffect, useState } from "react";
import AssetSelector from "../../components/util/AssetSelector";
import { Button, Slider, Box, Typography } from "@mui/material";
import styles from "./CSS/BlackLitterman.module.css";

const BlackLitterman = () => {
  const [assets, setAssets] = useState<string[] | undefined>([]);
  const [timeframe, setTimeframe] = useState<number>(1);
  const [portfolioAllocation, setPortfolioAllocation] = useState<{ [key: string]: number }>({});

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
          newDict[asset] = total === 0 ? 0 : (updated[asset] / total) * (100 - fixed);
        }
      }

      return newDict;
    });
  };

  return (
    <div className={styles["black-litterman-container"]}>
      <h1>Black-Litterman Model</h1>

      <h3>Assets</h3>
      <AssetSelector assets={assets} setAssets={setAssets} />

      {assets?.map(asset => (
        <Box key={asset} sx={{ mt: 2 }}>
          <Typography gutterBottom>
            {asset}: {portfolioAllocation[asset]?.toFixed(1)}%
          </Typography>
          <Slider
            value={portfolioAllocation[asset] ?? 0}
            min={0}
            max={100}
            onChange={(_, value) =>
              rebalancePortfolio(asset, value as number)
            }
            valueLabelDisplay="auto"
          />
        </Box>
      ))}

      <Box sx={{ width: "auto", mt: 4 }}>
        <Typography gutterBottom>
          Timeframe (1-10 years of historical data)
        </Typography>
        <Slider
          aria-label="Timeframe"
          value={timeframe}
          onChange={(_, value) => setTimeframe(value as number)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />
      </Box>

      <Button variant="contained" sx={{ mt: 3 }}>
        Run Black-Litterman
      </Button>
    </div>
  );
};

export default BlackLitterman;
