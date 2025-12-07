import {
  ChartContainer,
  ScatterPlot,
  LinePlot,
  ChartsXAxis,
  ChartsYAxis,
  ChartsLegend,
  ChartsGrid
} from '@mui/x-charts';
import { MarkowitzResponse } from './MarkowitzResponse.types';

const MarkowitzChartDisplay = ({ 
    data, riskFreeRate
  }: { data: MarkowitzResponse, riskFreeRate: number }) => {

  const extendedX = [0, ...data.efficient_frontier_x];
  const extendedFrontierY = [null, ...data.efficient_frontier_y];

  const cmlLineCalc = () => {
    const slope = (data.expected_return - riskFreeRate) / data.volatility;
    return extendedX.map((x) => riskFreeRate + slope * x);
  };

  return (
    <ChartContainer
      height={500}
      xAxis={[{
        id: 'risk',
        data: extendedX,
        label: 'Risk (Standard Deviation %)',
        min: 0,
      }]}
      yAxis={[{
        id: 'return',
        label: 'Return (%)',
        min: -0.1,
      }]}
      series={[
        {
          id: 'scatter',
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
          color: '#1285f1ff',
          showMark: false,
        },
        {
          id: 'risk_free_point',
          label: 'Risk-free Asset',
          type: 'scatter',
          data: [{x: 0, y: riskFreeRate}],
          color: '#c42626ff',
          markerSize: 7
        },
        {
          id: 'sharpe_point',
          label: 'Maximum Sharpe Ratio Portfolio',
          type: 'scatter',
          data: [{x: data.volatility, y: data.expected_return}],
          color: '#5da960ff',
          markerSize: 7
        }
      ]}
    >
      <ChartsGrid />
      <ChartsXAxis />
      <ChartsYAxis />

      <ChartsLegend />

      <ScatterPlot />
      <LinePlot />

    </ChartContainer>
  );
};

export default MarkowitzChartDisplay;
