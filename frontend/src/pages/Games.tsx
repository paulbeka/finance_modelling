import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import styles from "./CSS/projectSelector.module.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { ThreeDot } from "react-loading-indicators";

const Games = () => {
  const { gameId } = useParams<{ gameId: string }>();
  
  const games: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {
    "trading-game": React.lazy(() => import("../games/trading_game/TradingGame"))
  };

  return (
    <div className={styles["project-page"]}>
      <div
        className={styles["back-arrow"]}
        onClick={() => window.history.back()}
      >
        <BsArrowLeftShort size={30} />
        <span style={{ marginBottom: "3px" }}>Back</span>
      </div>

      <Suspense fallback={
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh"
        }}>
          <ThreeDot color="rgb(131, 182, 212)" size="medium" text="" textColor="" />
        </div>
      }>
        {gameId && games[gameId] ? (
          React.createElement(games[gameId])
        ) : (
          <div>Project not found.</div>
        )}
      </Suspense>
    </div>
  )
}

export default Games;