import Plot from "react-plotly.js";
import { HestonModelResponse } from "./HestonModel.types";
import type { PlotData } from "plotly.js";

const HestonModelResult = (data: HestonModelResponse) => {
  const { prices, variances, final_option_price } = data;
  const timeSteps = prices[0].length;
  const time = Array.from({ length: timeSteps }, (_, i) => i);

  const priceTraces: Partial<PlotData>[] = prices.map((pathPrices, i) => ({
    x: time,
    y: pathPrices,
    type: "scatter" as const,
    mode: "lines",
    name: `Path ${i + 1}`,
    line: { width: 1 },
    showlegend: false,
  }));

  const volatilityTraces: Partial<PlotData>[] = variances.map((pathVariances, i) => ({
    x: time,
    y: pathVariances,
    type: "scatter" as const,
    mode: "lines",
    name: `Path ${i + 1}`,
    line: { width: 1 },
    showlegend: false,
  }));

  return (
    <div style={{ width: "100%" }}>
      <div>
        Final Option price: {final_option_price.toFixed(2)}
      </div>
      <Plot
        data={priceTraces}
        layout={{
          title: { text: "Asset price over time" },
          xaxis: { title: { text: "Time" } },
          yaxis: { title: { text: "Price" } },
          height: 400,
        }}
        style={{ width: "100%" }}
      />

      <Plot
        data={volatilityTraces}
        layout={{
          title: { text: "Asset volatility over time" },
          xaxis: { title: { text: "Time" } },
          yaxis: { title: { text: "Variance / Volatility" } },
          height: 400,
        }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default HestonModelResult;
