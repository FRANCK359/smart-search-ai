import api from './api';

export const sendContactMessage = async (messageData) => {
  const response = await api.post('/contact/send', messageData);
  return response.data;
};

export const getContactMessages = async (page = 1, limit = 10) => {
  const response = await api.get('/contact/messages', {
    params: { page, limit }
  });
  return response.data;
};

export const getMessageDetails = async (id) => {
  const response = await api.get(`/contact/messages/${id}`);
  return response.data;
};

export const updateMessageStatus = async (id, isRead) => {
  const response = await api.put(`/contact/messages/${id}`, { is_read: isRead });
  return response.data;
};