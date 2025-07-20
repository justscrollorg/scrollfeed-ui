import httpClient from '../core/httpClient.js';
import { handleApiError, withRetry } from '../core/errorHandler.js';
import { API_CONFIG } from '../../config/apiConfig.js';

// Video API service class
class VideoApiService {
  constructor() {
    this.baseURL = API_CONFIG.API_BASE;
  }

  // Fetch regions
  async fetchRegions() {
    try {
      const response = await withRetry(() =>
        httpClient.get(`${this.baseURL}/regions`)
      );
      return response.data;
    } catch (error) {
      handleApiError(error, 'fetchRegions');
      return { regions: ["US", "IN", "DE"] }; // fallback
    }
  }

  // Fetch categories by region
  async fetchCategories(region) {
    try {
      const response = await withRetry(() =>
        httpClient.get(`${this.baseURL}/categories`, {
          params: { region }
        })
      );
      return response.data;
    } catch (error) {
      handleApiError(error, 'fetchCategories');
      return [];
    }
  }

  // Fetch top videos
  async fetchTopVideos(region, category, maxResults = 20) {
    try {
      const response = await withRetry(() =>
        httpClient.get(`${this.baseURL}/videos`, {
          params: { region, category, maxResults }
        })
      );
      return response.data;
    } catch (error) {
      handleApiError(error, 'fetchTopVideos');
      return [];
    }
  }

  // Search videos
  async searchVideos(query, region) {
    try {
      const response = await withRetry(() =>
        httpClient.get(`${this.baseURL}/search`, {
          params: { query, region }
        })
      );
      return response.data;
    } catch (error) {
      handleApiError(error, 'searchVideos');
      return { items: [] };
    }
  }
}

// Export singleton instance
export const videoApiService = new VideoApiService();
