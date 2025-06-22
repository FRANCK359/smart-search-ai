import React, { useState, useEffect } from 'react';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import api from '../services/api';

const SearchResults = ({ query, results, searchType, count }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = async (result) => {
    try {
      if (favorites.some(fav => fav.url === result.url)) {
        await api.delete('/search/favorites', { params: { id: result.id } });
        setFavorites(favorites.filter(fav => fav.url !== result.url));
      } else {
        const response = await api.post('/search/favorites', {
          title: result.title,
          url: result.url,
          snippet: result.snippet,
          type: searchType
        });
        setFavorites([...favorites, { ...result, id: response.data.favorite.id }]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const isFavorite = (url) => {
    return favorites.some(fav => fav.url === url);
  };

  if (!query) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
          Enter a search query to get started
        </h3>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
          No results found for "{query}"
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Try different keywords or check your spelling
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Results for "{query}" ({count})
        </h2>
      </div>

      {searchType === 'text' && (
        <div className="space-y-6">
          {results.map((result, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between">
                <div>
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {result.title}
                  </a>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {new URL(result.url).hostname}
                  </p>
                </div>
                <button
                  onClick={() => toggleFavorite(result)}
                  className="text-gray-400 hover:text-yellow-500"
                >
                  {isFavorite(result.url) ? (
                    <StarIconSolid className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <StarIconOutline className="h-5 w-5" />
                  )}
                </button>
              </div>

              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {result.snippet}
              </p>

              {result.ai_summary && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    AI Summary
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {result.ai_summary}
                  </p>
                </div>
              )}

              {result.topics && result.topics.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {result.topics.map((topic, i) => (
                      <span 
                        key={i} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {searchType === 'image' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((image, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="relative group">
                <img
                  src={image.url}
                  alt={image.title || 'Search result image'}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-end">
                  <div className="w-full p-3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex justify-between items-center">
                      <a
                        href={image.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-sm truncate hover:underline"
                      >
                        {image.title || 'View Image'}
                      </a>
                      <button
                        onClick={() => toggleFavorite(image)}
                        className="text-gray-200 hover:text-yellow-400"
                      >
                        {isFavorite(image.url) ? (
                          <StarIconSolid className="h-5 w-5 text-yellow-400" />
                        ) : (
                          <StarIconOutline className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchType === 'news' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((newsItem, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              {newsItem.image && (
                <img
                  src={newsItem.image}
                  alt={newsItem.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400?text=News+Image';
                  }}
                />
              )}
              <div className="p-4">
                <div className="flex justify-between">
                  <a
                    href={newsItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {newsItem.title}
                  </a>
                  <button
                    onClick={() => toggleFavorite(newsItem)}
                    className="text-gray-400 hover:text-yellow-500"
                  >
                    {isFavorite(newsItem.url) ? (
                      <StarIconSolid className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <StarIconOutline className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {newsItem.snippet}
                </p>

                <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>{newsItem.source}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(newsItem.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
