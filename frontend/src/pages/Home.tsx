import { useState, useRef, useEffect } from "react";
import BlackScholesModule from "../projects/blackscholes/BlackScholes";
import BinomialModule from "../projects/binomial/BinomialModel";
import style from "./CSS/home.module.css";

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
      {children}
    </div>
  );
};

const Home = () => {
  const [openProject, setOpenProject] = useState<string | null>(null);

  const projects = [
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
  ];

  const toggle = (name: string | null) => {
    setOpenProject((prev) => (prev === name ? null : name));
  };

  return (
    <div>
      <h2>Projects</h2>

      <div className={style.projectList}>
        {projects.map((proj) => (
          <div key={proj.name} className={style.projectWrapper}>
            <div
              className={style.projectCard}
              onClick={() => toggle(proj.name)}
            >
              <h5>{proj.name}</h5>
              <p>{proj.desc}</p>
            </div>

            <ExpandPanel isOpen={openProject === proj.name}>
              <div className={style.arrow}></div>
              <div className={style.expandContent}>{proj.component}</div>
            </ExpandPanel>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
