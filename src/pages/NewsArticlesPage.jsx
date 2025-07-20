// src/pages/NewsArticlesPage.jsx
import React, { useState, useEffect } from "react";
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
      // Update pagination total based on actual data
      const total = newsData.metadata.totalPages * pagination.pageSize;
      pagination.reset();
    }
  }, [newsData?.metadata?.totalPages, currentRegion]);

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
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400">
          Error loading news: {error.message}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Region Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <label htmlFor="region-select" className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Select Region:
        </label>
        <select
          id="region-select"
          value={currentRegion}
          onChange={handleRegionChange}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {regionNames[region] || region.toUpperCase()}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {articles.length} articles available
          {isFetching && !isLoading && " • Updating..."}
        </span>
      </div>

      {/* Loading State */}
      {isLoading && (
        <LoadingSpinner message="Loading news articles..." />
      )}

      {/* News Articles Grid */}
      {!isLoading && (
        <div className="flex flex-wrap gap-4">
          {articles.map((article, index) => (
            <div key={article._id || index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && articles.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No articles found for {regionNames[currentRegion]}
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {!isLoading && articles.length > 0 && (hasNext || hasPrev) && (
        <div className="flex justify-center items-center gap-4 py-6">
          <button
            onClick={pagination.prevPage}
            disabled={!hasPrev || isFetching}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Previous
          </button>
          
          <span className="text-gray-700 dark:text-gray-300">
            Page {pagination.currentPage}
            {isFetching && (
              <span className="ml-2 text-sm text-blue-600">Loading...</span>
            )}
          </span>
          
          <button
            onClick={pagination.nextPage}
            disabled={!hasNext || isFetching}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default NewsArticlesPage;
