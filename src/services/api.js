import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const productService = {
  getProduct: async (productId) => {
    try {
      const response = await apiClient.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching product data');
    }
  },
  
  getRelatedProducts: async (categoryId) => {
    try {
      const response = await apiClient.get(`/products/category/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching related products');
    }
  }
};

export default apiClient;