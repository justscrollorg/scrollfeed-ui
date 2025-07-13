import { useEffect, useState } from "react";
import { fetchWikipediaArticles } from "../services/wikipediaApi";

function WikipediaArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async (newPage, newSize = pageSize) => {
    setLoading(true);
    const { articles, total } = await fetchWikipediaArticles(newPage, newSize);
    setArticles(articles);
    setTotal(total);
    setPage(newPage);
    setPageSize(newSize);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles(page, pageSize);
  }, []);

  const maxPages = Math.ceil(total / pageSize);

  const PaginationControls = () => (
    <div className="flex flex-col items-center gap-4 mt-6">
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => fetchArticles(page - 1)}
          disabled={page === 1}
          className="bg-blue-700 text-yellow-100 px-4 py-2 rounded shadow hover:bg-blue-800 transition disabled:opacity-50 italic"
        >
          ← Previous
        </button>

        {Array.from({ length: maxPages }, (_, i) => i + 1).map((pg) => (
          <button
            key={pg}
            onClick={() => fetchArticles(pg)}
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
          onClick={() => fetchArticles(page + 1)}
          disabled={page >= maxPages}
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
          onChange={(e) => fetchArticles(1, parseInt(e.target.value))}
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
      {/* <h1 className="text-3xl font-bold text-green-700 mb-6">
        Random Articles
      </h1> */}

      <PaginationControls />

      {loading ? (
        <div className="text-center text-lg italic mt-8">Loading...</div>
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
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="mb-2 w-full h-40 object-cover rounded"
                />
              )}
              <p className="text-sm text-gray-600 mb-2 italic">
                {article.extract}
              </p>
              <a
                href={article.url}
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
