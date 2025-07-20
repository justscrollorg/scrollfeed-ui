import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CONFIG } from '../config/apiConfig';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CONFIG.STALE_TIME,
      cacheTime: CONFIG.CACHE_TIME,
      retry: (failureCount, error) => {
        // Don't retry for 4xx errors
        if (error.response?.status >= 400 && error.response?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
});

export const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {CONFIG.isDevelopment && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export { queryClient };
