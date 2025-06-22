import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {
  StarIcon as StarIconSolid,
  TrashIcon,
  TagIcon
} from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('all');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await api.get('/search/favorites'); // ✅ corrigé ici
        setFavorites(response.data.favorites);

        const allTags = new Set();
        response.data.favorites.forEach(fav => {
          if (fav.tags && fav.tags.length > 0) {
            fav.tags.forEach(tag => allTags.add(tag));
          }
        });
        setTags(Array.from(allTags));
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (id) => {
    try {
      await api.delete('/search/favorites', { params: { id } }); // ✅ corrigé ici
      setFavorites(favorites.filter(fav => fav.id !== id));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const filteredFavorites =
    selectedTag === 'all'
      ? favorites
      : favorites.filter(fav => fav.tags && fav.tags.includes(selectedTag));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Favorites</h3>
        <div className="flex items-center space-x-2">
          <TagIcon className="h-5 w-5 text-gray-400" />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Tags</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className="text-center py-12">
          <StarIconOutline className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No favorites yet</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Save your favorite search results by clicking the star icon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((fav) => (
            <div key={fav.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <a
                    href={fav.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-primary-600 dark:text-primary-400 hover:underline truncate"
                  >
                    {fav.title}
                  </a>
                  <button
                    onClick={() => removeFavorite(fav.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {fav.snippet}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <StarIconSolid className="h-5 w-5 text-yellow-500" />
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(fav.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                    {fav.fav_type}
                  </span>
                </div>
                {fav.tags && fav.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {fav.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
