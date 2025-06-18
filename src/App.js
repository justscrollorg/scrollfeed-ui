import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SearchBar from "./components/SearchBar/SearchBar";
import Results from "./components/Results/Results";
import Tabs from "./components/Tabs/Tabs";
import { fetchRegions, searchVideos } from "./services/api";

function App() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("US");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRegions().then((regionList) => {
      setRegions(regionList);
      const browserRegion = navigator.language.slice(-2).toUpperCase();
      setSelectedRegion(regionList.includes(browserRegion) ? browserRegion : "US");
    });
  }, []);

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
      <div className="max-w-6xl mx-auto px-4 py-8 font-sans text-gray-800 dark:text-gray-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 dark:text-blue-300 mb-6">
          trending in {selectedRegion}
        </h1>

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
