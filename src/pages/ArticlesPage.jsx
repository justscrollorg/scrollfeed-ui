import { useEffect, useState } from "react";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/api/articles")  // Your .NET API endpoint
      .then((res) => res.json())
      .then((data) => setArticles(data.articles || []));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Random Articles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((a, idx) => (
          <div key={idx} className="bg-white shadow rounded p-4 dark:bg-gray-800">
            {a.Image && <img src={a.Image} alt={a.Title} className="w-full h-40 object-cover rounded" />}
            <h2 className="font-bold text-md mt-2">{a.Title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{a.Description}</p>
            <a
              href={a.Url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline text-sm block mt-2"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesPage;
