import api from './api';

/**
 * Service d'authentification
 */
export const authService = {
  /**
   * Connecte un utilisateur
   * @param {Object} credentials - { email, password }
   * @param {number} [timeout=5000] - Timeout en ms
   * @returns {Promise<Object>} - { access_token, user }
   */
  async login(credentials, timeout = 5000) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await api.post('/auth/login', credentials, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response.data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('La requête a expiré - veuillez réessayer');
      }
      throw error.response?.data || error;
    }
  },

  /**
   * Enregistre un nouvel utilisateur
   * @param {Object} userData - { email, password, username }
   * @param {number} [timeout=5000] - Timeout en ms
   * @returns {Promise<Object>} - { access_token, user }
   */
  async register(userData, timeout = 5000) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await api.post('/auth/register', userData, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response.data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('La requête a expiré - veuillez réessayer');
      }
      throw error.response?.data || error;
    }
  },

  /**
   * Récupère l'utilisateur courant
   * @param {number} [timeout=3000] - Timeout en ms
   * @returns {Promise<Object>} - Données utilisateur
   */
  async getCurrentUser(timeout = 3000) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await api.get('/auth/me', {
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response.data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('La requête a expiré - veuillez réessayer');
      }
      throw error.response?.data || error;
    }
  },

  /**
   * Met à jour le profil utilisateur
   * @param {Object} userData - Données à mettre à jour
   * @param {number} [timeout=5000] - Timeout en ms
   * @returns {Promise<Object>} - Utilisateur mis à jour
   */
  async updateProfile(userData, timeout = 5000) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await api.put('/auth/me', userData, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response.data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('La requête a expiré - veuillez réessayer');
      }
      throw error.response?.data || error;
    }
  },

  /**
   * Rafraîchit la clé API
   * @param {number} [timeout=3000] - Timeout en ms
   * @returns {Promise<string>} - Nouvelle clé API
   */
  async refreshApiKey(timeout = 3000) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await api.post('/auth/refresh-api-key', null, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response.data.api_key;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('La requête a expiré - veuillez réessayer');
      }
      throw error.response?.data || error;
    }
  },

  /**
   * Déconnecte l'utilisateur (côté client)
   * @param {number} [timeout=2000] - Timeout en ms pour le logout backend
   * @returns {Promise<void>}
   */
  async logout(timeout = 2000) {
    try {
      // Optionnel : Appel au backend pour invalider le token
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      await api.post('/auth/logout', null, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);
    } catch (error) {
      console.warn('Logout backend failed, proceeding with client cleanup', error);
    } finally {
      // Nettoyage côté client dans tous les cas
      localStorage.removeItem('token');
      sessionStorage.removeItem('session');
    }
  },

  /**
   * Demande une réinitialisation de mot de passe
   * @param {string} email - Email de l'utilisateur
   * @param {number} [timeout=5000] - Timeout en ms
   * @returns {Promise<Object>} - Réponse du serveur
   */
  async requestPasswordReset(email, timeout = 5000) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await api.post('/auth/request-password-reset', { email }, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response.data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('La requête a expiré - veuillez réessayer');
      }
      throw error.response?.data || error;
    }
  },

  /**
   * Réinitialise le mot de passe
   * @param {string} token - Token de réinitialisation
   * @param {string} newPassword - Nouveau mot de passe
   * @param {number} [timeout=5000] - Timeout en ms
   * @returns {Promise<Object>} - Réponse du serveur
   */
  async resetPassword(token, newPassword, timeout = 5000) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await api.post('/auth/reset-password', { token, new_password: newPassword }, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response.data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('La requête a expiré - veuillez réessayer');
      }
      throw error.response?.data || error;
    }
  },

  /**
   * Vérifie si l'email est disponible
   * @param {string} email - Email à vérifier
   * @param {number} [timeout=3000] - Timeout en ms
   * @returns {Promise<boolean>} - True si disponible
   */
  async checkEmailAvailability(email, timeout = 3000) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await api.get('/auth/check-email', {
        params: { email },
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response.data.available;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('La requête a expiré - veuillez réessayer');
      }
      throw error.response?.data || error;
    }
  }
};

export default authService;