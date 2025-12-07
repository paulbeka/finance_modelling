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
          label: `Beta = ${beta} Portfolio`,
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
  );
};

export default MarkowitzChartDisplay;
