// src/pages/VideoPage.jsx
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import Tabs from "../components/Tabs/Tabs";
import Results from "../components/Results/Results";
import { fetchRegions, searchVideos } from "../services/api";

function VideoPage() {
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
    </>
  );
}

export default VideoPage;
