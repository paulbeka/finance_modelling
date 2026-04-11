import { FormControl } from "@mui/material";
import { AbsoluteView, RelativeView } from "./View.types";
import { MenuItem, Select } from "@mui/material";

const View = ({ view, onChange }: { 
  view: RelativeView | AbsoluteView,
  onChange: (view: AbsoluteView | RelativeView) => void;
}) => {

  const handleTypeChange = (newType: "absolute" | "relative") => {
    if (newType === view.type) return;

    if (newType === "absolute") {
      onChange({
        type: "absolute",
        asset: "",
        expectedReturn: 0,
        confidence: 50,
      });
    } else {
      onChange({
        type: "relative",
        outperformingAsset: "",
        underperformingAsset: "",
        expectedReturnDifference: 0,
        confidence: 50,
      });
    }
  };
  
  const renderAbsoluteView = () => {
    return (
      <div>
        <p>Absolute</p>
      </div>
    )
  }

  const renderRelativeView = () => {
    return (
      <div>
        <p>Relative</p>
      </div>
    )
  }
  
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <FormControl size="small">
          <Select
            value={view.type}
            onChange={(e) =>
              handleTypeChange(e.target.value as "absolute" | "relative")
            }
          >
            <MenuItem value="absolute">Absolute</MenuItem>
            <MenuItem value="relative">Relative</MenuItem>
          </Select>
        </FormControl>
      </div>
      {view.type === "absolute" ? renderAbsoluteView() : renderRelativeView()}
    </div>
  )
}

export default View;