import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logs de desarrollo
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🔵 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('🔴 Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejo de respuestas
apiClient.interceptors.response.use(
  (response) => {
    console.log(`🟢 API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('🔴 API Error:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Producto no encontrado');
    }
    if (error.response?.status >= 500) {
      throw new Error('Error del servidor. Intente más tarde.');
    }
    if (error.code === 'ECONNREFUSED') {
      throw new Error('No se puede conectar al servidor. ¿Está el backend funcionando?');
    }
    
    return Promise.reject(error);
  }
);

export const productService = {
  // Obtener producto por ID
  getProduct: async (productId) => {
    try {
      console.log(`📦 Fetching product: ${productId}`);
      const response = await apiClient.get(`/api/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },
  
  // Obtener lista de productos
  getProducts: async (params = {}) => {
    try {
      console.log('📦 Fetching products with params:', params);
      const response = await apiClient.get('/api/products/', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  // Buscar productos
  searchProducts: async (query, limit = 10) => {
    try {
      console.log(`🔍 Searching products: ${query}`);
      const response = await apiClient.get(`/api/products/search/${encodeURIComponent(query)}`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },
  
  // Productos relacionados
  getRelatedProducts: async (productId, limit = 4) => {
    try {
      console.log(`🔗 Fetching related products for: ${productId}`);
      const response = await apiClient.get(`/api/products/${productId}/related`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching related products:', error);
      throw error;
    }
  },
  
  // Health check
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
};

export default apiClient;