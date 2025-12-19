import { OptionType } from '../util/common_types.types';
import { blackScholesGreeks } from './calc/black_scholes';
import styles from './CSS/OptionGreeks.module.css';
import { isMobile } from 'react-device-detect';

const OptionGreeks = (
  props: {
    spot: number;
    strike: number;
    time: number;
    rate: number;
    volatility: number;
    optionType: OptionType;
    dividend: number;
  }
) => {

  const { delta, gamma, theta, vega, rho} = blackScholesGreeks(
    props.spot,
    props.strike,
    props.time,
    props.rate,
    props.volatility,
    props.optionType,
    props.dividend
  );

  return (
    <div className={isMobile ? styles["mobile-option-greeks-container"] : styles["option-greeks-container"]}>
      <div className={styles["option-greek-container"]}>Delta: {delta.toFixed(2)}</div>
      <div className={styles["option-greek-container"]}>Gamma: {gamma.toFixed(4)}</div>
      <div className={styles["option-greek-container"]}>Theta: {theta.toFixed(2)}</div>
      <div className={styles["option-greek-container"]}>Vega: {vega.toFixed(2)}</div>
      <div className={styles["option-greek-container"]}>Rho: {rho.toFixed(2)}</div>
    </div>
  )
}

export default OptionGreeks;