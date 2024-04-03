import React from "react";
import "./Menu.css";

const Menu = ({ children, onSelect, isSelected }) => {
  return (
    <li className="list">
      <button
        className={`btn ${isSelected ? "active" : ""}`}
        onClick={onSelect}
      >
        {children}
      </button>
    </li>
  );
};

export default Menu;