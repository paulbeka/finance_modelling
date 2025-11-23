import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import BlackScholesModule from "../mini_projects/blackscholes/BlackScholes";
import BinomialModule from "../mini_projects/binomial/BinomialModel";
import style from "./CSS/home.module.css";
import FixedIncomeYieldSolver from "../mini_projects/fi_yield_solver/FixedIncomeYieldSolver";

const ExpandPanel = ({ isOpen, children }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (isOpen) {
      const scrollHeight = ref.current.scrollHeight;
      ref.current.style.height = scrollHeight + "px";
    } else {
      ref.current.style.height = "0px";
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      className={style.expandPanel}
    >
      {isOpen && children}
    </div>
  );
};

const Home = () => {
  const [openProject, setOpenProject] = useState<string | null>(null);

  const miniProjects = [
    {
      name: "Black Scholes",
      desc: "Options pricing using the Black-Scholes–Merton model.",
      component: <BlackScholesModule />,
    },
    {
      name: "Binomial Model",
      desc: "Binomial pricing model for pricing assets.",
      component: <BinomialModule />,
    },
    {
      name: "Fixed-Income Yield Solver",
      desc: "Calculate yield to maturity for fixed-income securities.",
      component: <FixedIncomeYieldSolver />,
    }
  ];

  const largerProjects = [
    { name: "Monte-Carlo Option Price Simulation", 
      desc: "", 
      link: "/monte-carlo" 
    }
  ];

  const toggle = (name: string | null) => {
    setOpenProject((prev) => (prev === name ? null : name));
  };

  return (
    <div>
      <h2>Mini Calculators</h2>

      <div className={style.projectList}>
        {miniProjects.map((proj) => (
          <div key={proj.name} className={style.projectWrapper}>
            <div
              className={style.projectCard}
              onClick={() => toggle(proj.name)}
            >
              <h5>{proj.name}</h5>
              <p>{proj.desc}</p>
            </div>

            <ExpandPanel isOpen={openProject === proj.name}>
              <div className={style.expandContent}>{proj.component}</div>
            </ExpandPanel>
          </div>
        ))}
      </div>

      <h2>Larger Projects</h2>
      <div className={style.projectList}>
        {largerProjects.map((proj) => (
          <div key={proj.name} className={style.projectWrapper}>
            <Link to={`project/${proj.link}`} className={style.projectCard}>
              <h5>{proj.name}</h5>
              <p>{proj.desc}</p>
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Home;
