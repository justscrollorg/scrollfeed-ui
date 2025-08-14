import React from "react";
import { NavLink } from "react-router-dom";

const MemesNavLink = () => (
  <NavLink
    to="/memes"
    className={({ isActive }) =>
      isActive ? "text-blue-600 font-bold" : "text-gray-700"
    }
  >
    Memes
  </NavLink>
);

export default MemesNavLink;
