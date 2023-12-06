import React from "react";
import "./css/AboutUs.css";
import doge from "./images/doge.jpg";
import chicken from "./images/chicken.png";
import cat from "./images/pop.jpg";

const About = () => {
  return (
    <div className="main">
      <h1>About Us</h1>
      <div className="imageDesc1">
        <img src={doge} alt="Description" className="image" />
        <p>Ethan Jacinto, Sophomore at CPP</p>
      </div>

      <div className="imageDesc1">
        <p>Cody Apolinar, Senior at CPP </p>

        <img src={chicken} alt="Description" className="image" />
      </div>

      <div className="imageDesc1">
        <img src={cat} alt="Description" className="image" />

        <p>Elvin Nguyen, Sophomore at CPP</p>
      </div>

      <div className="imageDesc1">
        <p>James Salac, Sophomore at CPP </p>

        <img src={cat} alt="Description" className="image" />
      </div>
    </div>
  );
};

export default About;
