import React, { useState, useEffect, useRef } from 'react';
import { StarIcon as StarIconOutline, ShareIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

// === SVG icons simplifiées pour illustration
const SocialIcon = ({ name }) => {
  const colors = {
    whatsapp: '#25D366',
    facebook: '#1877F2',
    twitter: '#1DA1F2',
    linkedin: '#0A66C2',
    email: '#D44638',
  };
  const paths = {
    whatsapp: (
      <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.471-.148-.67.15-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.67-1.612-.916-2.207-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347z" />
    ),
    facebook: (
      <path fill="currentColor" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54v-2.892h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.466h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.892h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
    ),
    twitter: (
      <path fill="currentColor" d="M22.46 6.003c-.77.343-1.6.574-2.46.678a4.301 4.301 0 001.88-2.372 8.586 8.586 0 01-2.72 1.04 4.28 4.28 0 00-7.292 3.9A12.148 12.148 0 013 4.91a4.28 4.28 0 001.326 5.713 4.257 4.257 0 01-1.94-.536v.054a4.28 4.28 0 003.434 4.195 4.31 4.31 0 01-1.933.074 4.28 4.28 0 003.996 2.97 8.59 8.59 0 01-5.31 1.83c-.344 0-.683-.02-1.017-.06a12.117 12.117 0 006.56 1.922c7.874 0 12.18-6.523 12.18-12.18 0-.186-.004-.372-.013-.556a8.7 8.7 0 002.13-2.218z" />
    ),
    linkedin: (
      <path fill="currentColor" d="M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8 17v-6H5v6h3zm-1.5-7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM19 17v-3a2 2 0 00-4 0v3h3z" />
    ),
    email: (
      <path fill="currentColor" d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    ),
  };
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill={colors[name]}
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths[name]}
    </svg>
  );
};

function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
}

const SearchResults = ({ query, results, searchType, count }) => {
  const [favorites, setFavorites] = useState([]);
  const [activeShareIndex, setActiveShareIndex] = useState(null);
  const shareRef = useRef(null);

  useOutsideAlerter(shareRef, () => setActiveShareIndex(null));

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

  const isFavorite = (url) => favorites.some(fav => fav.url === url);

  const handleShareClick = (index, title, url) => {
    if (navigator.vibrate) navigator.vibrate(50);
    if (navigator.share) {
      navigator.share({ title, url })
        .then(() => console.log('Partagé'))
        .catch(err => console.error('Erreur de partage', err));
      setActiveShareIndex(null);
    } else {
      setActiveShareIndex(index === activeShareIndex ? null : index);
    }
  };

  const getShareLinks = (url, title) => ({
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
  });

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

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.7, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, scale: 0.7, y: -10, transition: { duration: 0.2 } }
  };

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
            <div key={index} className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
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
                <div className="flex gap-2 relative">
                  <button
                    onClick={() => toggleFavorite(result)}
                    className="text-gray-400 hover:text-yellow-500 transition shadow-md hover:shadow-yellow-400/50 rounded p-1"
                    title="Toggle Favorite"
                    aria-label={isFavorite(result.url) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isFavorite(result.url) ? (
                      <StarIconSolid className="h-5 w-5 text-yellow-500 animate-pulse" />
                    ) : (
                      <StarIconOutline className="h-5 w-5" />
                    )}
                  </button>

                  <button
                    onClick={() => handleShareClick(index, result.title, result.url)}
                    className="text-gray-400 hover:text-blue-500 transition shadow-md hover:shadow-blue-400/50 rounded p-1"
                    title="Share"
                    aria-haspopup="true"
                    aria-expanded={activeShareIndex === index}
                  >
                    <ShareIcon className="h-5 w-5" />
                  </button>

                  <AnimatePresence>
                    {activeShareIndex === index && (
                      <motion.div
                        ref={shareRef}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        className="absolute top-full right-0 mt-2 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-md w-44 p-2 space-y-1"
                      >
                        {Object.entries(getShareLinks(result.url, result.title)).map(([key, link]) => (
                          <a
                            key={key}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition px-2 py-1 rounded cursor-pointer"
                          >
                            <SocialIcon name={key} />
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
            <div key={index} className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
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
                    <div className="flex justify-between items-center relative">
                      <a
                        href={image.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-sm truncate hover:underline"
                      >
                        {image.title || 'View Image'}
                      </a>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleFavorite(image)}
                          className="text-gray-200 hover:text-yellow-400 transition shadow-md hover:shadow-yellow-400/50 rounded p-1"
                          title="Toggle Favorite"
                          aria-label={isFavorite(image.url) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          {isFavorite(image.url) ? (
                            <StarIconSolid className="h-5 w-5 text-yellow-400 animate-pulse" />
                          ) : (
                            <StarIconOutline className="h-5 w-5" />
                          )}
                        </button>

                        <button
                          onClick={() => handleShareClick(index, image.title || 'Image', image.url)}
                          className="text-gray-200 hover:text-blue-400 transition shadow-md hover:shadow-blue-400/50 rounded p-1"
                          title="Share"
                          aria-haspopup="true"
                          aria-expanded={activeShareIndex === index}
                        >
                          <ShareIcon className="h-5 w-5" />
                        </button>

                        <AnimatePresence>
                          {activeShareIndex === index && (
                            <motion.div
                              ref={shareRef}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              variants={menuVariants}
                              className="absolute top-full right-0 mt-2 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-md w-44 p-2 space-y-1"
                            >
                              {Object.entries(getShareLinks(image.url, image.title || 'Image')).map(([key, link]) => (
                                <a
                                  key={key}
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition px-2 py-1 rounded cursor-pointer"
                                >
                                  <SocialIcon name={key} />
                                  {key.charAt(0).toUpperCase() + key.slice(1)}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
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
            <div key={index} className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
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
                <div className="flex justify-between relative">
                  <a
                    href={newsItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {newsItem.title}
                  </a>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFavorite(newsItem)}
                      className="text-gray-400 hover:text-yellow-500 transition shadow-md hover:shadow-yellow-400/50 rounded p-1"
                      title="Toggle Favorite"
                      aria-label={isFavorite(newsItem.url) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {isFavorite(newsItem.url) ? (
                        <StarIconSolid className="h-5 w-5 text-yellow-500 animate-pulse" />
                      ) : (
                        <StarIconOutline className="h-5 w-5" />
                      )}
                    </button>

                    <button
                      onClick={() => handleShareClick(index, newsItem.title, newsItem.url)}
                      className="text-gray-400 hover:text-blue-500 transition shadow-md hover:shadow-blue-400/50 rounded p-1"
                      title="Share"
                      aria-haspopup="true"
                      aria-expanded={activeShareIndex === index}
                    >
                      <ShareIcon className="h-5 w-5" />
                    </button>

                    <AnimatePresence>
                      {activeShareIndex === index && (
                        <motion.div
                          ref={shareRef}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={menuVariants}
                          className="absolute top-full right-0 mt-2 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-md w-44 p-2 space-y-1"
                        >
                          {Object.entries(getShareLinks(newsItem.url, newsItem.title)).map(([key, link]) => (
                            <a
                              key={key}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition px-2 py-1 rounded cursor-pointer"
                            >
                              <SocialIcon name={key} />
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
