import React from "react";

function VideoCard({ video }) {
  return (
    <div className="video-card" key={video.id || video.id?.videoId}>
      <p><strong>{video.snippet?.title}</strong></p>
      <p>Channel: {video.snippet?.channelTitle}</p>
      <a href={video.videoURL} target="_blank" rel="noopener noreferrer">Watch</a>
    </div>
  );
}

export default VideoCard;