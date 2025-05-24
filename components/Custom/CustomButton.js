import React from "react";
import "./CustomButton.css";

/* Reference from Assignment 2 */
function CustomButton({ label, type, event, style }) {
  return (
    <div>
      <button
        className="custom_button"
        type={type}
        onClick={event}
        style={style}
      >
        {label}
      </button>
    </div>
  );
}

export default CustomButton;
