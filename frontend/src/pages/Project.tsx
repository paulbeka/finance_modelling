import React from "react"
import { useParams } from "react-router-dom"
import MonteCarloOptions from "../larger_projects/MonteCarloOptions";
import styles from "./CSS/project.module.css";
import { BsArrowLeftShort } from "react-icons/bs";

const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  const components: { [key: string]: React.ReactElement } = {
    "monte-carlo": <MonteCarloOptions />
  };

  return (
    <div className={styles["project-page"]}>
      <div className={styles["back-arrow"]} onClick={() => window.history.back()}>
        <><BsArrowLeftShort size={30} /></><span style={{marginBottom: "3px"}}>Back</span>
      </div>

      {projectId && components[projectId] ? (
        components[projectId]
      ) : (
        <div>Project not found.</div>
      )}
    </div>
  )
}

export default Project