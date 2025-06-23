// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://warpbay-backend.onrender.com/api',
});

// 1️⃣ Request interceptor to automatically attach JWT
API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => Promise.reject(err),
);

// 2️⃣ Response interceptor to catch 401s (you already had this)
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default API;
