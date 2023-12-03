  import React from "react";
  import "./css/PopUp.css";

  const PopUp = ({ onClose }) => {
    return (
      <div className="popup">
        <span className="close-button" onClick={onClose}>&times;</span>
        <div className="popup-content" />
      </div>
    )
  };

  export default PopUp;
