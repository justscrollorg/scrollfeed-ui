import { useEffect, useState } from "react";
import { fetchJokes } from "../services/jokeApi";

function JokesPage() {
  const [jokes, setJokes] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);

  const fetchAndSetJokes = async (newPage, newSize = pageSize) => {
    setLoading(true);
    const { jokes, total } = await fetchJokes(newPage, newSize);
    setJokes(jokes);
    setTotal(total);
    setPage(newPage);
    setPageSize(newSize);
    setLoading(false);
  };

  useEffect(() => {
    fetchAndSetJokes(page, pageSize);
  }, []);

  const maxPages = Math.ceil(total / pageSize);
  const maxPagesAllowed = 10;
  const displayPages = Math.min(maxPages, maxPagesAllowed);

  const PaginationControls = () => (
    <div className="flex flex-col items-center gap-4 mt-6">
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => fetchAndSetJokes(page - 1)}
          disabled={page === 1}
          className="bg-purple-700 text-yellow-100 px-4 py-2 rounded shadow hover:bg-purple-800 transition disabled:opacity-50 italic"
        >
          ← Previous
        </button>

        {Array.from({ length: displayPages }, (_, i) => i + 1).map((pg) => (
          <button
            key={pg}
            onClick={() => fetchAndSetJokes(pg)}
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
          onClick={() => fetchAndSetJokes(page + 1)}
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
          onChange={(e) => fetchAndSetJokes(1, parseInt(e.target.value))}
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

      {loading ? (
        <div className="text-center text-lg italic mt-8">Loading...</div>
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
