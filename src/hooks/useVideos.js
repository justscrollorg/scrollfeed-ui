import { useQuery } from '@tanstack/react-query';
import { videoApiService } from '../services';
import { CONFIG } from '../config/apiConfig';

// Query keys for videos
export const VIDEO_QUERY_KEYS = {
  all: ['videos'],
  regions: () => [...VIDEO_QUERY_KEYS.all, 'regions'],
  categories: (region) => [...VIDEO_QUERY_KEYS.all, 'categories', region],
  topVideos: (region, category, maxResults) => [
    ...VIDEO_QUERY_KEYS.all, 'top', region, category, maxResults
  ],
  search: (query, region) => [...VIDEO_QUERY_KEYS.all, 'search', query, region],
};

// Hook for fetching regions
export const useVideoRegions = () => {
  return useQuery({
    queryKey: VIDEO_QUERY_KEYS.regions(),
    queryFn: () => videoApiService.fetchRegions(),
    staleTime: CONFIG.CACHE_TIME, // Regions don't change often
    cacheTime: CONFIG.CACHE_TIME * 2,
  });
};

// Hook for fetching categories by region
export const useVideoCategories = (region) => {
  return useQuery({
    queryKey: VIDEO_QUERY_KEYS.categories(region),
    queryFn: () => videoApiService.fetchCategories(region),
    staleTime: CONFIG.STALE_TIME,
    cacheTime: CONFIG.CACHE_TIME,
    enabled: !!region,
  });
};

// Hook for fetching top videos
export const useTopVideos = (region, category, maxResults = 20) => {
  return useQuery({
    queryKey: VIDEO_QUERY_KEYS.topVideos(region, category, maxResults),
    queryFn: () => videoApiService.fetchTopVideos(region, category, maxResults),
    staleTime: CONFIG.STALE_TIME,
    cacheTime: CONFIG.CACHE_TIME,
    enabled: !!region && !!category,
    keepPreviousData: true,
  });
};

// Hook for searching videos
export const useVideoSearch = (query, region, enabled = true) => {
  return useQuery({
    queryKey: VIDEO_QUERY_KEYS.search(query, region),
    queryFn: () => videoApiService.searchVideos(query, region),
    staleTime: CONFIG.STALE_TIME,
    cacheTime: CONFIG.CACHE_TIME,
    enabled: enabled && !!query && !!region,
  });
};
