import React from 'react';
import { Link } from 'react-router';

const Trending = () => {
  const stored = JSON.parse(sessionStorage.getItem("trendingdata") || "{}");

  const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [
      h > 0 ? h.toString().padStart(2, '0') : null,
      m.toString().padStart(2, '0'),
      s.toString().padStart(2, '0'),
    ]
      .filter(Boolean)
      .join(':');
  };

  if (!stored.list) {
    return <div className="p-4 text-center">No trending data available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {stored.list.map((video, index) => (
        <Link
          key={video.videoId || index}
          to={`/watch/${video.videoId}`}
          className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          {/* Thumbnail */}
          <div className="relative">
            <img
              src={video.videoThumbnails?.[0]?.url}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            {video.lengthSeconds && (
              <span className="absolute bottom-2 right-2 text-white bg-black bg-opacity-75 text-xs px-2 py-0.5 rounded">
                {formatDuration(video.lengthSeconds)}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start gap-3">
              {/* Author Thumbnail */}
              <img
                src={video.authorThumbnails?.[0]?.url || 'https://via.placeholder.com/40'}
                alt={video.author}
                className="w-10 h-10 rounded-full"
              />
              {/* Title and Meta */}
              <div>
                <h3 className="font-semibold text-gray-900 line-clamp-2">{video.title}</h3>
                <div className="text-sm text-gray-700 flex items-center gap-1">
                  {video.author}
                  {video.authorVerified && (
                    <svg
                      className="w-4 h-4 text-blue-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0L15.09 8H24L17.45 13L20.55 21L12 16L3.45 21L6.55 13L0 8H8.91L12 0Z" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {video.viewCountText} • {video.publishedText}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Trending;
