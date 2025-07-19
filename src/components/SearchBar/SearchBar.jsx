function SearchBar({ query, onQueryChange, onSearch, onClear }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <div className="relative w-full sm:w-2/3">
          <input
            type="text"
            placeholder="Search all trending topics..."
            className="w-full border border-gray-300 px-6 py-3 text-lg rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 pr-12"
            value={query}
            onChange={onQueryChange}
            onKeyDown={handleKeyPress}
          />
          {query && (
            <button
              onClick={onClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              title="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <button
          onClick={onSearch}
          className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-full hover:bg-green-700 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;