
const getApiBaseUrl = () => {
  
  if (import.meta.env.DEV) {
    return '';
  }
  
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  if (window.ENV && window.ENV.API_URL) {
    return window.ENV.API_URL;
  }
  
  return '';
};

export const API_BASE_URL = getApiBaseUrl();

export const getFullApiUrl = (path) => {
  if (!path) return API_BASE_URL;
  
  if (path.startsWith('http')) {
    return path;
  }
  
  if (!API_BASE_URL) {
    return path;
  }
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};

console.log('[CONFIG] API_BASE_URL:', API_BASE_URL);
console.log('[CONFIG] Environment:', import.meta.env.MODE);
console.log('[CONFIG] VITE_API_URL:', import.meta.env.VITE_API_URL);

const originalFetch = window.fetch;
window.fetch = function(url, options) {
  
  if (typeof url === 'string' && 
      (url.startsWith('/api') || url.startsWith('/uploads') || url.startsWith('/gallery'))) {
    const fullUrl = getFullApiUrl(url);
    console.log(`[API] ${url} -> ${fullUrl}`);
    return originalFetch.call(this, fullUrl, options);
  }
  
  return originalFetch.call(this, url, options);
};
console.log('[CONFIG] Fetch override installed successfully');

export default { API_BASE_URL, getFullApiUrl };
