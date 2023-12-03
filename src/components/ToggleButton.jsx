import React from "react";

const ToggleButton = ({ onClick, styles }) => {
  return (
    <button className="change-map-style" onClick={onClick} style={styles}>
      Toggle
    </button>
  );
};

export default ToggleButton;
