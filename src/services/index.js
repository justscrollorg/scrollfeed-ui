// Core services
export { default as httpClient } from './core/httpClient.js';
export * from './core/errorHandler.js';

// Domain services
export { newsApiService } from './domains/news/newsApi.js';
export { videoApiService } from './domains/videos/videoApi.js';
export { wikipediaApiService } from './domains/wikipedia/wikipediaApi.js';
export { jokesApiService } from './domains/jokes/jokesApi.js';

// For backward compatibility, export individual functions
export const fetchRegions = () => videoApiService.fetchRegions();
export const fetchCategories = (region) => videoApiService.fetchCategories(region);
export const fetchTopVideos = (region, category, maxResults) => 
  videoApiService.fetchTopVideos(region, category, maxResults);
export const searchVideos = (query, region) => 
  videoApiService.searchVideos(query, region);

export const fetchNewsByRegion = (region, page, limit) => 
  newsApiService.fetchNewsByRegion(region, page, limit);

export const fetchWikipediaArticles = (page, pageSize) => 
  wikipediaApiService.fetchWikipediaArticles(page, pageSize);

export const fetchJokes = (page, pageSize) => 
  jokesApiService.fetchJokes(page, pageSize);
