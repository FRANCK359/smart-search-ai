import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Stats from '../components/Dashboard/Stats';
import History from '../components/Dashboard/History';
import Favorites from '../components/Dashboard/Favorites';

import {
  ChartBarIcon,
  ClockIcon,
  StarIcon,
} from '@heroicons/react/24/outline'; // ✅ Correction ici

const Dashboard = () => {
  const { user, refreshApiKey: refreshApiKeyFromContext } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('stats');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (user && user.api_key) {
      setApiKey(user.api_key);
    }
  }, [user]);

  const handleRefreshApiKey = async () => {
    try {
      const newKey = await refreshApiKeyFromContext(); // ✅ Corrigé
      setApiKey(newKey);
    } catch (error) {
      console.error('Failed to refresh API key:', error);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
          Please login to access the dashboard
        </h3>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back, {user.username || user.email}!
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-medium">API Key</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Use this key to authenticate with our API
              </p>
            </div>
            <div className="flex items-center w-full md:w-auto">
              <input
                type="text"
                value={apiKey}
                readOnly
                className="w-full md:w-96 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md mr-2"
              />
              <button
                onClick={handleRefreshApiKey}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'stats'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <ChartBarIcon className="h-5 w-5 mr-2" />
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'history'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <ClockIcon className="h-5 w-5 mr-2" />
              History
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'favorites'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <StarIcon className="h-5 w-5 mr-2" />
              Favorites
            </button>
          </nav>
        </div>

        <div>
          {activeTab === 'stats' && <Stats />}
          {activeTab === 'history' && <History />}
          {activeTab === 'favorites' && <Favorites />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
