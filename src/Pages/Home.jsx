import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Changed from react-router to react-router-dom
import { fetchData } from '../utils';
import Loader from '../Components/Loader';
const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getHomeData = async () => {
    const result = await fetchData('/v2/trending');
    if (result.success) {
      sessionStorage.setItem("trendingdata", JSON.stringify(result.data));
      setData(result.data);
    } else {
      setError(result.error || "Something went wrong while fetching data.");
    } 
    setLoading(false);
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("trendingdata");
    if (stored) {
      setData(JSON.parse(stored));
      setLoading(false);
    } else {
      getHomeData();
    }
  }, []);

  const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h > 0 ? h.toString().padStart(2, '0') : null, m.toString().padStart(2, '0'), s.toString().padStart(2, '0')]
      .filter(Boolean)
      .join(':');
  };

  if (loading) return <Loader/>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {data?.list?.map((video, index) => (
        <Link
          to={`/watch/${video.videoId}`}
          key={video.videoId || index}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
        >
          {/* Thumbnail */}
          <div className="relative">
            <img
              src={video.videoThumbnails?.[0]?.url || 'https://via.placeholder.com/300x200'}
              alt={video.title || 'Video thumbnail'}
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
              <div className="flex-shrink-0"> {/* Added container for the avatar */}
                <Link 
                  to={`/channel/${video.authorId || video.channelId}`}
                  onClick={(e) => e.stopPropagation()} // Prevent triggering the video link
                >
                  <img
                    src={video.authorThumbnails?.[0]?.url || 'https://via.placeholder.com/40'}
                    alt={video.author || 'Author'}
                    className="w-10 h-10 rounded-full hover:opacity-80 transition"
                  />
                </Link>
              </div>
              <div className="min-w-0"> {/* Added min-w-0 to prevent text overflow */}
                <h3 className="font-semibold text-gray-900 line-clamp-2">{video.title}</h3>
                <div className="text-sm text-gray-700 flex items-center gap-1">
                  <Link 
                    to={`/channel/${video.authorId || video.channelId}`}
                    className="hover:text-gray-900 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {video.author}
                  </Link>
                  {video.authorVerified && (
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
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

export default Home;