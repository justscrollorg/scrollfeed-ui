import React from 'react';
import { InlineSpinner } from '../LoadingSpinner/LoadingSpinner';

const Pagination = ({
  currentPage,
  totalPages,
  hasNext,
  hasPrev,
  onPageChange,
  onPageSizeChange,
  pageSize,
  pageSizeOptions = [10, 20, 30, 50],
  isLoading = false,
  className = '',
  showPageSize = true,
  maxButtons = 5,
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxButtons / 2);
    
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxButtons - 1);
    
    // Adjust start if we're near the end
    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Main pagination controls */}
      <div className="flex flex-wrap justify-center items-center gap-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev || isLoading}
          className="px-3 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          {isLoading && <InlineSpinner />}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        {/* Page numbers */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={isLoading}
            className={`px-3 py-2 rounded-md font-medium transition-colors ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Show ellipsis if there are more pages */}
        {totalPages > maxButtons && currentPage < totalPages - Math.floor(maxButtons / 2) && (
          <>
            <span className="px-2 text-gray-500">...</span>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={isLoading}
              className="px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:cursor-not-allowed"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext || isLoading}
          className="px-3 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          {isLoading && <InlineSpinner />}
        </button>
      </div>

      {/* Page size selector */}
      {showPageSize && onPageSizeChange && (
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-sm text-gray-700 dark:text-gray-300">
            Items per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
            disabled={isLoading}
            className="text-sm rounded px-2 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:cursor-not-allowed"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Page info */}
      <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
        {totalPages > 0 ? (
          <>
            Page {currentPage} of {totalPages}
            {isLoading && <span className="ml-2 text-blue-600">• Loading...</span>}
          </>
        ) : (
          'No pages to display'
        )}
      </div>
    </div>
  );
};

export default Pagination;
