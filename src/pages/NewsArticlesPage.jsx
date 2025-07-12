// src/pages/NewsArticlesPage.jsx
import { useEffect, useState } from "react";
import { fetchRegions } from "../services/api";
import { fetchNewsByRegion } from "../services/newsApi";
import NewsCard from "../components/NewsCard/NewsCard";

function NewsArticlesPage() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("US");
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    fetchRegions().then((regionList) => {
      setRegions(regionList);
      const browserRegion = navigator.language.slice(-2).toUpperCase();
      setSelectedRegion(regionList.includes(browserRegion) ? browserRegion : "US");
    });
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetchNewsByRegion(selectedRegion).then(setNewsArticles);
    }
  }, [selectedRegion]);

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-700 mb-6">News Articles</h1>
      <div className="flex flex-wrap gap-4">
        {newsArticles.map((article, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <NewsCard article={article} />
          </div>
        ))}
      </div>
    </>
  );
}

export default NewsArticlesPage;
