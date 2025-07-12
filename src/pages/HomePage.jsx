import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import Tabs from "../components/Tabs/Tabs";
import Results from "../components/Results/Results";
import NewsCard from "../components/NewsCard/NewsCard";
import { fetchRegions, searchVideos } from "../services/api";
import { fetchNewsByRegion } from "../services/newsApi";

function HomePage() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("US");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRegions().then((regionList) => {
      setRegions(regionList);
      const browserRegion = navigator.language.slice(-2).toUpperCase();
      console.log('browserRegion=>',browserRegion)
      setSelectedRegion(regionList.includes(browserRegion) ? browserRegion : "US");
    });
  }, []);

  useEffect(() => {
    fetchNewsByRegion(selectedRegion).then(setNewsArticles);
  }, [selectedRegion]);

  const handleSearch = () => {
    if (!searchQuery) return;
    setLoading(true);
    searchVideos(searchQuery, selectedRegion)
      .then(setSearchResults)
      .finally(() => setLoading(false));
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Videos</h1>
      <SearchBar
        query={searchQuery}
        onQueryChange={(e) => setSearchQuery(e.target.value)}
        onSearch={handleSearch}
      />
      {searchQuery.length > 0 ? (
        <Results videos={searchResults} loading={loading} />
      ) : (
        <Tabs selectedRegion={selectedRegion} />
      )}
      <h2 className="text-xl font-semibold mt-12 mb-4 text-blue-600">Articles</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide pb-2">
        {newsArticles.map((article, index) => (
          <div key={index} className="min-w-[300px] flex-shrink-0">
            <NewsCard article={article} />
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
