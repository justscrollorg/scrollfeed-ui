import React from "react";
import VideoCard from "../VideoCard/VideoCard";

function Results({ videos, searchResults }) {
  const safeVideos = Array.isArray(videos) ? videos : [];
  const safeSearchResults = Array.isArray(searchResults) ? searchResults : [];

  console.log("Top Videos:", safeVideos);
  console.log("Search Results:", safeSearchResults);

  return (
    <div className="results">
      <h2>Top Videos</h2>
      <div className="video-grid">
        {safeVideos.length > 0 ? (
          safeVideos.map((v) => <VideoCard key={v.id} video={v} />)
        ) : (
          <p style={{ color: "gray", fontStyle: "italic" }}>
            No top videos found. Try a different category or region.
          </p>
        )}
      </div>

      <h2>Search Results</h2>
      <div className="video-grid">
        {safeSearchResults.length > 0 ? (
          safeSearchResults.map((v) => (
            <VideoCard key={v.id?.videoId || v.id} video={v} />
          ))
        ) : (
          <p style={{ color: "gray", fontStyle: "italic" }}>
            No search results found. Try a different query.
          </p>
        )}
      </div>
    </div>
  );
}

export default Results;
