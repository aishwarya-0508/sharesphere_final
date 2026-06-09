import api from './api.js';

export const authService = {
  registerSeller: (data) => api.post('/auth/register-seller', data),
  registerBuyer: (data) => api.post('/auth/register-buyer', data),
  login: (email, password) => api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/current-user')
};

export const resourceService = {
  addResource: (formData) => api.post('/resources/add', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAllResources: (params) => api.get('/resources/all', { params }),
  getResourceById: (id) => api.get(`/resources/${id}`),
  getSellerResources: () => api.get('/resources/seller'),
  updateResource: (id, formData) => api.put(`/resources/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteResource: (id) => api.delete(`/resources/${id}`)
};

export const requestService = {
  createRequest: (data) => api.post('/requests/create', data),
  getSellerRequests: () => api.get('/requests/seller/all'),
  getBuyerRequests: () => api.get('/requests/buyer/all'),
  getRequestById: (id) => api.get(`/requests/${id}`),
  approveRequest: (id) => api.put(`/requests/${id}/approve`),
  rejectRequest: (id) => api.put(`/requests/${id}/reject`),
  markAsShared: (id) => api.put(`/requests/${id}/share`),
  markAsReturned: (id) => api.put(`/requests/${id}/return`)
};

export const notificationService = {
  getNotifications: () => api.get('/notifications/all'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  getUnreadCount: () => api.get('/notifications/unread-count')
};

export const analyticsService = {
  getSellerAnalytics: () => api.get('/analytics/seller'),
  getBuyerAnalytics: () => api.get('/analytics/buyer')
};
