import { useEffect, useState } from "react";
import "./App.css";
import Controls from "./components/Controls/Controls";
import SearchBar from "./components/SearchBar/SearchBar";
import Results from "./components/Results/Results";
import { fetchRegions, fetchCategories, fetchTopVideos, searchVideos } from "./services/api";

function App() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("US");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxResults, setMaxResults] = useState(5);
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchRegions().then(setRegions).catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetchCategories(selectedRegion).then(setCategories).catch(console.error);
    }
  }, [selectedRegion]);

  const handleTopVideos = () => {
    fetchTopVideos(selectedRegion, selectedCategory, maxResults)
      .then(setVideos)
      .catch(console.error);
  };

  const handleSearch = () => {
    searchVideos(searchQuery, selectedRegion)
      .then(setSearchResults)
      .catch(console.error);
  };

  return (
    <div className="app-container">
      <h1>YouTube Video Explorer</h1>
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
      <SearchBar query={searchQuery} onQueryChange={(e) => setSearchQuery(e.target.value)} onSearch={handleSearch} />
      <Results videos={videos} searchResults={searchResults} />
    </div>
  );
}

export default App;
