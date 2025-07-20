import httpClient from '../core/httpClient.js';
import { handleApiError, withRetry } from '../core/errorHandler.js';
import { API_CONFIG } from '../../config/apiConfig.js';

// News API service class
class NewsApiService {
  constructor() {
    this.baseURL = API_CONFIG.NEWS_API_BASE;
  }

  // Fetch news by region with pagination
  async fetchNewsByRegion(region, page = 1, limit = 33) {
    try {
      const response = await withRetry(() => 
        httpClient.get(`${this.baseURL}/news`, {
          params: { region, page, limit }
        })
      );

      const data = response.data;
      
      // Handle both old format (array) and new format (object with articles and metadata)
      if (Array.isArray(data)) {
        return { articles: data, metadata: {} };
      } else if (data.articles) {
        return data;
      } else {
        console.warn('[NewsAPI] Unexpected response format:', data);
        return { articles: [], metadata: {} };
      }
    } catch (error) {
      handleApiError(error, 'fetchNewsByRegion');
      return { articles: [], metadata: {} };
    }
  }

  // Search news articles
  async searchNews(query, region, page = 1, limit = 20) {
    try {
      const response = await withRetry(() =>
        httpClient.get(`${this.baseURL}/search`, {
          params: { query, region, page, limit }
        })
      );
      return response.data;
    } catch (error) {
      handleApiError(error, 'searchNews');
      return { articles: [], metadata: {} };
    }
  }

  // Get news categories
  async getNewsCategories() {
    try {
      const response = await withRetry(() =>
        httpClient.get(`${this.baseURL}/categories`)
      );
      return response.data;
    } catch (error) {
      handleApiError(error, 'getNewsCategories');
      return [];
    }
  }
}

// Export singleton instance
export const newsApiService = new NewsApiService();
