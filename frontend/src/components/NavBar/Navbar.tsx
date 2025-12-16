import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { BrowserView, MobileView } from "react-device-detect";


const NavBar = () => {
  
  const options = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" }
  ]

  return (<>
    <BrowserView>
      <div className={styles["nav-container"]}>
        <div className={styles["nav-content"]}>
          <Link to="/" className={styles["logo-container"]}>
            <img src="/favicon.ico" alt="Logo" className={styles["logo-image"]} />
          </Link>
          <div className={styles["link-container"]}>
            {options.map(navItem => (
              <Link to={navItem.link} className={styles["nav-item-container"]} key={navItem.name}>
                {navItem.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </BrowserView>
    <MobileView>
      <div className={styles["mobile-nav-container"]}>
        <div className={styles["nav-content"]}>
          <Link to="/" className={styles["logo-container"]}>
            <img src="/favicon.ico" alt="Logo" className={styles["logo-image"]} />
          </Link>
          <div className={styles["link-container"]}>
            {options.map(navItem => (
              <Link to={navItem.link} className={styles["nav-item-container"]} key={navItem.name}>
                {navItem.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MobileView>
  </>)
}

export default NavBar;