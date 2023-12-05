import React from "react";
import "./css/Contact.css";
import phone from "./images/phone.png"

const Contact = () => {
  return (
    <div>
		
      <h1>Contact</h1>
	  <div className="imageDesc1">
        <img src={phone} alt="Description"className="image" />
       
		<p>
        Product Support: 911
		Technical Support: 119
		Questions for why gas is more than $5: 1-800-Get-Good
      </p>
        </div>
		</div>

  );
};

export default Contact;
