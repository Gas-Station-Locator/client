import React from "react";
import "./css/About.css";
import doge from "./images/doge.jpg";
import chicken from "./images/chicken.png";
import cat from "./images/pop.jpg";

const About = () => {
  return (
    <div className="about">
      <h1>About</h1>
      <div className="about-container">
        <img src={doge} alt="Description" className="about-image" />
        <p>
          <strong>Ethan Jacinto:</strong><br/>Sophomore at Cal Poly Pomona, graduating next year and hoping to
          become a Software Engineer
        </p>
        <br />
      </div>

      <div className="about-container">
        <p>
        <strong>Cody Apolinar:</strong><br/>
          Senior at Cal Poly Pomona, hoping to get a job as a Software
          Engineer/Dev
        </p>
        <img src={chicken} alt="Description" className="about-image" />
      </div>

      <div className="about-container">
        <img src={cat} alt="Description" className="about-image" />
        <p>
        <strong>Elvin Nguyen:</strong><br/>
          Sophomore at Cal Poly Pomona. I am hoping to become a Software
          Engineer and get a job as a Software Engineer when I graduate
        </p>
      </div>

      <div className="about-container">
        <p>
        <strong>James Salac:</strong><br/>
          Sophomore at Cal Poly Pomona, and I am hoping to become a Software
          Engineer
        </p>
        <img src={cat} alt="Description" className="about-image" />
      </div>
    </div>
  );
};

export default About;
