import React from "react";
import countryCodes from "../../data/countryCodes.json"; 

function RegionSelector({ selectedRegion, onRegionChange }) {
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow px-4 py-2 border-b border-gray-200 flex items-center gap-4">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Region:</label>
      <select
        className="border border-gray-300 px-3 py-1 rounded focus:outline-none"
        value={selectedRegion}
        onChange={onRegionChange}
      >
        {countryCodes.map((region) => (
          <option key={region.code} value={region.code}>
            {region.flag} {region.code}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RegionSelector;
