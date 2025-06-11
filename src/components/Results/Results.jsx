import React from "react";
import VideoCard from "../VideoCard/VideoCard";

function Results({ videos, loading }) {
  const safeVideos = Array.isArray(videos) ? videos : [];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      {loading ? (
        <p className="text-gray-500 italic">Loading...</p>
      ) : safeVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {safeVideos.map((v) => (
            <VideoCard key={v.id?.videoId || v.id} video={v} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">
          No videos found. Try a different category, region, or search query.
        </p>
      )}
    </div>
  );
}

export default Results;
