// API Configuration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://profile-1g5.onrender.com' 
  : 'http://localhost:5000';

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/api/contact`,
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;