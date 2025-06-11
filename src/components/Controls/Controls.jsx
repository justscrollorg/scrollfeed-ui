import React from "react";

function Controls({
  regions,
  categories,
  selectedRegion,
  selectedCategory,
  maxResults,
  onRegionChange,
  onCategoryChange,
  onMaxResultsChange,
  onFetchTopVideos,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div>
        <label className="block mb-1 font-semibold">Region</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={selectedRegion}
          onChange={onRegionChange}
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Category</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={selectedCategory}
          onChange={onCategoryChange}
        >
          <option value="">Select</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Max Results</label>
        <input
          type="number"
          min="1"
          max="50"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={maxResults}
          onChange={onMaxResultsChange}
        />
      </div>

      <div className="flex items-end">
        <button
          onClick={onFetchTopVideos}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Get Top Videos
        </button>
      </div>
    </div>
  );
}

export default Controls;
