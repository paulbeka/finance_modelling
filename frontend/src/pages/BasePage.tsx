import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/Navbar";
import "./CSS/base.css";
import Footer from "../components/footer/Footer";
import Blocks from "../components/background/Blocks";
import { isMobile } from "react-device-detect";


const BasePage = () => {
  return (
    <div className={isMobile? "mobile-base-container" : "base-container"}>
      <Blocks />
      <div>
        <div style={{height: "60px"}}/><NavBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  )  
}

export default BasePage;