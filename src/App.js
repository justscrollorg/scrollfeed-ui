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
      console.log("[App] Available regions:", regionList);
      setRegions(regionList);

      const browserRegion = navigator.language.slice(-2).toUpperCase();
      const defaultRegion = regionList.includes(browserRegion)
        ? browserRegion
        : "US";
      console.log("[App] Setting default region:", defaultRegion);
      setSelectedRegion(defaultRegion);
    });
  }, []);

  useEffect(() => {
    console.log("[App] Fetching news for region:", selectedRegion);
    fetchNewsByRegion(selectedRegion).then((news) => {
      console.log(
        `[App] Received ${news.length} articles for region ${selectedRegion}`
      );
      setNewsArticles(news);
    });
  }, [selectedRegion]);

  const handleSearch = () => {
    if (!searchQuery) return;
    setLoading(true);
    console.log(
      `[App] Searching videos for query="${searchQuery}", region="${selectedRegion}"`
    );
    searchVideos(searchQuery, selectedRegion)
      .then((data) => {
        console.log(`[App] Search returned ${data.length} results`);
        setSearchResults(data);
      })
      .catch((err) => {
        console.error("[App] Search failed:", err);
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

        {/* Videos Section */}
        <div className="mt-12">
          {searchQuery.length > 0 ? (
            <Results videos={searchResults} loading={loading} />
          ) : (
            <Tabs selectedRegion={selectedRegion} />
          )}
        </div>

        {/* Regional News Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-300">
            Regional News
          </h2>

          {newsArticles.length > 0 ? (
            <div className="flex overflow-x-auto space-x-4 scrollbar-hide pb-2">
              {newsArticles.map((article, index) => (
                <div key={index} className="min-w-[300px] flex-shrink-0">
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-gray-500 dark:text-gray-400">
              No news found for this region.
            </p>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
