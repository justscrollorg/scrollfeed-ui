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
    <div className="flex flex-wrap justify-center gap-6 mb-8">
      <div className="flex flex-col min-w-[180px]">
        <label className="font-semibold mb-1">Region</label>
        <select
          value={selectedRegion}
          onChange={onRegionChange}
          className="px-3 py-2 border rounded-md text-sm"
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col min-w-[180px]">
        <label className="font-semibold mb-1">Category</label>
        <select
          value={selectedCategory}
          onChange={onCategoryChange}
          className="px-3 py-2 border rounded-md text-sm"
        >
          <option value="">Select</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col min-w-[120px]">
        <label className="font-semibold mb-1">Max Results</label>
        <input
          type="number"
          min="1"
          max="50"
          value={maxResults}
          onChange={onMaxResultsChange}
          className="px-3 py-2 border rounded-md text-sm"
        />
      </div>

      <button
        onClick={onFetchTopVideos}
        className="self-end bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Get Top Videos
      </button>
    </div>
  );
}

export default Controls;
