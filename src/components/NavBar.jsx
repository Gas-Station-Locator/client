import React from "react";
import { Link } from "react-router-dom";
import "./css/NavBar.css";
import Image76 from "../images/76.png";
import ImageChevron from "../images/chevron.png";
import ImageMobil from "../images/mobil.png";

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
      <Link to="/Contact-Us">Contact Us</Link>
    </nav>
  );
};

export default NavBar;
