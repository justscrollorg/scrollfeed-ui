import { useQuery } from '@tanstack/react-query';
import { jokesApiService } from '../services';
import { CONFIG } from '../config/apiConfig';

// Query keys for jokes
export const JOKES_QUERY_KEYS = {
  all: ['jokes'],
  jokes: (page, pageSize) => [...JOKES_QUERY_KEYS.all, 'list', page, pageSize],
  search: (query, page, pageSize) => [...JOKES_QUERY_KEYS.all, 'search', query, page, pageSize],
  categories: () => [...JOKES_QUERY_KEYS.all, 'categories'],
};

// Hook for fetching jokes
export const useJokes = (page = 1, pageSize = 20) => {
  return useQuery({
    queryKey: JOKES_QUERY_KEYS.jokes(page, pageSize),
    queryFn: () => jokesApiService.fetchJokes(page, pageSize),
    staleTime: CONFIG.STALE_TIME,
    cacheTime: CONFIG.CACHE_TIME,
    keepPreviousData: true,
  });
};

// Hook for searching jokes
export const useJokesSearch = (query, page = 1, pageSize = 20, enabled = true) => {
  return useQuery({
    queryKey: JOKES_QUERY_KEYS.search(query, page, pageSize),
    queryFn: () => jokesApiService.searchJokes(query, page, pageSize),
    staleTime: CONFIG.STALE_TIME,
    cacheTime: CONFIG.CACHE_TIME,
    enabled: enabled && !!query,
    keepPreviousData: true,
  });
};

// Hook for joke categories
export const useJokeCategories = () => {
  return useQuery({
    queryKey: JOKES_QUERY_KEYS.categories(),
    queryFn: () => jokesApiService.getJokeCategories(),
    staleTime: CONFIG.CACHE_TIME,
    cacheTime: CONFIG.CACHE_TIME * 2,
  });
};
