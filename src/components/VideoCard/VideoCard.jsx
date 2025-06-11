function VideoCard({ video }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 p-4 flex flex-col justify-between">
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2">
          {video.snippet?.title}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Channel: {video.snippet?.channelTitle}
        </p>
      </div>
      <a
        href={video.videoURL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
      >
        Watch &rarr;
      </a>
    </div>
  );
}

export default VideoCard;
