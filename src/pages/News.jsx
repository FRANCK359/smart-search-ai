import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'world', name: 'World' },
    { id: 'business', name: 'Business' },
    { id: 'technology', name: 'Technology' },
    { id: 'sports', name: 'Sports' },
    { id: 'science', name: 'Science' },
    { id: 'health', name: 'Health' },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setNews([]);

      try {
        const params = {
          type: 'news',
          limit: 12,
          query: searchQuery.length >= 3 ? searchQuery : 'news',
        };
        if (category !== 'all') params.category = category;

        const response = await api.get('/search', { params });
        const fetchedNews = response?.data?.news;

        if (Array.isArray(fetchedNews)) {
          setNews(fetchedNews);
        } else {
          console.warn('Unexpected news format:', fetchedNews);
          setNews([]);
        }
      } catch (error) {
        console.error('❌ Error fetching news:', error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [searchQuery, category]);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Latest News</h1>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative flex-grow max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="flex overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium mr-2 last:mr-0 ${
                    category === cat.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {!loading && news.length === 0 && (
            <div className="text-sm text-red-500 mt-2">
              {searchQuery.length < 3
                ? 'Type at least 3 characters to search.'
                : 'No news articles found or an error occurred.'}
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="bg-gray-300 dark:bg-gray-600 h-48 w-full"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
              No news found {searchQuery.length >= 3 ? `for "${searchQuery}"` : 'in this category'}
            </h3>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => {
              if (!item.url && !item.title) return null;

              return (
                <div
                  key={item.url || item.title}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        if (!e.target.dataset.fallback) {
                          e.target.src = 'https://via.placeholder.com/600x400?text=News+Image';
                          e.target.dataset.fallback = 'true';
                        }
                      }}
                    />
                  )}
                  <div className="p-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-lg font-medium text-primary-600 dark:text-primary-400 hover:underline mb-2"
                    >
                      {item.title}
                    </a>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                      {item.snippet}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{item.source}</span>
                      <span>
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString()
                          : ''}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
