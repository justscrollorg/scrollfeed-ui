// src/pages/NewsArticlesPage.jsx
import React, { useState, useEffect } from "react";
import { Newspaper, Globe, Clock, TrendingUp, Filter, Search, ChevronRight } from "lucide-react";
import { useNews, usePrefetchNews } from "../hooks/useNews";
import { useVideoRegions } from "../hooks/useVideos";
import { usePagination } from "../hooks/usePagination";
import { useAppStore } from "../store/appStore";
import NewsCard from "../components/NewsCard/NewsCard";
import LoadingSpinner from "../components/common/LoadingSpinner/LoadingSpinner";

function NewsArticlesPage() {
  const { selectedRegion, setSelectedRegion } = useAppStore();
  const [currentRegion, setCurrentRegion] = useState(selectedRegion.toLowerCase());
  
  // Initialize pagination
  const pagination = usePagination({
    initialPage: 1,
    initialPageSize: 33,
    onPageChange: (page) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Fetch regions
  const { data: regionsData } = useVideoRegions();
  const regions = regionsData?.regions || ["us", "in", "de"];

  // Fetch news data
  const { 
    data: newsData, 
    isLoading, 
    error, 
    isFetching 
  } = useNews(currentRegion, pagination.currentPage, pagination.pageSize);

  // Prefetch next page for better UX
  const prefetchNews = usePrefetchNews();

  // Update pagination when data changes
  useEffect(() => {
    if (newsData?.metadata?.totalPages) {
      // Reset pagination when data changes
      pagination.reset();
    }
  }, [newsData?.metadata?.totalPages, currentRegion, pagination]);

  // Prefetch next page when current page loads
  useEffect(() => {
    if (newsData?.metadata?.hasNext) {
      prefetchNews(currentRegion, pagination.currentPage + 1, pagination.pageSize);
    }
  }, [newsData, currentRegion, pagination.currentPage, pagination.pageSize, prefetchNews]);

  // Region mapping for display
  const regionNames = {
    us: "United States",
    in: "India", 
    de: "Germany"
  };

  const handleRegionChange = (event) => {
    const newRegion = event.target.value;
    setCurrentRegion(newRegion);
    setSelectedRegion(newRegion.toUpperCase());
    pagination.reset();
  };

  const articles = newsData?.articles || [];
  const hasNext = newsData?.metadata?.hasNext || false;
  const hasPrev = newsData?.metadata?.hasPrev || false;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Newspaper className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Unable to Load News</h3>
          <p className="text-slate-600 mb-4">
            {error.message}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">
                News Center
              </h1>
            </div>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stay informed with breaking news and top stories from around the world. 
              Real-time updates from trusted sources.
            </p>
            
            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="flex items-center space-x-2 text-emerald-100">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Breaking News</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-100">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">Global Coverage</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-100">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">Real-time Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls Section */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-slate-600" />
                <span className="text-lg font-semibold text-slate-800">Filter by Region:</span>
              </div>
              <div className="relative">
                <select
                  id="region-select"
                  value={currentRegion}
                  onChange={handleRegionChange}
                  className="appearance-none pl-4 pr-10 py-3 border border-slate-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 font-medium min-w-[200px]"
                  disabled={isLoading}
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {regionNames[region] || region.toUpperCase()}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 rounded-xl">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-emerald-700">
                  {articles.length} articles available
                </span>
              </div>
              {isFetching && !isLoading && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-sm font-medium">Updating...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
          <span>News</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium">{regionNames[currentRegion]}</span>
          {pagination.currentPage > 1 && (
            <>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">Page {pagination.currentPage}</span>
            </>
          )}
        </nav>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <LoadingSpinner 
              message="Loading latest news..." 
              variant="spinner"
              size="large"
            />
          </div>
        )}

        {/* News Articles Grid */}
        {!isLoading && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {articles.map((article, index) => (
              <div key={article._id || index} className="transform transition-all duration-200 hover:scale-105">
                <NewsCard article={article} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && articles.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Articles Found</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              No articles found for {regionNames[currentRegion]}. Try selecting a different region or check back later.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {!isLoading && articles.length > 0 && (hasNext || hasPrev) && (
          <div className="flex justify-center items-center gap-4 py-8">
            <button
              onClick={pagination.prevPage}
              disabled={!hasPrev || isFetching}
              className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-medium shadow-sm"
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium shadow-lg">
              <span>Page {pagination.currentPage}</span>
              {isFetching && (
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              )}
            </div>
            
            <button
              onClick={pagination.nextPage}
              disabled={!hasNext || isFetching}
              className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-medium shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsArticlesPage;
