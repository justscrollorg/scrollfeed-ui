// src/pages/WikipediaArticlesPage.jsx
import { useEffect, useState } from "react";
import { fetchWikipediaArticles } from "../services/wikipediaApi";

function WikipediaArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchWikipediaArticles(1, 20).then(setArticles);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Wikipedia Articles
      </h1>
      <div className="flex flex-wrap gap-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white p-4 shadow rounded"
          >
            <h2 className="font-semibold text-lg mb-2">{article.title}</h2>
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="mb-2 w-full h-40 object-cover rounded"
              />
            )}
            <p className="text-sm text-gray-600 mb-2">{article.extract}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              View on Wikipedia
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default WikipediaArticlesPage;
