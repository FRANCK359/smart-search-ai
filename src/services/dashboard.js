import api from './api';

export const getStats = async (timeRange = 'week') => {
  const response = await api.get('/dashboard/stats', {
    params: { range: timeRange }
  });
  return response.data;
};

export const getSystemStats = async () => {
  const response = await api.get('/dashboard/system/stats');
  return response.data;
};

export const getSearchAnalytics = async () => {
  const response = await api.get('/dashboard/history/analytics');
  return response.data;
};

export const getFavoritesAnalytics = async () => {
  const response = await api.get('/dashboard/favorites/analytics');
  return response.data;
};