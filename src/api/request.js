import axios from 'axios';
import qs from 'qs';
import { RET, errorMap, serverConfig } from './config';

// Create axios instance
const request = axios.create({
  baseURL: serverConfig.baseURL, // Base request URL
  timeout: 100000, // Request timeout
  withCredentials: false // Whether to include cookies in cross-domain requests
});

// Request interceptor
request.interceptors.request.use(
  (config) => {
    // If token authorization is enabled
    if (serverConfig.useTokenAuthorization) {
      config.headers['Authorization'] = localStorage.getItem('token') || ''; // Attach token to headers
    }
    // Set request headers
    if (!config.headers['content-type']) {
      // If content-type is not set
      if (config.method === 'post') {
        config.headers['content-type'] = 'application/x-www-form-urlencoded'; // For POST requests
        config.data = qs.stringify(config.data); // Serialize form data
      } else {
        config.headers['content-type'] = 'application/json'; // Default type
      }
    }
    console.log('Request configuration', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
request.interceptors.response.use(
  (res) => {
    let data = res.data;
    // Handle your business logic here, e.g., check if token is expired
    if (data.code !== '2000') {
      // Handle the error based on the code
      const errorMessage = data?.message || 'Unexpected error occurred';
      return Promise.reject(new Error(errorMessage));
    }
    return data.data;
  },
  (error) => {
    console.log(error.response, '11');
    let message = errorMap[RET.UNKOWNERR]; // Default unknown error message
    if (error && error.response) {
      const status = error.response.status;
      message = errorMap[status] || message; // Get error message from map
    }
    return Promise.reject(message);
  }
);

export default request;
