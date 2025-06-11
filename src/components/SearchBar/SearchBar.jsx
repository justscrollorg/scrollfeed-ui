import React from "react";

function SearchBar({ query, onQueryChange, onSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Search for videos..."
        className="flex-grow border border-gray-300 px-4 py-2 rounded"
        value={query}
        onChange={onQueryChange}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={onSearch}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
