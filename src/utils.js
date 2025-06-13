import axios from 'axios';

const API_KEY = import.meta.env.VITE_HOME_API_KEY;
const BASE_URL = import.meta.env.VITE_API_HOME_URL;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: `https://${BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': BASE_URL
  }
});

// Reusable GET function
export const fetchData = async (endpoint, customHeaders = {}) => {
  try {
    const response = await apiClient.get(endpoint, {
      headers: { ...customHeaders }
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// Add more methods as needed (POST, PUT, DELETE etc.)