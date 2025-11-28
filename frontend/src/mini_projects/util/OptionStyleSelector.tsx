import { OPTION_STYLES, OptionStyle } from "./common_types.types";
import styles from "./CSS/input.module.css";


const OptionStyleSelector = ({
  optionStyle,
  setOptionStyle,
}: {
  optionStyle: string;
  setOptionStyle: (type: OptionStyle) => void;
}) => {
  return (
    <div className={styles["variable-container"]}>
      <label className={styles["variable-label"]}>Option Style:</label>
      <select
        className={styles["input-field"]}
        value={optionStyle}
        onChange={(e) => setOptionStyle(e.target.value as OptionStyle)}
      >
        {OPTION_STYLES.map((style) => (
          <option key={style} value={style}>{style.charAt(0).toUpperCase() + style.slice(1)}</option>
        ))} 
      </select>
    </div>
  );
};

export default OptionStyleSelector;