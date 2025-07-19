// src/pages/VideoPage.jsx
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import Tabs from "../components/Tabs/Tabs";
import Results from "../components/Results/Results";
import RegionSelector from "../components/RegionSelector/RegionSelector";
import { fetchRegions, searchVideos } from "../services/api";

function VideoPage() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("IN");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRegions().then((regionList) => {
      // Handle both array format and object format
      const regionCodes = Array.isArray(regionList) 
        ? regionList.map(r => typeof r === 'string' ? r : r.code)
        : (regionList.regions || []).map(r => typeof r === 'string' ? r : r.code);
      
      setRegions(regionCodes);
      const browserRegion = navigator.language.slice(-2).toUpperCase();
      setSelectedRegion(regionCodes.includes(browserRegion) ? browserRegion : "US");
    });
  }, []);

  const handleSearch = () => {
    if (!searchQuery) return;
    setLoading(true);
    searchVideos(searchQuery, selectedRegion)
      .then(setSearchResults)
      .finally(() => setLoading(false));
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <>
      {/* Region Selector */}
      <div className="mb-4 flex justify-end">
        <RegionSelector 
          selectedRegion={selectedRegion}
          onChange={handleRegionChange}
          regions={regions}
        />
      </div>
      
      {/* <h1 className="text-3xl font-bold text-blue-700 mb-6">Videos</h1> */}
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
