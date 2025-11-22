import { OptionType } from '../util/common_types.types';
import styles from './CSS/input.module.css';

const OptionTypeSelector = (props: { optionType: string, setOptionType: (type: OptionType) => void }) => {
  return (
  <div className={styles["variable-container"]}>
    <label className={styles["variable-label"]}>Option Type</label>
    <select
      value={props.optionType}
      onChange={(e) => props.setOptionType(e.target.value as OptionType)}
      className={styles["input-field"]}
    >
      <option value="call">Call</option>
      <option value="put">Put</option>
    </select>
  </div>);
};

export default OptionTypeSelector;