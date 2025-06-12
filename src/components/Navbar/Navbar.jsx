import RegionSelector from "../RegionSelector/RegionSelector";
import { useState } from "react";

function Navbar({ regions, selectedRegion, onRegionChange }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white px-4 py-3 flex justify-between items-center">
      <h1 className="font-bold text-xl">Reactions</h1>

      <div className="flex gap-4 items-center">
        <RegionSelector
          regions={regions}
          selectedRegion={selectedRegion}
          onChange={onRegionChange}
        />

        <ul className={`sm:flex gap-4 ${open ? "block" : "hidden"}`}>
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">About</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>

        <button className="sm:hidden" onClick={() => setOpen((prev) => !prev)}>☰</button>
      </div>
    </nav>
  );
}

export default Navbar;