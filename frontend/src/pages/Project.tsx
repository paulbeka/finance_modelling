import React, { Suspense } from "react";
import { useParams } from "react-router-dom"
import styles from "./CSS/project.module.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { ThreeDot } from "react-loading-indicators";

const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  const components: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {
    "monte-carlo": React.lazy(() => import("../larger_projects/monte_carlo_option/MonteCarloOptions")),
    "binomial": React.lazy(() => import("../larger_projects/binomial/BinomialEstimation")),
    "portfolio-optimisation": React.lazy(() => import("../larger_projects/porfolio_optimisation/PortfolioOptimisation")),
    "heston-model": React.lazy(() => import("../larger_projects/heston/HestonModel"))
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
        {projectId && components[projectId] ? (
          React.createElement(components[projectId])
        ) : (
          <div>Project not found.</div>
        )}
      </Suspense>
    </div>
  );
}

export default Project