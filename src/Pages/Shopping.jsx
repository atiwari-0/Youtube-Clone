import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { fetchData } from '../utils';
import Loader from '../Components/Loader';

const Shopping = () => {
  const [shopdata, setshopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getHomeData = async () => {
    const result = await fetchData('/search/?q=shopping&hl=en&gl=us');
    if (result.success) {
      sessionStorage.setItem("shoppingdata", JSON.stringify(result.data));
      setshopData(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("shoppingdata");
    if (stored) {
      setshopData(JSON.parse(stored));
      setLoading(false);
    } else {
      getHomeData();
    }
  }, []);

  if (loading) return <Loader/>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const formatDuration = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {shopdata.contents.map((item, index) => {
        const video = item.video;
        if (!video) return null;

        return (
          <Link
            to={`/watch/${video.videoId}`}
            key={video.videoId || index}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Thumbnail */}
            <div className="relative">
              <img
                src={video.thumbnails?.[0]?.url}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              {video.lengthSeconds && (
                <span className="absolute bottom-2 right-2 text-white bg-black bg-opacity-75 text-xs px-2 py-0.5 rounded">
                  {formatDuration(Number(video.lengthSeconds))}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                <img
                  src={video.author?.avatar?.[0]?.url || 'https://via.placeholder.com/40'}
                  alt={video.author?.title}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{video.title}</h3>
                  <div className="text-sm text-gray-700 flex items-center gap-1">
                    {video.author?.title}
                    {video.author?.badges?.some(b => b === 'VERIFIED_CHANNEL') && (
                      <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L15.09 8H24L17.45 13L20.55 21L12 16L3.45 21L6.55 13L0 8H8.91L12 0Z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {video.stats?.views?.toLocaleString()} views • {video.publishedTimeText}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Shopping;
