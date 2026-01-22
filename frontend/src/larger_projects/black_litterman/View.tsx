import { AbsoluteView, RelativeView } from "./View.types";

const View = ({ view }: {view: RelativeView | AbsoluteView}) => {
  
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
        
      </div>
      {view.type === "absolute" ? renderAbsoluteView() : renderRelativeView()}
    </div>
  )
}

export default View;