import React from "react"
import { useParams } from "react-router-dom"
import MonteCarlo from "../larger_projects/monte_carlo";
import styles from "./CSS/project.module.css";

const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  const components: { [key: string]: React.ReactElement } = {
    "monte-carlo": <MonteCarlo />
  };

  return (
    <div className={styles["project-page"]}>
      {projectId && components[projectId] ? (
        components[projectId]
      ) : (
        <div>Project not found.</div>
      )}
    </div>
  )
}

export default Project