import { useState } from "react";
import { useWikipediaArticles } from "../hooks/useWikipedia";

function WikipediaArticlesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Use React Query hook for better caching and performance
  const { data, isLoading: loading, error } = useWikipediaArticles(page, pageSize);
  
  const articles = data?.articles || [];
  const total = data?.total || 0;

  const maxPages = Math.ceil(total / pageSize);

  const PaginationControls = () => {
    const maxPagesAllowed = 10;
    const actualMaxPages = Math.ceil(total / pageSize);
    const displayPages = Math.min(actualMaxPages, maxPagesAllowed);

    const handlePageChange = (newPage) => {
      setPage(newPage);
    };

    const handlePageSizeChange = (newPageSize) => {
      setPageSize(newPageSize);
      setPage(1); // Reset to first page when changing page size
    };

    return (
      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="bg-blue-700 text-yellow-100 px-4 py-2 rounded shadow hover:bg-blue-800 transition disabled:opacity-50 italic"
          >
            ← Previous
          </button>

          {Array.from({ length: displayPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => handlePageChange(pg)}
              className={`px-3 py-2 rounded shadow italic transition font-semibold ${
                page === pg
                  ? "bg-yellow-300 text-blue-900"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {pg}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= actualMaxPages}
            className="bg-blue-700 text-yellow-100 px-4 py-2 rounded shadow hover:bg-blue-800 transition disabled:opacity-50 italic"
          >
            Next →
          </button>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <label htmlFor="pageSize" className="text-sm text-gray-700 italic">
            Articles per page:
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
  };


  return (
    <>
      {/* <h1 className="text-3xl font-bold text-green-700 mb-6">
        Random Articles
      </h1> */}

      <PaginationControls />

      {error ? (
        <div className="text-center text-red-600 mt-8">
          <p>Error loading articles. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reload
          </button>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-lg italic mt-4">Loading articles...</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {articles.map((article, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white p-4 shadow rounded"
            >
              <h2 className="font-semibold text-lg mb-2 italic">
                {article.title}
              </h2>
              {article.thumbnail?.source ? (
                <img
                  src={article.thumbnail.source}
                  alt={article.title}
                  className="mb-2 w-full h-40 object-cover rounded"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="mb-2 w-full h-40 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-sm">📄</span>
                </div>
              )}
              <p className="text-sm text-gray-600 mb-2 italic">
                {article.extract}
              </p>
              <a
                href={article.content_urls?.desktop?.page}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm italic"
              >
                View on Wikipedia
              </a>
            </div>
          ))}
        </div>
      )}

      <PaginationControls />
    </>
  );
}

export default WikipediaArticlesPage;
