import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/dashboard/stats?range=${timeRange}`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
          Failed to load statistics
        </h3>
      </div>
    );
  }

  const searchChartData = {
    labels: stats.user_stats?.search_counts?.dates || [],
    datasets: [
      {
        label: 'Searches',
        data: stats.user_stats?.search_counts?.counts || [],
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
      },
    ],
  };

  const typeChartData = {
    labels: stats.user_stats?.search_types?.types || [],
    datasets: [
      {
        data: stats.user_stats?.search_types?.counts || [],
        backgroundColor: [
          'rgba(79, 70, 229, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(236, 72, 153, 0.7)',
        ],
        borderColor: [
          'rgba(79, 70, 229, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Statistics</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'week' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'month' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'year' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Searches</h4>
          <p className="text-3xl font-semibold">
            {stats.user_stats?.search_counts?.counts?.reduce((a, b) => a + b, 0) || 0}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Favorites</h4>
          <p className="text-3xl font-semibold">{stats.user_stats?.favorites_count || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Most Active Day</h4>
          <p className="text-3xl font-semibold">
            {stats.user_stats?.most_active_day?.count || 0} searches
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {stats.user_stats?.most_active_day?.date || 'N/A'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Search Activity</h4>
          <div className="h-64">
            <Bar
              data={searchChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Search Types</h4>
          <div className="h-64">
            <Pie
              data={typeChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {stats.global_stats && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-4">System Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Users</h4>
              <p className="text-2xl font-semibold">{stats.global_stats.total_users || 0}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">New Users</h4>
              <p className="text-2xl font-semibold">{stats.global_stats.new_users || 0}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Searches</h4>
              <p className="text-2xl font-semibold">{stats.global_stats.total_searches || 0}</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Popular Queries</h4>
            <div className="space-y-2">
              {stats.global_stats.popular_queries?.map((query, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{query.query}</span>
                  <span className="text-gray-500 dark:text-gray-400">{query.count} searches</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;