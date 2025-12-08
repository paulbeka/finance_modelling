import {
  ChartDataProvider,
  ChartsSurface,
  ChartsXAxis,
  ChartsYAxis,
  ChartsLegend,
  ScatterPlot,
  LinePlot,
} from '@mui/x-charts';
import { MarkowitzResponse } from './MarkowitzResponse.types';
import styles from './CSS/MarkowitzChartDisplay.module.css';

type Props = {
  data: MarkowitzResponse;
  riskFreeRate: number;
  beta: number;
};

const MarkowitzChartDisplay = ({ data, riskFreeRate, beta }: Props) => {
  const extendedX = [0, ...data.efficient_frontier_x];
  const extendedFrontierY = [null, ...data.efficient_frontier_y];

  const cmlLineCalc = () => {
    const slope = (data.expected_return - riskFreeRate) / data.volatility;
    return extendedX.map((x) => riskFreeRate + slope * x);
  };

  return (
    <div>
      <ChartDataProvider
        disableAxisListener
        width={700}
        height={500}
        xAxis={[
          {
            id: 'risk',
            label: 'Risk (Standard Deviation %)',
            data: extendedX,
            scaleType: 'linear',
            min: 0,
          },
        ]}
        yAxis={[
          {
            id: 'return',
            label: 'Return (%)',
            scaleType: 'linear',
            min: -0.1,
          },
        ]}
        series={[
          {
            id: 'portfolios',
            label: 'Portfolios',
            type: 'scatter',
            data: data.points,
            color: '#1976d2',
          },
          {
            id: 'frontier',
            label: 'Efficient Frontier',
            type: 'line',
            data: extendedFrontierY,
            color: '#d32f2f',
            curve: 'monotoneX',
            showMark: false,
          },
          {
            id: 'capital_market_line',
            label: 'Capital Market Line',
            type: 'line',
            data: cmlLineCalc(),
            color: '#1285f1',
            showMark: false,
          },
          {
            id: 'risk_free_point',
            label: 'Risk-free Asset',
            type: 'scatter',
            data: [{ x: 0, y: riskFreeRate }],
            color: '#c42626',
            markerSize: 7,
          },
          {
            id: 'sharpe_point',
            label: 'Maximum Sharpe Ratio Portfolio',
            type: 'scatter',
            data: [{ x: data.volatility, y: data.expected_return }],
            color: '#5da960',
            markerSize: 7
          },
          {
            id: 'beta_point',
            label: `Beta`,
            type: 'scatter',
            data: [{ x: beta * data.volatility, y: riskFreeRate + beta * (data.expected_return - riskFreeRate) }],
            color: '#f5a623',
            markerSize: 7
          }
        ]}
      >
        <ChartsLegend
          direction="horizontal"
          slotProps={{
            legend: {
              sx: {
                justifyContent: 'center',
                mb: 1,
              },
            },
          }}
        />

        <ChartsSurface>
          <ChartsXAxis axisId="risk" />
          <ChartsYAxis axisId="return" />
          <ScatterPlot />
          <LinePlot />
        </ChartsSurface>
      </ChartDataProvider>

      <br />

      <div>
        <div className={styles["beta-returns-container"]}>
          Beta returns: <span style={{fontWeight: "bold"}}>
            {(((riskFreeRate * Math.max(0, 1 - beta)) + (data.expected_return * beta))*100).toFixed(2)}%
          </span>
        </div>
        <div className={styles["summary-stats-container"]}>
          <div><span>Expected Return: </span><span style={{fontWeight: "bold"}}>{(data.expected_return * 100).toFixed(2)}%</span></div>
          <div><span>Volatility: </span><span style={{fontWeight: "bold"}}>{(data.volatility * 100).toFixed(2)}%</span></div>
          <div><span>Sharpe Ratio: </span><span style={{fontWeight: "bold"}}>{data.sharpe.toFixed(4)}</span></div>
        </div>
        <h4>Best weights (for a sharpe of {data.sharpe.toFixed(2)}):</h4>
        <div className={styles["weights-container"]}>
          {Object.keys(data.weights).map((asset) => (
            <div className={styles["optimal-asset-weight-container"]} key={asset}>
              <span style={{ fontWeight: "bold" }}>{asset}</span>
              <p style={{ margin: 0 }}>{(data.weights[asset]*100).toFixed(2)}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarkowitzChartDisplay;
