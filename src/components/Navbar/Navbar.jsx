import React, { useState } from "react";
import RegionSelector from "../RegionSelector/RegionSelector";

function Navbar({ regions, selectedRegion, onRegionChange }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-50 shadow">
      <h1 className="font-bold text-xl">Reactions</h1>

      <div className="flex items-center gap-4">
        <RegionSelector
          regions={regions}
          selectedRegion={selectedRegion}
          onChange={onRegionChange}
        />

        <ul className="hidden sm:flex gap-4">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">About</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>

        <button className="sm:hidden" onClick={() => setOpen(!open)}>☰</button>
      </div>
    </nav>
  );
}

export default Navbar;
