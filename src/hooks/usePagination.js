import { useState, useCallback, useMemo } from 'react';

export const usePagination = ({
  total = 0,
  initialPage = 1,
  initialPageSize = 20,
  maxPageSize = 100,
  onPageChange,
  onPageSizeChange,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = useMemo(() => 
    Math.ceil(total / pageSize), [total, pageSize]
  );

  const hasNext = useMemo(() => 
    currentPage < totalPages, [currentPage, totalPages]
  );

  const hasPrev = useMemo(() => 
    currentPage > 1, [currentPage]
  );

  const goToPage = useCallback((page) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
    onPageChange?.(validPage);
  }, [totalPages, onPageChange]);

  const nextPage = useCallback(() => {
    if (hasNext) {
      goToPage(currentPage + 1);
    }
  }, [hasNext, currentPage, goToPage]);

  const prevPage = useCallback(() => {
    if (hasPrev) {
      goToPage(currentPage - 1);
    }
  }, [hasPrev, currentPage, goToPage]);

  const changePageSize = useCallback((newSize) => {
    const validSize = Math.max(1, Math.min(newSize, maxPageSize));
    setPageSize(validSize);
    setCurrentPage(1); // Reset to first page
    onPageSizeChange?.(validSize);
  }, [maxPageSize, onPageSizeChange]);

  const reset = useCallback(() => {
    setCurrentPage(initialPage);
    setPageSize(initialPageSize);
  }, [initialPage, initialPageSize]);

  // Generate page numbers for pagination UI
  const getPageNumbers = useCallback((maxButtons = 5) => {
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
  }, [currentPage, totalPages]);

  return {
    // State
    currentPage,
    pageSize,
    totalPages,
    hasNext,
    hasPrev,
    
    // Actions
    goToPage,
    nextPage,
    prevPage,
    changePageSize,
    reset,
    
    // Utilities
    getPageNumbers,
    
    // Computed values
    startIndex: (currentPage - 1) * pageSize,
    endIndex: Math.min(currentPage * pageSize, total),
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
};
