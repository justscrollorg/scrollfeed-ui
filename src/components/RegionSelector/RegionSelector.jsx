import React from "react";
import countryCodes from "../../data/countryCodes.json"; // [{ code: "US", flag: "🇺🇸" }, ...]

function RegionSelector({ selectedRegion, onChange, regions }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm">Region:</label>
      <select
        className="border border-gray-300 text-black rounded px-2 py-1"
        value={selectedRegion}
        onChange={onChange}
      >
        {regions.map((code) => {
          const country = countryCodes.find((c) => c.code === code);
          return (
            <option key={code} value={code}>
              {country?.flag || "🏳️"} {code}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default RegionSelector;
