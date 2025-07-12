import { Link } from "react-router-dom";

function Navbar({ regions, selectedRegion, onRegionChange }) {
  return (
    <nav className="bg-blue-700 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-50 shadow">
      <Link to="/" className="font-bold text-xl">JustScroll</Link>

      <div className="flex items-center gap-4">
        <select
          className="text-black px-2 py-1 rounded"
          value={selectedRegion}
          onChange={onRegionChange}
        >
          {regions?.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>

        <ul className="hidden sm:flex gap-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/articles" className="hover:underline">Articles</Link></li>
          <li><Link to="/jokes" className="hover:underline">Jokes</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
