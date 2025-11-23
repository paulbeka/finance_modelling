import styles from './CSS/input.module.css';
import Slider from '@mui/material/Slider';

const VariableSlider = (props: any) => {
  return (
    <div className={styles["variable-container"]}>
      <label className={styles["variable-label"]}>{props.label}</label>
      <Slider
        size="small"
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={(_, value) => props.setValue(value as number)}
        valueLabelDisplay="auto"
        style={{ flex: 1 }}
      />
      <input
        type="number"
        value={props.value}
        step={props.step}
        onChange={(e) => props.setValue(Number(e.target.value))}
        className={styles["input-field"]}
      />
    </div>
  )
};

export default VariableSlider;