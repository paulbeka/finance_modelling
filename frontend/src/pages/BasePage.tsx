import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import "./CSS/base.css";


const BasePage = () => {
  const isMobile = false;

  return (
    <div className="base-container">
      {isMobile && <NavBar />}
      <Outlet />
    </div>
  )  
}

export default BasePage;