import React from "react";
import "../Checkout/Checkout.css";

function DropdownSelection({ selected, setSelected, label }) {
  const toggle = () => {
    setSelected(!selected);
  };

  return (
    <div className="dropdown-header" onClick={toggle}>
      <h4 className="dropdown-text">{label}</h4>
      <span className="dropdown-selection">{selected ? "-" : "+"}</span>
    </div>
  );
}

export default DropdownSelection;
