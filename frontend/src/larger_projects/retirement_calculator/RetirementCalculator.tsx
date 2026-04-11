import { useState } from "react";
import styles from "./CSS/RetirementCalculator.module.css";


const RetirementCalculator = () => {
    const [state, setState] = useState({
        portfolioValue: 0,
        expectedReturn: 0,
        contributions: 0,
        contributionIncrease: 0
    });
    
    return (
        <div className={styles["retirement-calculator-container"]}>
            <h1>Financial Freedom When?</h1>

            <h3>Parameters</h3>

            <input type="text" placeholder="Portfolio value"></input>
            <input type="text" placeholder="Expected return"></input>
            <input type="text" placeholder="Contributions"></input>
            <input type="text" placeholder="Contribution increase"></input>

            {/* What do I want from this?
            -> how much I want to make per month
            -> adjusted for inflation estimated from recent data
            -> in a currency of my chosing
            -> and I can input how much money I have, coupled with the expected return
            -> with some preselected return values to test out
            -> ideally all done with some kind of slider
            -> cool extra step: if I can chose the assets and see how it will affect retirement 
            -> even cooler: when can I stop contributing? Some kind of metric there */}
        </div>
    );
}