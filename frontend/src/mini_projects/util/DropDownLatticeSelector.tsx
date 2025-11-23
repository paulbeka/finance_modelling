import { BINOMIAL_LATTICE_TYPES, BinomialLatticeType } from './common_types.types';
import styles from './CSS/input.module.css';

const OptionTypeSelector = (props: { latticeType: string, setLatticeType: (type: BinomialLatticeType) => void }) => {
  return (
  <div className={styles["variable-container"]}>
    <label className={styles["variable-label"]}>Lattice Type</label>
    <select
      value={props.latticeType}
      onChange={(e) => props.setLatticeType(e.target.value as BinomialLatticeType)}
      className={styles["input-field"]}
    >
      {BINOMIAL_LATTICE_TYPES.map((type) => (
        <option key={type} value={type}>{type}</option>
      ))}
    </select>
  </div>);
}

export default OptionTypeSelector;