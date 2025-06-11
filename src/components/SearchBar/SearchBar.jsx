import React from "react";

function SearchBar({ query, onQueryChange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-section flex gap-2 justify-center">
      <input
        type="text"
        placeholder="Search for videos..."
        value={query}
        onChange={onQueryChange}
        onKeyDown={handleKeyDown} // <-- trigger search on Enter
        className="border border-gray-400 px-4 py-2 rounded w-80"
      />
      <button
        onClick={onSearch}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
