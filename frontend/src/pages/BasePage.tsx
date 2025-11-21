import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/Navbar";
import "./CSS/base.css";
import Footer from "../components/footer/Footer";
import Blocks from "../components/background/Blocks";


const BasePage = () => {
  const isMobile = false;

  return (
    <div className="base-container">
      <Blocks />
      <div>
        {!isMobile && <><div style={{height: "60px"}}/><NavBar /></>}
        <Outlet />
      </div>
      <Footer />
    </div>
  )  
}

export default BasePage;