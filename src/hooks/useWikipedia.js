import { useQuery } from '@tanstack/react-query';
import { wikipediaApiService } from '../services';
import { CONFIG } from '../config/apiConfig';

// Query keys for Wikipedia
export const WIKIPEDIA_QUERY_KEYS = {
  all: ['wikipedia'],
  articles: (page, pageSize) => [...WIKIPEDIA_QUERY_KEYS.all, 'articles', page, pageSize],
  search: (query, page, pageSize) => [...WIKIPEDIA_QUERY_KEYS.all, 'search', query, page, pageSize],
};

// Hook for fetching Wikipedia articles
export const useWikipediaArticles = (page = 1, pageSize = 20) => {
  return useQuery({
    queryKey: WIKIPEDIA_QUERY_KEYS.articles(page, pageSize),
    queryFn: () => wikipediaApiService.fetchWikipediaArticles(page, pageSize),
    staleTime: CONFIG.STALE_TIME,
    cacheTime: CONFIG.CACHE_TIME,
    keepPreviousData: true,
  });
};

// Hook for searching Wikipedia articles
export const useWikipediaSearch = (query, page = 1, pageSize = 20, enabled = true) => {
  return useQuery({
    queryKey: WIKIPEDIA_QUERY_KEYS.search(query, page, pageSize),
    queryFn: () => wikipediaApiService.searchWikipediaArticles(query, page, pageSize),
    staleTime: CONFIG.STALE_TIME,
    cacheTime: CONFIG.CACHE_TIME,
    enabled: enabled && !!query,
    keepPreviousData: true,
  });
};
