import httpClient from '../core/httpClient.js';
import { handleApiError, withRetry } from '../core/errorHandler.js';
import { API_CONFIG } from '../../config/apiConfig.js';

// Jokes API service class
class JokesApiService {
  constructor() {
    this.baseURL = API_CONFIG.JOKES_API_BASE;
  }

  // Fetch jokes with pagination
  async fetchJokes(page = 1, pageSize = 20) {
    try {
      const response = await withRetry(() =>
        httpClient.get(this.baseURL, {
          params: { page, pageSize }
        })
      );

      const data = response.data;
      return {
        jokes: data.jokes || [],
        total: data.total || 0,
        page: data.page,
        pageSize: data.pageSize,
      };
    } catch (error) {
      handleApiError(error, 'fetchJokes');
      return {
        jokes: [],
        total: 0,
        page,
        pageSize,
      };
    }
  }

  // Search jokes
  async searchJokes(query, page = 1, pageSize = 20) {
    try {
      const response = await withRetry(() =>
        httpClient.get(`${this.baseURL}/search`, {
          params: { query, page, pageSize }
        })
      );
      return response.data;
    } catch (error) {
      handleApiError(error, 'searchJokes');
      return {
        jokes: [],
        total: 0,
        page,
        pageSize,
      };
    }
  }

  // Get joke categories
  async getJokeCategories() {
    try {
      const response = await withRetry(() =>
        httpClient.get(`${this.baseURL}/categories`)
      );
      return response.data;
    } catch (error) {
      handleApiError(error, 'getJokeCategories');
      return [];
    }
  }
}

// Export singleton instance
export const jokesApiService = new JokesApiService();
