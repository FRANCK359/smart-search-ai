import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import api from '../services/api';

const Search = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState('text');
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    date: 'any',
    type: 'all',
    domain: '',
    language: 'fr',
  });

  const performSearch = useCallback(async (searchQuery, type = 'text') => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await api.post('/search', {
        query: searchQuery,
        type,
        filters,
      });

      const dataMap = {
        text: response.data.results || [],
        image: response.data.images || [],
        news: response.data.news || [],
      };

      setResults(dataMap[type] || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q');
    const type = searchParams.get('type') || 'text';

    if (q) {
      setQuery(q);
      setSearchType(type);
      performSearch(q, type);
    }
  }, [location.search, performSearch]);

  useEffect(() => {
    if (query.trim()) {
      performSearch(query, searchType);
    }
  }, [searchType, query, performSearch]);

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
    <div className="pt-24 pb-10 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary dark:text-white">
          InovGenius
        </h1>

        <div className="mb-6">
          <SearchBar initialQuery={query} onSearch={handleSearch} />
        </div>

        {/* Bouton toujours visible pour afficher/cacher les filtres */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 text-primary dark:text-white font-medium hover:underline"
          >
            {showFilters ? 'Cacher les filtres' : 'Afficher les filtres'}
            {showFilters ? (
              <ChevronUpIcon className="h-5 w-5 transition-transform" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 transition-transform" />
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtres animés avec Framer Motion */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                key="filters"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="md:w-1/4"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sticky top-24">
                  <h3 className="text-lg font-semibold mb-4 text-primary dark:text-white">Filtres</h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type de recherche
                    </label>
                    <select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary"
                    >
                      <option value="text">Texte</option>
                      <option value="image">Images</option>
                      <option value="news">Actualités</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                    <select
                      value={filters.date}
                      onChange={(e) => handleFilterChange('date', e.target.value)}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary"
                    >
                      <option value="any">Toutes</option>
                      <option value="day">Dernier jour</option>
                      <option value="week">Dernière semaine</option>
                      <option value="month">Dernier mois</option>
                      <option value="year">Dernière année</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type de contenu
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary"
                    >
                      <option value="all">Tous</option>
                      <option value="article">Articles</option>
                      <option value="video">Vidéos</option>
                      <option value="image">Images</option>
                      <option value="document">Documents</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Langue</label>
                    <select
                      value={filters.language}
                      onChange={(e) => handleFilterChange('language', e.target.value)}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary"
                    >
                      <option value="fr">Français</option>
                      <option value="en">Anglais</option>
                      <option value="es">Espagnol</option>
                      <option value="de">Allemand</option>
                      <option value="it">Italien</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Domaine</label>
                    <input
                      type="text"
                      value={filters.domain}
                      onChange={(e) => handleFilterChange('domain', e.target.value)}
                      placeholder="ex: example.com"
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Résultats */}
          <div className={`w-full ${showFilters ? 'md:w-3/4' : ''}`}>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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
