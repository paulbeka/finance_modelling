import { useState } from "react";
import { HestonModelParams } from "./HestonModelParams.types"
import VariableSlider from "../../mini_projects/util/VariableSlider";


const HestonModel = () => {
  const [hestonParams, setHestonParams] = useState<HestonModelParams>({
    S: 100,
    K: 110,
    T: 1,
    r: 0.05,
    q: 0,
    v: 0.04,
    kappa: 0,
    theta: 0,
    sigma: 0,
    rho: 0,
    optionType: "call"
  });

  return (
    <div>
      <h1>Heston Model Option Calculator</h1>
      <div>

        <VariableSlider
          label="Spot Price"
          min={0}
          max={200}
          step={1}
          value={hestonParams.S}
          setValue={(value: number) => setHestonParams({ ...hestonParams, S: value })}
        />

        <VariableSlider
          label="Strike Price"
          min={0}
          max={200}
          step={1}
          value={hestonParams.K}
          onChange={(value: number) => setHestonParams({ ...hestonParams, K: value })}
        />

        <VariableSlider
          label="Time to Maturity (years)"
          min={0.01}
          max={5}
          step={0.01}
          value={hestonParams.T}
          onChange={(value: number) => setHestonParams({ ...hestonParams, T: value })}
        />

        <VariableSlider
          label="Risk-free Rate"
          min={0}
          max={0.2}
          step={0.001}
          value={hestonParams.r}
          onChange={(value: number) => setHestonParams({ ...hestonParams, r: value })}
        />

        <VariableSlider
          label="Dividend Yield"
          min={0}
          max={0.2}
          step={0.001}
          value={hestonParams.q}
          onChange={(value: number) => setHestonParams({ ...hestonParams, q: value })}
        />

        <VariableSlider
          label="Initial Variance"
          min={0.01}
          max={1}
          step={0.01}
          value={hestonParams.v}
          onChange={(value: number) => setHestonParams({ ...hestonParams, v: value })}
        />

        <VariableSlider
          label="Mean Reversion Rate"
          min={0}
          max={5}
          step={0.1}
          value={hestonParams.kappa}
          onChange={(value: number) => setHestonParams({ ...hestonParams, kappa: value })}
        />

        <VariableSlider
          label="Long-term Variance"
          min={0.01}
          max={1}
          step={0.01}
          value={hestonParams.theta}
          onChange={(value: number) => setHestonParams({ ...hestonParams, theta: value })}
        />

        <VariableSlider
          label="Volatility of variance"
          min={0.01}
          max={1}
          step={0.01}
          value={hestonParams.sigma}
          onChange={(value: number) => setHestonParams({ ...hestonParams, sigma: value })}
        />

        <VariableSlider
          label="Correlation"
          min={-1}
          max={1}
          step={0.01}
          value={hestonParams.rho}
          onChange={(value: number) => setHestonParams({ ...hestonParams, rho: value })}
        />

      </div>
    </div>
  );
}

export default HestonModel;