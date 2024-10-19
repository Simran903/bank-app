import axios from 'axios';
import {baseUrl} from './index'

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor (optional, for handling responses globally)
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // You can handle global errors here, like logging out users on 401 responses
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      console.log('Unauthorized, logging out...');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
