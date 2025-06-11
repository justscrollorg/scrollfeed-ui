import React, { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white px-4 py-3 flex justify-between items-center">
      <h1 className="font-bold text-xl">Reactions</h1>
      <button className="sm:hidden" onClick={() => setOpen((prev) => !prev)}>
        ☰
      </button>
      <ul className={`sm:flex gap-4 ${open ? "block" : "hidden"}`}>
        <li className="mt-2 sm:mt-0">
          <a href="#" className="hover:underline">
            Home
          </a>
        </li>
        <li className="mt-2 sm:mt-0">
          <a href="#" className="hover:underline">
            About
          </a>
        </li>
        <li className="mt-2 sm:mt-0">
          <a href="#" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
