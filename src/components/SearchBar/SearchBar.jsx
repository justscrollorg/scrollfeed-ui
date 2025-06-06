import React from "react";

function SearchBar({ query, onQueryChange, onSearch }) {
  return (
    <div className="search-section">
      <input type="text" placeholder="Search for videos..." value={query} onChange={onQueryChange} />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default SearchBar;