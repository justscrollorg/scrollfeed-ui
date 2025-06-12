function SearchBar({ query, onQueryChange, onSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <input
          type="text"
          placeholder="Search all trending topics..."
          className="w-full sm:w-2/3 border border-gray-300 px-6 py-3 text-lg rounded-full shadow-sm focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={onQueryChange}
          onKeyDown={handleKeyPress}
        />
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