import styles from "./CSS/about.module.css";

const About = () => {
  const age = (Date.now() - Date.parse("2002/07/22")) / (1000 * 60 * 60 * 24 * 365.25);
  return (
    <div className={styles["about-container"]}>
      <h2>About Me</h2>
      <img src="/small_profile.JPG" alt="Paul Bekaert" style={{ width: "200px", borderRadius: "100px" }} />
      <br />
      <p>
        My name is Paul Bekaert, a {age.toFixed(0)} year old software developer with a passion for finance and mathematical modeling.
      </p>
      <p>
        This project is a collection of financial models and tools I've developed to enhance my understanding of quantitative finance.
      </p>
    </div>
  )
}

export default About;