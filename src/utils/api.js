const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Get token from localStorage
export const getToken = () => localStorage.getItem('token');

// Set token in localStorage
export const setToken = (token) => localStorage.setItem('token', token);

// Remove token from localStorage
export const removeToken = () => localStorage.removeItem('token');

// Set user data in localStorage
export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));

// Get user data from localStorage
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Remove user from localStorage
export const removeUser = () => localStorage.removeItem('user');

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getCurrentUser: () => apiRequest('/auth/me'),
};

// Posts API
export const postsAPI = {
  getPosts: (page = 1, limit = 10) => 
    apiRequest(`/posts?page=${page}&limit=${limit}`),
  
  createPost: (postData) => apiRequest('/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  }),
  
  likePost: (postId) => apiRequest(`/posts/${postId}/like`, {
    method: 'PUT',
  }),
  
  getComments: (postId) => apiRequest(`/posts/${postId}/comments`),
  
  addComment: (postId, content) => apiRequest(`/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  }),
};

// Users API
export const usersAPI = {
  getUser: (userId) => apiRequest(`/users/${userId}`),
  
  updateProfile: (profileData) => apiRequest('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }),
};
