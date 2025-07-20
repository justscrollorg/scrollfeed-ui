// Custom error types
export class ApiError extends Error {
  constructor(message, status, endpoint) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.endpoint = endpoint;
  }
}

export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

// Error handler utilities
export const handleApiError = (error, context = '') => {
  console.error(`[Error Handler] ${context}:`, error);
  
  if (error.code === 'ECONNABORTED') {
    throw new NetworkError('Request timeout - please check your connection');
  }
  
  if (!error.response) {
    throw new NetworkError('Network error - please check your connection');
  }
  
  const { status, data } = error.response;
  const message = data?.message || data?.error || 'An unexpected error occurred';
  
  throw new ApiError(message, status, error.config?.url);
};

// Retry logic for failed requests
export const withRetry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error.response?.status >= 500) {
      console.warn(`[Retry] Retrying request. ${retries} attempts left.`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

// Global error boundary handler
export const logError = (error, errorInfo) => {
  console.error('[Global Error]:', error);
  console.error('[Error Info]:', errorInfo);
  
  // In production, send to error reporting service
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry.captureException(error);
  }
};
