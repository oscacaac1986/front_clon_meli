import api from './api';

export const productService = {
  // Obtener producto por ID
  getProduct: async (productId) => {
    try {
      const response = await api.get(`/items/${productId}`);
      return response.data;
    } catch (error) {
      // Fallback con datos simulados si falla la API
      return getMockProduct();
    }
  },

  // Obtener descripción del producto
  getProductDescription: async (productId) => {
    try {
      const response = await api.get(`/items/${productId}/description`);
      return response.data;
    } catch (error) {
      return { plain_text: 'Descripción no disponible' };
    }
  },
};

// Datos simulados para desarrollo
const getMockProduct = () => ({
  id: 'MLA123456789',
  title: 'Samsung Galaxy A55 5G Dual SIM 128 GB Awesome Blue 8 GB RAM',
  price: 439.99,
  original_price: 699.99,
  currency_id: 'USD',
  condition: 'new',
  thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
  pictures: [
    { secure_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500' },
    { secure_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500' },
    { secure_url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500' }
  ],
  attributes: [
    { name: 'Memoria interna', value_name: '128 GB' },
    { name: 'Memoria RAM', value_name: '8 GB' },
    { name: 'Pantalla', value_name: '6.6 pulgadas' },
    { name: 'Cámara principal', value_name: '50 Mpx' },
    { name: 'Conectividad', value_name: '5G' }
  ],
  seller: {
    nickname: 'SAMSUNG_OFICIAL',
    reputation: {
      level_id: 'gold',
      power_seller_status: 'gold'
    }
  },
  shipping: {
    free_shipping: true
  }
});