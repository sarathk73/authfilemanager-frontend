import axios from 'axios';

const setupAxiosInterceptors = (history) => {
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
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
          const response = await axios.post('http://localhost:3001/api/auth/refresh', { refreshToken });
          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
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