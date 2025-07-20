import { useQuery, useQueryClient } from '@tanstack/react-query';
import { newsApiService } from '../services';
import { CONFIG } from '../config/apiConfig';

// Query keys for consistent caching
export const NEWS_QUERY_KEYS = {
  all: ['news'],
  regions: () => [...NEWS_QUERY_KEYS.all, 'regions'],
  byRegion: (region) => [...NEWS_QUERY_KEYS.all, 'region', region],
  byRegionPaginated: (region, page, limit) => [...NEWS_QUERY_KEYS.byRegion(region), page, limit],
  search: (query, region) => [...NEWS_QUERY_KEYS.all, 'search', query, region],
  categories: () => [...NEWS_QUERY_KEYS.all, 'categories'],
};

// Hook for fetching news by region
export const useNews = (region, page = 1, limit = 33) => {
  return useQuery({
    queryKey: NEWS_QUERY_KEYS.byRegionPaginated(region, page, limit),
    queryFn: () => newsApiService.fetchNewsByRegion(region, page, limit),
    staleTime: CONFIG.STALE_TIME,
    cacheTime: CONFIG.CACHE_TIME,
    enabled: !!region,
    keepPreviousData: true,
    refetchOnWindowFocus: false, // Don't refetch when window gains focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
  });
};

// Hook for searching news
export const useNewsSearch = (query, region, enabled = true) => {
  return useQuery({
    queryKey: NEWS_QUERY_KEYS.search(query, region),
    queryFn: () => newsApiService.searchNews(query, region),
    staleTime: CONFIG.STALE_TIME,
    cacheTime: CONFIG.CACHE_TIME,
    enabled: enabled && !!query && !!region,
  });
};

// Hook for news categories
export const useNewsCategories = () => {
  return useQuery({
    queryKey: NEWS_QUERY_KEYS.categories(),
    queryFn: () => newsApiService.getNewsCategories(),
    staleTime: CONFIG.CACHE_TIME, // Categories change less frequently
    cacheTime: CONFIG.CACHE_TIME * 2,
  });
};

// Hook for prefetching next page
export const usePrefetchNews = () => {
  const queryClient = useQueryClient();

  return (region, nextPage, limit = 33) => {
    queryClient.prefetchQuery({
      queryKey: NEWS_QUERY_KEYS.byRegionPaginated(region, nextPage, limit),
      queryFn: () => newsApiService.fetchNewsByRegion(region, nextPage, limit),
      staleTime: CONFIG.STALE_TIME,
    });
  };
};
