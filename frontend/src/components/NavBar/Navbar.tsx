import { Link } from 'react-router-dom';


const NavBar = () => {
  
  const options = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Project", link: "/project" }
  ]

  return (
    <div className="nav-container">
      <div className="logo-container"></div>
      <div className="link-container">
        {options.map(navItem => (
          <Link to={navItem.link} className="nav-item-container">
            {navItem.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NavBar;