import { useEffect, useState } from "react";
import Controls from "./components/Controls/Controls";
import SearchBar from "./components/SearchBar/SearchBar";
import Results from "./components/Results/Results";
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
  const [maxResults, setMaxResults] = useState(5);
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRegions().then(setRegions).catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetchCategories(selectedRegion).then(setCategories).catch(console.error);
    }
  }, [selectedRegion]);

  const handleTopVideos = () => {
    setLoading(true);
    fetchTopVideos(selectedRegion, selectedCategory, maxResults)
      .then(setVideos)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleSearch = () => {
    setLoading(true);
    searchVideos(searchQuery, selectedRegion)
      .then(setVideos)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
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
      <Results videos={videos} loading={loading} />
    </div>
  );
}

export default App;
