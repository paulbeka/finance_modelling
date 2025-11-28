import { LineChart } from "@mui/x-charts/LineChart";


const MonteCarloChartDisplay = ({ data } : { data: number[][] }) => {
  const x = Array.from({ length: data[0].length }, (_, i) => i);

  const series = data.map((lineArr, index) => ({
    id: `line${index}`,
    label: `Spot Price`,
    data: lineArr,
    color: `hsl(${(index * 30) % 360}, 70%, 50%)`,
    showMark: false,
    lineWidth: 1,
  }));
  
  return (
    <LineChart
      hideLegend={true}
      axisHighlight={{
        x: 'none',
        y: 'none'
      }}      
      xAxis={[{ data: x, label: "Simulation Step (T/Number of Simulations)" }]}
      yAxis={[{ label: "Spot Price" }]}
      series={series}
      height={500}
      margin={{ left: 20, right: 20, top: 20, bottom: 20 }}
      disableAxisListener
    />
  );
}

export default MonteCarloChartDisplay;