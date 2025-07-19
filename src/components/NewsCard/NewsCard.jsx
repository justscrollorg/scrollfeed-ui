import React, { useState } from "react";

function NewsCard({ article }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  console.log("[NewsCard] Rendering article:", article);

  const hasValidImage = article.image && article.image.trim() !== "" && !imageError;
  const placeholderImage = "https://via.placeholder.com/400x200/e5e7eb/6b7280?text=No+Image+Available";

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="mb-4 bg-white shadow rounded overflow-hidden dark:bg-gray-800 hover:shadow-lg transition-shadow">
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <div className="relative">
          {/* Main Image */}
          <img
            src={hasValidImage ? article.image : placeholderImage}
            alt={article.title || "News Thumbnail"}
            className="w-full h-40 object-cover"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
          
          {/* Loading overlay */}
          {imageLoading && hasValidImage && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
              <div className="text-gray-400 text-sm">Loading...</div>
            </div>
          )}
          
          {/* Region badge */}
          {article.topic && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
              {article.topic.toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="p-3">
          <h3 className="font-semibold text-md text-blue-700 dark:text-white line-clamp-2 leading-tight mb-2">
            {article.title || "No Title"}
          </h3>

          {article.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
              {article.description}
            </p>
          )}

          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-300">
            {article.source?.name && (
              <span className="italic truncate">
                {article.source.name}
              </span>
            )}

            {article.publishedAt && (
              <span className="flex-shrink-0 ml-2">
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}

export default NewsCard;
