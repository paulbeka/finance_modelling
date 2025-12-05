import { MarkowitzResponse } from "./MarkowitzResponse.types";
import { ScatterChart } from '@mui/x-charts/ScatterChart';


const MarkowitzChartDisplay = ({ data } : { data: MarkowitzResponse }) => {
  const chartSetting = {
    yAxis: [
      {
        label: 'Return (%)',
        width: 60,
      },
    ],
    height: 500,
  };

  return (
    <div>
      <ScatterChart
        dataset={data.points}
        series={[
          { datasetKeys: { x: 'x', y: 'y' } },
        ]}
        {...chartSetting}
      />
    </div>
  )
}

export default MarkowitzChartDisplay;