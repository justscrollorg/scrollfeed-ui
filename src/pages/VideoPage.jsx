// src/pages/VideoPage.jsx
import { useEffect, useState } from "react";
import { Play, Clock, Eye, Trending, ChevronRight } from "lucide-react";
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
      .then((data) => {
        // Handle YouTube API response format
        const videos = data.items || data || [];
        setSearchResults(videos);
      })
      .finally(() => setLoading(false));
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">
                Video Hub
              </h1>
            </div>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover trending videos from around the world. Search, explore, and watch content 
              from your favorite creators and channels.
            </p>
            
            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="flex items-center space-x-2 text-blue-100">
                <Trending className="w-5 h-5" />
                <span className="text-sm font-medium">Trending Content</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <Eye className="w-5 h-5" />
                <span className="text-sm font-medium">Global Reach</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">Real-time Updates</span>
              </div>
            </div>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto">
              <SearchBar
                query={searchQuery}
                onQueryChange={(e) => setSearchQuery(e.target.value)}
                onSearch={handleSearch}
                onClear={handleClear}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Region Selector */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-slate-800">
              {searchQuery ? `Search Results: "${searchQuery}"` : 'Trending Videos'}
            </h2>
            {searchQuery && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {searchResults.length} results
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">Region:</span>
            <RegionSelector 
              selectedRegion={selectedRegion}
              onChange={handleRegionChange}
              regions={regions}
            />
          </div>
        </div>

        {/* Breadcrumb */}
        {searchQuery && (
          <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
            <span>Videos</span>
            <ChevronRight className="w-4 h-4" />
            <span>Search</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">{searchQuery}</span>
          </nav>
        )}

        {/* Results or Tabs */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          {searchQuery.length > 0 ? (
            <div className="p-6">
              <Results videos={searchResults} loading={loading} />
            </div>
          ) : (
            <div className="p-6">
              <Tabs selectedRegion={selectedRegion} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
