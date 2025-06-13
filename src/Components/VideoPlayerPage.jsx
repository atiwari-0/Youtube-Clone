import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { fetchData } from '../utils';
import Loader from './Loader';

const formatRelativeDate = (dateStr) => {
  const now = new Date();
  const past = new Date(dateStr);
  const seconds = (now - past) / 1000;

  const r = (v, u) => `${Math.floor(v)} ${u}${v >= 2 ? 's' : ''} ago`;
  if (seconds >= 31536000) return r(seconds / 31536000, 'year');
  if (seconds >= 2592000) return r(seconds / 2592000, 'month');
  if (seconds >= 86400) return r(seconds / 86400, 'day');
  if (seconds >= 3600) return r(seconds / 3600, 'hour');
  if (seconds >= 60) return r(seconds / 60, 'minute');
  return 'Just now';
};

const formatViews = (views) => {
  if (!views || isNaN(views)) return '0 views';
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`;
  return `${views} views`;
};

const mockComments = [
  { user: 'Akshat T.', comment: 'Amazing video! Really enjoyed the content.', time: '2 hours ago' },
  { user: 'John Doe', comment: 'Subscribed instantly! 🔥🔥🔥', time: '1 day ago' },
  { user: 'Jane', comment: 'The explanation was so clear. Thank you!', time: '3 days ago' }
];

const VerifiedIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);

      const cached = sessionStorage.getItem(`video-${videoId}`);
      if (cached) {
        setVideoData(JSON.parse(cached));
      } else {
        const res = await fetchData(`/video/details/?id=${videoId}&hl=en&gl=US`);
        if (res.success) {
          sessionStorage.setItem(`video-${videoId}`, JSON.stringify(res.data));
          setVideoData(res.data);
        } else {
          setError(res.error);
        }
      }

      // Related videos
      const trending = JSON.parse(sessionStorage.getItem('trendingdata')) || {};
      const filtered = trending?.list?.filter(v => v.videoId && v.videoId !== videoId) || [];
      setRelatedVideos(filtered.slice(0, 8));

      setLoading(false);
    };

    fetchVideoData();
  }, [videoId]);

  const toggleSubscribe = () => setIsSubscribed(prev => !prev);

  if (loading) return <Loader/>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!videoData) return <div className="p-4">No video data found.</div>;

  const { title, description, stats, publishedDate, author, cards } = videoData;

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="w-full lg:w-2/3 lg:pr-6">
        <div className="relative pt-[56.25%] bg-black rounded-xl overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>

        <div className="mt-4">
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{formatViews(stats?.views)}</span>
            <span>{formatRelativeDate(publishedDate)}</span>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Link to={`/channel/${author?.channelId}`}>
  <img
    src={author?.avatar?.[0]?.url}
    alt={author?.title}
    className="w-10 h-10 rounded-full"
  />
</Link>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{author?.title}</h3>
                  {author?.badges?.some(b => b.type.includes("VERIFIED")) && (
                    <VerifiedIcon className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{author?.stats?.subscribersText}</p>
              </div>
            </div>
            <button
              onClick={toggleSubscribe}
              className={`px-4 py-2 rounded-full font-medium ${isSubscribed ? 'bg-gray-300 text-black' : 'bg-red-600 text-white'}`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-line text-sm">
            {description}
          </div>

          {cards?.map((card, i) => (
            <div key={i} className="mt-4 p-3 border rounded-lg flex items-start">
              <img src={card?.image?.[0]?.url} className="w-16 h-16 object-cover rounded mr-3" />
              <div>
                <h4 className="font-medium">{card.title}</h4>
                <a href={card.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                  {card.url}
                </a>
              </div>
            </div>
          ))}

          {/* Comments */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            {mockComments.map((c, i) => (
              <div key={i} className="mb-4 p-3 bg-white shadow rounded">
                <p className="font-medium">{c.user}</p>
                <p className="text-sm text-gray-700">{c.comment}</p>
                <p className="text-xs text-gray-400">{c.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section (Related Videos) */}
      <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
        <h3 className="text-lg font-semibold mb-4">Up next</h3>
        <div className="space-y-2">
          {relatedVideos.map((video, i) => (
            <Link
              key={i}
              to={`/watch/${video.videoId}`}
              className="flex hover:bg-gray-100 p-2 rounded-lg transition"
            >
              <div className="relative w-40 flex-shrink-0">
                <img
                  src={video?.videoThumbnails?.[0]?.url}
                  alt={video?.title}
                  className="w-full h-24 object-cover rounded-lg"
                />
                {video.lengthSeconds && (
                  <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                    {Math.floor(video.lengthSeconds / 60)}:{String(video.lengthSeconds % 60).padStart(2, '0')}
                  </span>
                )}
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium line-clamp-2">{video?.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{video?.author}</p>
                <p className="text-xs text-gray-600">{video?.viewCountText || 'N/A'}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
