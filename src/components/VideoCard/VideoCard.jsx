import React from "react";

function VideoCard({ video }) {
  const thumbnailUrl =
    video.snippet?.thumbnails?.medium?.url ||
    video.snippet?.thumbnails?.default?.url;

  const videoLink =
    video.videoURL ||
    `https://www.youtube.com/watch?v=${video.id?.videoId || video.id}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition duration-300 flex flex-col">
      <a
        href={videoLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
      >
        {thumbnailUrl && (
          <>
            <img
              src={thumbnailUrl}
              alt={video.snippet?.title}
              className="rounded-t-lg w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </>
        )}
      </a>

      <div className="p-4 flex flex-col flex-grow">
        <p className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2">
          {video.snippet?.title}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Channel: {video.snippet?.channelTitle}
        </p>
        <a
          href={videoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 font-medium hover:underline mt-auto"
        >
          Watch →
        </a>
      </div>
    </div>
  );
}

export default VideoCard;
