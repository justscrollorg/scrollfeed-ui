import { useEffect, useState } from "react";
import Controls from "./components/Controls/Controls";
import SearchBar from "./components/SearchBar/SearchBar";
import Results from "./components/Results/Results";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Tabs from "./components/Tabs/Tabs";
import {
  fetchRegions,
  fetchCategories,
  fetchTopVideos,
  searchVideos,
} from "./services/api";

function App() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("US");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxResults, setMaxResults] = useState(50);
  const [videos, setVideos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRegions()
      .then((regionsList) => {
        setRegions(regionsList);
        const browserRegion = navigator.language.slice(-2).toUpperCase(); // e.g., "en-US" → "US"
        const defaultRegion = regionsList.includes(browserRegion)
          ? browserRegion
          : "US";
        setSelectedRegion(defaultRegion);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetchCategories(selectedRegion).then(setCategories).catch(console.error);
    }
  }, [selectedRegion]);

  const handleTopVideos = () => {
    setLoading(true);
    fetchTopVideos(selectedRegion, selectedCategory, maxResults)
      .then((data) => {
        setVideos(data);
        setSearchResults([]);
        setSearchQuery("");
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = () => {
    setLoading(true);
    searchVideos(searchQuery, selectedRegion)
      .then((data) => {
        setSearchResults(data);
        setVideos([]);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 font-sans text-gray-800 dark:text-gray-100">
        <h1 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-300 mb-10">
          Trending...
        </h1>
        <Controls
          regions={regions}
          categories={categories}
          selectedRegion={selectedRegion}
          selectedCategory={selectedCategory}
          maxResults={maxResults}
          onRegionChange={(e) => setSelectedRegion(e.target.value)}
          onCategoryChange={(e) => setSelectedCategory(e.target.value)}
          onMaxResultsChange={(e) => setMaxResults(Number(e.target.value))}
          onFetchTopVideos={handleTopVideos}
        />
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
        <Footer />
      </div>
    </>
  );
}

export default App;
