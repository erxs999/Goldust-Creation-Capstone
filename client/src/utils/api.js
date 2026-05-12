
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const getApiUrl = (endpoint) => {
  
  if (endpoint.startsWith('http')) {
    return endpoint;
  }
  
  if (import.meta.env.DEV) {
    return endpoint;
  }
  
  return `${API_BASE_URL}${endpoint}`;
};

export const apiFetch = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return fetch(url, {
    ...options,
    headers
  });
};

export default { getApiUrl, apiFetch };
