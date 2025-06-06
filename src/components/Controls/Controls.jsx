import React from "react";

function Controls({ regions, categories, selectedRegion, selectedCategory, maxResults, onRegionChange, onCategoryChange, onMaxResultsChange, onFetchTopVideos }) {
  return (
    <div className="controls">
      <div className="form-group">
        <label>Region</label>
        <select value={selectedRegion} onChange={onRegionChange}>
          {regions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Category</label>
        <select value={selectedCategory} onChange={onCategoryChange}>
          <option value="">Select</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Max Results</label>
        <input type="number" min="1" max="50" value={maxResults} onChange={onMaxResultsChange} />
      </div>

      <button onClick={onFetchTopVideos}>Get Top Videos</button>
    </div>
  );
}

export default Controls;