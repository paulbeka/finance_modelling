import styles from './CSS/input.module.css';
import Slider from '@mui/material/Slider';
import { BrowserView, MobileView } from 'react-device-detect';

const VariableSlider = (props: any) => {
  return (<>
    <BrowserView>
      <div className={styles["variable-container"]}>
        <label className={styles["variable-label"]}>{props.label}</label>
        <Slider
          size="small"
          value={props.value ?? 0}
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
    </BrowserView>
    <MobileView>
      <div className={styles["variable-container-mobile"]}>
        <label className={styles["variable-label"]}>{props.label}</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Slider
            size="small"
            value={props.value ?? 0}
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
            className={styles["input-field-mobile"]}
          />
        </div>
      </div>
    </MobileView>
  </>)
};

export default VariableSlider;