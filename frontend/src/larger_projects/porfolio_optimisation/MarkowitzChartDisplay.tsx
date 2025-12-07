import {
  ChartContainer,
  ScatterPlot,
  LinePlot,
  ChartsXAxis,
  ChartsYAxis,
  ChartsLegend,
} from '@mui/x-charts';
import { MarkowitzResponse } from './MarkowitzResponse.types';

const MarkowitzChartDisplay = ({ data }: { data: MarkowitzResponse }) => {
  return (
    <ChartContainer
      width={600}
      height={500}
      xAxis={[{
        id: 'risk',
        data: data.efficient_frontier_x,
        label: 'Risk (Std Dev %)',
        min: 0,
      }]}
      yAxis={[{
        id: 'return',
        label: 'Return (%)',
        min: 0,
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
          data: data.efficient_frontier_y,
          color: '#d32f2f',
          curve: 'monotoneX',
          showMark: false,
        },
      ]}
    >
      <ChartsXAxis />
      <ChartsYAxis />

      <ScatterPlot />
      <LinePlot />

      <ChartsLegend />
    </ChartContainer>
  );
};

export default MarkowitzChartDisplay;
