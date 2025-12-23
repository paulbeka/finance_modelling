import { useState } from "react";
import styles from "./CSS/TradingGame.module.css";

import questionsData from "./data/templateQuestions.json";

type TradingGameQuestion = {
  questions: string;
  potentialAnswers: string[];
  correctAnswer: string;
}

const TradingGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState<TradingGameQuestion | null>(null);
  const [score, setScore] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const generateNumbers = () => {

  }

  const getNextRandomQuestion = () => {

  }

  const selectAnswer = (answer: string) => {
    setError("");
    if (answer == currentQuestion?.correctAnswer) {
      setScore(score + 1);
      getNextRandomQuestion();
    } else {
      setError("Wrong answer. Please try again.")
    }
  }

  return (
    <div>
      <h2>The Trading Game</h2>
      <p>
        Welcome to the trading game! The objective is simple. You will be given an asset, a future/forward contract, 
        and a set of actions. Your goal is to maximize profit. Good luck!
      </p>

      <div>
        Score: {score}
      </div>

      <div>
        {currentQuestion && (
          <div className={styles["question-container"]}>
            {currentQuestion.potentialAnswers.map(option => (
              <div className={styles["question-option-container"]} onClick={() => selectAnswer(option)}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {error && <div>
        {error}
      </div>}
    </div>
  )
}

export default TradingGame;