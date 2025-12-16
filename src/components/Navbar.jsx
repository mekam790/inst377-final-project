import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <div className="nav">
      <ul id="navbar">
        <li className="navitem">
          <NavLink to="/about">About Me</NavLink>
        </li>
        <li className="navitem">
          <NavLink to="/metrics">Metrics</NavLink>
        </li>
        <li className="navitem">
          <NavLink to="/tracking">Tracking</NavLink>
        </li>
        <li className="navitem">
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
