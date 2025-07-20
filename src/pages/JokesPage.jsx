import { useState } from "react";
import { Laugh, Smile, ChevronLeft, ChevronRight, Settings, RefreshCw } from "lucide-react";
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
  };

  const PaginationControls = () => (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Page Controls */}
      <div className="flex flex-wrap justify-center items-center gap-3">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center space-x-2 bg-white border border-orange-200 text-orange-700 px-4 py-2 rounded-xl shadow-sm hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: displayPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => handlePageChange(pg)}
              className={`w-10 h-10 rounded-xl font-semibold transition-all duration-200 ${
                page === pg
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/25"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              {pg}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= maxPages}
          className="flex items-center space-x-2 bg-white border border-orange-200 text-orange-700 px-4 py-2 rounded-xl shadow-sm hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Page Size Selector */}
      <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
        <Settings className="w-4 h-4 text-slate-600" />
        <label htmlFor="pageSize" className="text-sm font-medium text-slate-700">
          Jokes per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
          className="text-sm rounded-lg px-3 py-1 border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Laugh className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">
                Joke Central
              </h1>
            </div>
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Need a good laugh? Discover thousands of hilarious jokes to brighten your day 
              and share some smiles with friends.
            </p>
            
            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="flex items-center space-x-2 text-orange-100">
                <Smile className="w-5 h-5" />
                <span className="text-sm font-medium">Daily Laughs</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-100">
                <span className="text-2xl">😂</span>
                <span className="text-sm font-medium">Family Friendly</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-100">
                <span className="text-2xl">🎭</span>
                <span className="text-sm font-medium">All Categories</span>
              </div>
            </div>

            {/* Current page info */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <span className="text-sm font-medium">Currently viewing:</span>
              <span className="text-sm font-bold">{total} jokes available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls */}
        <PaginationControls />

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Oops! Something went wrong</h3>
            <p className="text-slate-600 mb-6">We couldn't load the jokes. Please try again.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl hover:from-orange-600 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Laugh className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <p className="text-lg font-medium text-slate-700 mt-6">Loading hilarious jokes...</p>
            <p className="text-sm text-slate-500 mt-2">Get ready to laugh! 😄</p>
          </div>
        )}

        {/* Jokes Grid */}
        {!loading && !error && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
            {jokes.map((joke, index) => (
              <div
                key={index}
                className="group bg-white border border-orange-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Setup */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">😄</span>
                    </div>
                    <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">Setup</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 leading-relaxed">
                    {joke.setup}
                  </h3>
                </div>

                {/* Punchline */}
                <div className="border-t border-orange-100 pt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">😂</span>
                    </div>
                    <span className="text-xs font-medium text-purple-600 uppercase tracking-wider">Punchline</span>
                  </div>
                  <p className="text-slate-700 font-medium italic leading-relaxed group-hover:text-slate-800 transition-colors duration-300">
                    {joke.punchline}
                  </p>
                </div>

                {/* Decorative border gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Controls */}
        {!loading && !error && <PaginationControls />}
      </div>
    </div>
  );
}

export default JokesPage;
