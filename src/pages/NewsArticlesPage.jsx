// src/pages/NewsArticlesPage.jsx
import { useEffect, useState } from "react";
import { fetchRegions } from "../services/api";
import { fetchNewsByRegion } from "../services/newsApi";
import NewsCard from "../components/NewsCard/NewsCard";

function NewsArticlesPage() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("us");
  const [newsArticles, setNewsArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  // Region mapping for display
  const regionNames = {
    us: "United States",
    in: "India", 
    de: "Germany"
  };

  useEffect(() => {
    fetchRegions().then((response) => {
      const regionList = response.regions || ["us", "in", "de"];
      setRegions(regionList);
    });
  }, []);

  const loadNews = async (region, page = 1) => {
    setIsLoading(true);
    try {
      const response = await fetchNewsByRegion(region, page);
      if (response && response.articles) {
        setNewsArticles(response.articles);
        setTotalPages(response.metadata?.totalPages || 1);
        setHasNext(response.metadata?.hasNext || false);
        setHasPrev(response.metadata?.hasPrev || false);
      } else {
        // Fallback for non-paginated response
        setNewsArticles(response || []);
      }
    } catch (error) {
      console.error("Error loading news:", error);
      setNewsArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRegion) {
      setCurrentPage(1);
      loadNews(selectedRegion, 1);
    }
  }, [selectedRegion]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    loadNews(selectedRegion, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Region Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <label htmlFor="region-select" className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Select Region:
        </label>
        <select
          id="region-select"
          value={selectedRegion}
          onChange={handleRegionChange}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {regionNames[region] || region.toUpperCase()}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {newsArticles.length} articles available
        </span>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* News Articles Grid */}
      {!isLoading && (
        <div className="flex flex-wrap gap-4">
          {newsArticles.map((article, index) => (
            <div key={article._id || index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && newsArticles.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No articles found for {regionNames[selectedRegion]}</p>
        </div>
      )}

      {/* Pagination Controls */}
      {!isLoading && newsArticles.length > 0 && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 py-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!hasPrev}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Previous
          </button>
          
          <span className="text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNext}
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
