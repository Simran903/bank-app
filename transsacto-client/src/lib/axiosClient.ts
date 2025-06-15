import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data && config.headers['Content-Type'] === 'application/json') {
      if (typeof config.data === 'object') {
        const jsonString = JSON.stringify(config.data);
        config.headers['Content-Length'] = jsonString.length.toString();
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
      // window.location.href = '/signin';
    }

    return Promise.reject(error);
  }
);

export default axiosClient;