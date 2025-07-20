import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryProvider } from "./providers/QueryProvider";
import ErrorBoundary from "./components/common/ErrorBoundary/ErrorBoundary";
import LoadingSpinner from "./components/common/LoadingSpinner/LoadingSpinner";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Lazy load pages for better performance
const VideoPage = lazy(() => import("./pages/VideoPage"));
const NewsArticlesPage = lazy(() => import("./pages/NewsArticlesPage"));
const JokesPage = lazy(() => import("./pages/JokesPage"));
const WikipediaArticlesPage = lazy(() => import("./pages/WikipediaArticlesPage"));

function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 py-8 font-sans text-gray-800 dark:text-gray-100">
            <Suspense fallback={<LoadingSpinner fullScreen message="Loading page..." />}>
              <Routes>
                <Route path="/" element={<WikipediaArticlesPage />} />
                <Route path="/newsarticles" element={<NewsArticlesPage />} />
                <Route path="/videos" element={<VideoPage />} />
                <Route path="/jokes" element={<JokesPage />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
