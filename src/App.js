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
  const [searchResults, setSearchResults] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
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
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    setLoading(true);
    searchVideos(searchQuery, selectedRegion)
      .then((data) => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      } min-h-screen flex`}
    >
      {/* Side Panel */}
      <div className={`w-64 p-4 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <h2 className="text-xl font-semibold mb-4">Menu</h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Toggle Dark Mode
        </button>
        <p className="text-sm">
          Switch theme, then explore trending and search videos!
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8">
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
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <Results videos={videos} searchResults={searchResults} />
        )}
      </div>
    </div>
  );
}

export default App;
