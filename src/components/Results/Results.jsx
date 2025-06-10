import VideoCard from "../VideoCard/VideoCard";

function Results({ videos, searchResults }) {
  const safeVideos = Array.isArray(videos) ? videos : [];
  const safeSearchResults = Array.isArray(searchResults) ? searchResults : [];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Top Videos</h2>
      {safeVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {safeVideos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No top videos found. Try a different category or region.</p>
      )}

      <h2 className="text-2xl font-bold mt-12 mb-4">Search Results</h2>
      {safeSearchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {safeSearchResults.map((v) => (
            <VideoCard key={v.id?.videoId || v.id} video={v} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No search results found. Try a different query.</p>
      )}
    </div>
  );
}

export default Results;
