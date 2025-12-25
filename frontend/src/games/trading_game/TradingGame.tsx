import { useState } from "react";
import styles from "./CSS/TradingGame.module.css";

import questionsData from "./data/templateQuestions.json";

type TradingGameQuestion = {
  question: string;
  potentialAnswers: string[];
  correctAnswer: string;
}

type QuestionTemplate = {
  type: string;
  text: string;
}

const TradingGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState<TradingGameQuestion | null>(null);
  const [score, setScore] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const randomInRange = (min: number, max: number, decimals = 2) =>
  Number((Math.random() * (max - min) + min).toFixed(decimals));

  const shuffleArray = (array: any[]): any[] => {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function generateLongForwardQuestion(
    template: QuestionTemplate
  ): TradingGameQuestion {
    const spotToday = randomInRange(50, 150);
    const forwardPrice = randomInRange(50, 150);
    const maturityMonths = Math.floor(randomInRange(3, 24, 0));
    const riskFreeRate = randomInRange(1, 5);
    const spotAtMaturity = randomInRange(40, 180);

    const profit = Number((spotAtMaturity - forwardPrice).toFixed(2));

    const question = template.text
      .replace("{x}", spotToday.toString())
      .replace("{y}", forwardPrice.toString())
      .replace("{z}", maturityMonths.toString())
      .replace("{x}", spotAtMaturity.toString())
      .replace("{a}", riskFreeRate.toString());
    
    const wrong2 = Number((spotAtMaturity - spotToday).toFixed(2));
    const wrong1 = Number((forwardPrice - spotAtMaturity).toFixed(2));
    const wrong3 = Number(
      (spotAtMaturity - forwardPrice * (1 + riskFreeRate / 100)).toFixed(2)
    );

    const answers = shuffleArray([
      profit,
      wrong1,
      wrong2,
      wrong3,
    ]);

    return {
      question,
      correctAnswer: profit.toString(),
      potentialAnswers: answers
    };
  }


  const getNextRandomQuestion = () => {
    const nQuestion = questionsData.length;
    const randomQuestion = Math.round(Math.random() * nQuestion);
    const nextQuestion = questionsData[randomQuestion];

    switch (nextQuestion.type) {
      case "buy-long-short-forward": {
        generateLongForwardQuestion(nextQuestion);
      }
      default: {
      
      }
    }
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