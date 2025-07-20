// Environment-based configuration
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// API Base URLs - these can be environment variables
const API_ENDPOINTS = {
  development: {
    API_BASE: "/api",
    NEWS_API_BASE: "/news-api",
    ARTICLES_API_BASE: "/articles-api",
    JOKES_API_BASE: "/jokes-api",
  },
  production: {
    API_BASE: process.env.REACT_APP_API_BASE || "/api",
    NEWS_API_BASE: process.env.REACT_APP_NEWS_API_BASE || "/news-api",
    ARTICLES_API_BASE: process.env.REACT_APP_ARTICLES_API_BASE || "/articles-api",
    JOKES_API_BASE: process.env.REACT_APP_JOKES_API_BASE || "/jokes-api",
  }
};

// Get current environment config
const currentEnv = isProduction ? 'production' : 'development';
export const API_CONFIG = API_ENDPOINTS[currentEnv];

// Common configuration
export const CONFIG = {
  // API Settings
  API_TIMEOUT: 10000,
  API_RETRY_ATTEMPTS: 3,
  
  // Pagination defaults
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // Cache settings
  CACHE_TIME: 5 * 60 * 1000, // 5 minutes
  STALE_TIME: 2 * 60 * 1000, // 2 minutes
  
  // Feature flags
  FEATURES: {
    ENABLE_DARK_MODE: true,
    ENABLE_ANALYTICS: isProduction,
    ENABLE_ERROR_REPORTING: isProduction,
  },
  
  // App metadata
  APP_NAME: 'JustScroll',
  APP_VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  
  // Environment flags
  isDevelopment,
  isProduction,
};
