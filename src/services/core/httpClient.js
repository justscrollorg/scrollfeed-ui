import axios from 'axios';

// Create axios instance with default config
const httpClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Add auth tokens, logging, etc.
    console.log(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[HTTP] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => {
    console.log(`[HTTP] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('[HTTP] Response error:', error.response?.status, error.message);
    
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.warn('[HTTP] Unauthorized access');
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error('[HTTP] Server error');
    }
    
    return Promise.reject(error);
  }
);

export default httpClient;
