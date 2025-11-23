import { Link } from 'react-router-dom';
import styles from './navbar.module.css';


const NavBar = () => {
  
  const options = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" }
  ]

  return (
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
  )
}

export default NavBar;