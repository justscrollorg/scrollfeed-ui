import React from "react";

function NewsCard({ article }) {
  console.log("[NewsCard] Rendering article:", article);

  const thumbnail =
    article.image || "https://via.placeholder.com/400x200?text=No+Image";

  return (
    <div className="mb-4 bg-white shadow rounded overflow-hidden dark:bg-gray-800">
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <img
          src={thumbnail}
          alt={article.title || "News Thumbnail"}
          className="w-full h-40 object-cover"
        />
        <div className="p-3">
          <h3 className="font-semibold text-md text-blue-700 dark:text-white line-clamp-2">
            {article.title || "No Title"}
          </h3>

          {article.source?.name && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
              Source: {article.source.name}
            </p>
          )}

          {article.publishedAt && (
            <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </a>
    </div>
  );
}

export default NewsCard;
