// src/axiosInterceptor.js
import axios from 'axios';

const setupAxiosInterceptors = (history) => {
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    console.log('Setting token in request:', token); // Debugging line
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          console.log('Access token expired. Attempting to refresh token...');
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post('http://localhost:3001/api/user/refresh', { refreshToken });
          const { token } = response.data;
          console.log('New access token:', token); // Debugging line
          localStorage.setItem('accessToken', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          console.log('Token refreshed. Retrying original request...');
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Unable to refresh token:', refreshError);
          history.push('/login');
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;