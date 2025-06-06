import React from "react";
import VideoCard from "../VideoCard/VideoCard";

function Results({ videos, searchResults }) {
  return (
    <div className="results">
      <h2>Top Videos</h2>
      <div className="video-grid">
        {videos.map((v) => <VideoCard key={v.id} video={v} />)}
      </div>

      <h2>Search Results</h2>
      <div className="video-grid">
        {searchResults.map((v) => <VideoCard key={v.id?.videoId || v.id} video={v} />)}
      </div>
    </div>
  );
}

export default Results;