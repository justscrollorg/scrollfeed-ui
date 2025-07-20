import { useState } from "react";
import { useJokes } from "../hooks/useJokes";

function JokesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Use React Query hook for better caching and performance
  const { data, isLoading: loading, error } = useJokes(page, pageSize);
  
  const jokes = data?.jokes || [];
  const total = data?.total || 0;

  const maxPages = Math.ceil(total / pageSize);
  const maxPagesAllowed = 10;
  const displayPages = Math.min(maxPages, maxPagesAllowed);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
  };

  const PaginationControls = () => (
    <div className="flex flex-col items-center gap-4 mt-6">
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-purple-700 text-yellow-100 px-4 py-2 rounded shadow hover:bg-purple-800 transition disabled:opacity-50 italic"
        >
          ← Previous
        </button>

        {Array.from({ length: displayPages }, (_, i) => i + 1).map((pg) => (
          <button
            key={pg}
            onClick={() => handlePageChange(pg)}
            className={`px-3 py-2 rounded shadow italic transition font-semibold ${
              page === pg
                ? "bg-yellow-300 text-purple-900"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {pg}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= maxPages}
          className="bg-purple-700 text-yellow-100 px-4 py-2 rounded shadow hover:bg-purple-800 transition disabled:opacity-50 italic"
        >
          Next →
        </button>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <label htmlFor="pageSize" className="text-sm text-gray-700 italic">
          Jokes per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
          className="text-sm rounded px-2 py-1 border border-gray-300"
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <>
      <PaginationControls />

      {error ? (
        <div className="text-center text-red-600 mt-8">
          <p>Error loading jokes. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Reload
          </button>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="text-lg italic mt-4">Loading jokes...</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jokes.map((joke, index) => (
            <div
              key={index}
              className="bg-yellow-50 border border-yellow-200 p-4 rounded shadow"
            >
              <h2 className="text-lg font-semibold italic text-purple-800 mb-2">
                {joke.setup}
              </h2>
              <p className="text-gray-700 italic">{joke.punchline}</p>
            </div>
          ))}
        </div>
      )}

      <PaginationControls />
    </>
  );
}

export default JokesPage;
