import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SearchBar from "./components/SearchBar/SearchBar";
import Results from "./components/Results/Results";
import Tabs from "./components/Tabs/Tabs";
import NewsCard from "./components/NewsCard/NewsCard";
import { fetchRegions, searchVideos } from "./services/api";
import { fetchNewsByRegion } from "./services/newsApi";

function App() {
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
      const defaultRegion = regionList.includes(browserRegion)
        ? browserRegion
        : "US";
      setSelectedRegion(defaultRegion);
    });
  }, []);

  useEffect(() => {
    fetchNewsByRegion(selectedRegion).then((news) => {
      setNewsArticles(news);
    });
  }, [selectedRegion]);

  const handleSearch = () => {
    if (!searchQuery) return;
    setLoading(true);
    searchVideos(searchQuery, selectedRegion)
      .then((data) => {
        setSearchResults(data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Navbar
        regions={regions}
        selectedRegion={selectedRegion}
        onRegionChange={(e) => setSelectedRegion(e.target.value)}
      />
      <div className="max-w-7xl mx-auto px-4 py-8 font-sans text-gray-800 dark:text-gray-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 dark:text-blue-300 mb-6">
          trending ....
        </h1>

        <SearchBar
          query={searchQuery}
          onQueryChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 h-[80vh] overflow-y-auto pr-2">
            <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-300">
              Regional News
            </h2>
            {newsArticles.length > 0 ? (
              newsArticles.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))
            ) : (
              <p className="text-sm italic text-gray-500 dark:text-gray-400">
                No news found for this region.
              </p>
            )}
          </div>

          <div className="lg:col-span-3">
            {searchQuery.length > 0 ? (
              <Results videos={searchResults} loading={loading} />
            ) : (
              <Tabs selectedRegion={selectedRegion} />
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
