import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryProvider } from "./providers/QueryProvider";
import ErrorBoundary from "./components/common/ErrorBoundary/ErrorBoundary";
import LoadingSpinner from "./components/common/LoadingSpinner/LoadingSpinner";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useAnalytics } from "./hooks/useAnalytics";

// Lazy load pages for better performance
const VideoPage = lazy(() => import("./pages/VideoPage"));
const NewsArticlesPage = lazy(() => import("./pages/NewsArticlesPage"));
const JokesPage = lazy(() => import("./pages/JokesPage"));
const WikipediaArticlesPage = lazy(() => import("./pages/WikipediaArticlesPage"));
const MemesPage = lazy(() => import("./pages/MemesPage"));

function App() {
  // Initialize analytics tracking
  useAnalytics();

  return (
    <ErrorBoundary>
      <QueryProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
          <Navbar />
          <main className="relative">
            {/* Hero gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 dark:to-slate-900/20 pointer-events-none"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Suspense fallback={<LoadingSpinner fullScreen message="Loading page..." />}>
                <Routes>
                  <Route path="/" element={<WikipediaArticlesPage />} />
                  <Route path="/newsarticles" element={<NewsArticlesPage />} />
                  <Route path="/videos" element={<VideoPage />} />
                  <Route path="/jokes" element={<JokesPage />} />
                  <Route path="/memes" element={<MemesPage />} />
                </Routes>
              </Suspense>
            </div>
          </main>
          <Footer />
        </div>
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
