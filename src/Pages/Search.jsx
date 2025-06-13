import React from 'react';
import { useOutletContext , Link  } from 'react-router';

const Search = () => {
  const { searchVal, searchResults, error } = useOutletContext();

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!searchResults?.contents?.length) return <div className="p-4">No results found for "{searchVal}"</div>;

  return (
    <div className="p-4 space-y-6">
      {searchResults.contents.map((item, index) => {
        const video = item.video;
        if (!video) return null;

        return (
          <div
            key={video.videoId || index}
            className="flex flex-col sm:flex-row gap-4 border-b pb-4 dark:border-gray-700"
          >
            {/* Thumbnail */}
            <Link
              to={`/watch/${video.videoId}`}
              className="shrink-0 w-full sm:w-64"
            >
              <img
                src={video.thumbnails?.[0]?.url}
                alt={video.title}
                className="w-full h-auto rounded-md object-cover"
              />
            </Link>

            {/* Video Info */}
            <div className="flex flex-col justify-start text-yt-text-primary dark:text-yt-text-inverted">
              <Link
                to={`/watch/${video.videoId}`}
                className="text-lg font-semibold hover:text-yt-red transition-colors"
              >
                {video.title}
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {video.descriptionSnippet || 'No description'}
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="mr-4">{video.author?.title}</span>
                <span>{video.stats?.views?.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Search;
