import { useState } from "react";
import BlackScholesModule from "../components/projects/blackscholes/BlackScholes";
import BinomialModule from "../components/projects/binomial/BinomialModel";
import style from "./CSS/home.module.css";


const Home = () => {
  const [openProject, setOpenProject] = useState<string|null>(null);
  
  const projects = [
    { name: "Black Scholes", desc: "Options pricing using the Black-Scholes–Merton model.", component: <BlackScholesModule /> },
    { name: "Binomial Model", desc: "Binomial pricing model for pricing assets.", component: <BinomialModule /> },
  ]

  const toggle = (name: string | null) => {
    setOpenProject(prev => (prev === name ? null : name));
  };

  return (
    <div>
      <h3>Projects</h3>
      <div className={style["project-list"]}>
        {projects.map(proj => (
          <div key={proj.name} className={style["project-wrapper"]}>
            
            <div 
              className={style["project-card"]} 
              onClick={() => toggle(proj.name)}
            >
              <h5>{proj.name}</h5>
              <p>{proj.desc}</p>
            </div>

            {openProject === proj.name && (
              <div className={style["expand-panel"]}>
                <div className={style["arrow"]}></div>
                <div className={style["expand-content"]}>
                  {proj.component}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home