import api from './api';

// L'endpoint correct pour la recherche devient simplement '/search' au lieu de '/search/search'
export const search = async (query, type = 'text', filters = {}, limit = 10) => {
  const response = await api.post('/search', {  // <-- corrigé ici
    query,
    type,
    filters,
    limit
  });
  return response.data;
};

export const getSuggestions = async (query) => {
  const response = await api.get('/search/suggest', {  // reste pareil
    params: { q: query }
  });
  return response.data.suggestions;
};

export const getSearchHistory = async (page = 1, limit = 10) => {
  const response = await api.get('/search/history', {  // idem
    params: { page, limit }
  });
  return response.data;
};

export const clearSearchHistory = async () => {
  await api.delete('/search/history');  // ajoute '/search' préfixe ici pour cohérence
};

export const addFavorite = async (favoriteData) => {
  const response = await api.post('/search/favorites', favoriteData);  // ajoute '/search' préfixe ici aussi
  return response.data;
};

export const removeFavorite = async (id) => {
  await api.delete('/search/favorites', { params: { id } });  // idem
};

export const getFavorites = async () => {
  const response = await api.get('/search/favorites');  // idem
  return response.data.favorites;
};
