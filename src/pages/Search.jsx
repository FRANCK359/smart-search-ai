import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import api from '../services/api';

const Search = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState('text');
  const [filters, setFilters] = useState({
    date: 'any',
    type: 'all',
    domain: '',
    language: 'fr'
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q');
    const type = searchParams.get('type') || 'text';

    if (q) {
      setQuery(q);
      setSearchType(type);
      performSearch(q, type);
    }
  }, [location.search]);

  useEffect(() => {
    if (query.trim()) {
      performSearch(query, searchType);
    }
  }, [searchType]);

  const performSearch = async (searchQuery, type = 'text') => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await api.post('/search', {
        query: searchQuery,
        type,
        filters
      });

      if (type === 'text') {
        setResults(response.data.results || []);
      } else if (type === 'image') {
        setResults(response.data.images || []);
      } else if (type === 'news') {
        setResults(response.data.news || []);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    performSearch(searchQuery, searchType);
  };

  const handleFilterChange = (name, value) => {
    const val = typeof value === 'string' ? value.trim() : value;
    const newFilters = { ...filters, [name]: val };
    setFilters(newFilters);
    if (query) {
      performSearch(query, searchType);
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <SearchBar initialQuery={query} onSearch={handleSearch} />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search Type</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="text">Text</option>
                  <option value="image">Images</option>
                  <option value="news">News</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <select
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="any">Any time</option>
                  <option value="day">Last day</option>
                  <option value="week">Last week</option>
                  <option value="month">Last month</option>
                  <option value="year">Last year</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="all">All types</option>
                  <option value="article">Articles</option>
                  <option value="video">Videos</option>
                  <option value="image">Images</option>
                  <option value="document">Documents</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
                <select
                  value={filters.language}
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="fr">French</option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Domain</label>
                <input
                  type="text"
                  value={filters.domain}
                  onChange={(e) => handleFilterChange('domain', e.target.value)}
                  placeholder="example.com"
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          <div className="md:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : (
              <SearchResults
                query={query}
                results={results}
                searchType={searchType}
                count={results.length}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
