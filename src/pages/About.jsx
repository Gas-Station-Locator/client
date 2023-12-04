import React from "react";
import "./css/AboutUs.css";
import doge from "./images/doge.jpg";

const About = () => {
  return (
    <div className="main">
      <h1>About</h1>
      <div className="imageDesc1">
        <img src={doge} alt="Description"className="image" />
        <div className="text-container">
          <p>Sample Text Hyperspace cam LLLLLLLl
			LLLLLLLLLLLLLLLLLLLLLLLLLLLLL </p>
        </div>
      </div>

	  <div className="imageDesc2">
        
        <div className="text-container">
          <p>Sample Text Hyperspace cam </p>
        </div>
		<img src={doge} alt="Description"className="image" />
      </div>

	  <div className="imageDesc2">
        <img src={doge} alt="Description"className="image" />
        <div className="text-container">
          <p>Sample Text Hyperspace cam </p>
        </div>
      </div>

	  <div className="imageDesc2">
        
        <div className="text-container">
          <p>Sample Text Hyperspace cam </p>
        </div>
		<img src={doge} alt="Description"className="image" />
      </div>

	  

	  

    </div>
  );
};

export default About;
