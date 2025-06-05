import React, { useEffect, useState } from "react";
import "./App.css";

const API_BASE = "/api";

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
    fetch(`${API_BASE}/regions`)
      .then((res) => res.json())
      .then(setRegions)
      .catch((err) => console.error("Failed to fetch regions", err));
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetch(`${API_BASE}/categories?region=${selectedRegion}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched categories:", data);
          setCategories(data);
        })
        .catch((err) => console.error("Failed to fetch categories", err));
    }
  }, [selectedRegion]);

  const fetchTopVideos = () => {
    fetch(
      `${API_BASE}/videos?region=${selectedRegion}&category=${selectedCategory}&maxResults=${maxResults}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Top videos:", data);
        setVideos(data);
      })
      .catch((err) => console.error("Failed to fetch top videos", err));
  };

  const searchVideos = () => {
    fetch(`${API_BASE}/search?query=${searchQuery}&region=${selectedRegion}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Search results:", data);
        setSearchResults(data);
      })
      .catch((err) => console.error("Failed to search videos", err));
  };

  return (
    <div className="app-container">
      <h1>YouTube Video Explorer</h1>

      <div className="controls">
        <div className="form-group">
          <label>Region</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Max Results</label>
          <input
            type="number"
            min="1"
            max="50"
            value={maxResults}
            onChange={(e) => setMaxResults(Number(e.target.value))}
          />
        </div>

        <button onClick={fetchTopVideos}>Get Top Videos</button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search for videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchVideos}>Search</button>
      </div>

      <div className="results">
        <h2>Top Videos</h2>
        <div className="video-grid">
          {videos.map((v) => (
            <div className="video-card" key={v.id}>
              <p>
                <strong>{v.snippet?.title}</strong>
              </p>
              <p>Channel: {v.snippet?.channelTitle}</p>
              <a href={v.videoURL} target="_blank" rel="noopener noreferrer">
                Watch
              </a>
            </div>
          ))}
        </div>

        <h2>Search Results</h2>
        <div className="video-grid">
          {searchResults.map((v) => (
            <div className="video-card" key={v.id?.videoId || v.id}>
              <p>
                <strong>{v.snippet?.title}</strong>
              </p>
              <p>Channel: {v.snippet?.channelTitle}</p>
              <a href={v.videoURL} target="_blank" rel="noopener noreferrer">
                Watch
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
