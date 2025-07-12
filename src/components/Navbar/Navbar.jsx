import { Link } from "react-router-dom";

function Navbar({ regions, selectedRegion, onRegionChange }) {
  return (
    <nav className="bg-blue-700 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-50 shadow">
      {/* Left: Logo */}
      <div className="flex-1">
        <Link to="/" className="font-bold text-xl">
          JustScroll
        </Link>
      </div>

      {/* Center: Nav Links */}
      <ul className="flex-1 flex justify-center gap-6 text-md font-medium">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/newsarticles" className="hover:underline">
            Articles
          </Link>
        </li>
        <li>
          <Link to="/jokes" className="hover:underline">
            Jokes
          </Link>
        </li>
      </ul>

      {/* Right: Region Selector */}
      <div className="flex-1 flex justify-end">
        <select
          className="text-black px-2 py-1 rounded"
          value={selectedRegion}
          onChange={onRegionChange}
        >
          {regions?.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}

export default Navbar;
