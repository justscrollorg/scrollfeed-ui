function SearchBar({ query, onQueryChange, onSearch }) {
  return (
    <div className="flex justify-center gap-4 mb-10">
      <input
        type="text"
        placeholder="Search for videos..."
        value={query}
        onChange={onQueryChange}
        className="px-4 py-2 border rounded-md w-80"
      />
      <button
        onClick={onSearch}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
