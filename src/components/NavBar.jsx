import React from "react";
import { Link } from "react-router-dom";
import "./css/NavBar.css";
import Image76 from "../assets/images/76.png";
import ImageChevron from "../assets/images/chevron.png";
import ImageMobil from "../assets/images/mobil.png";

const NavBar = () => {

  return (
    <nav className="nav-container">
      <div id="nav-images">
        <img src={Image76} alt="76 Logo" className="logos" />
        <img src={ImageMobil} alt="Mobil Logo" className="logos" />
        <img src={ImageChevron} alt="Chevron Logo" className="logos" />
      </div>
      <Link to="/Gas-Station-Locator">Gas Station Locator</Link>
      <Link to="/About-Us">About Us</Link>
      <Link to="/Login">Login</Link>
    </nav>
  );
};


export default NavBar;
