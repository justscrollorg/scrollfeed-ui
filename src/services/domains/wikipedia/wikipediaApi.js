import httpClient from '../../core/httpClient.js';
import { handleApiError, withRetry } from '../../core/errorHandler.js';
import { API_CONFIG } from '../../../config/apiConfig.js';

// Wikipedia API service class
class WikipediaApiService {
  constructor() {
    this.baseURL = API_CONFIG.ARTICLES_API_BASE;
  }

  // Fetch Wikipedia articles with pagination
  async fetchWikipediaArticles(page = 1, pageSize = 20) {
    try {
      const response = await withRetry(() =>
        httpClient.get(this.baseURL, {
          params: { page, pageSize }
        })
      );

      const data = response.data;
      return {
        articles: data.articles || [],
        total: data.total || 0,
        page: data.page,
        pageSize: data.pageSize,
      };
    } catch (error) {
      handleApiError(error, 'fetchWikipediaArticles');
      return {
        articles: [],
        total: 0,
        page,
        pageSize,
      };
    }
  }

  // Search Wikipedia articles
  async searchWikipediaArticles(query, page = 1, pageSize = 20) {
    try {
      const response = await withRetry(() =>
        httpClient.get(`${this.baseURL}/search`, {
          params: { query, page, pageSize }
        })
      );
      return response.data;
    } catch (error) {
      handleApiError(error, 'searchWikipediaArticles');
      return {
        articles: [],
        total: 0,
        page,
        pageSize,
      };
    }
  }
}

// Export singleton instance
export const wikipediaApiService = new WikipediaApiService();
