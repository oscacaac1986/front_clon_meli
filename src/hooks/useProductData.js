import { useEffect, useState } from 'react';
import { productService } from '../services/api';

export const useProductData = (productId) => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching product data from API...');
        const data = await productService.getProduct(productId);
        console.log('✅ Product data received:', data);
        
        // Transformar datos del backend al formato esperado por el frontend
        const transformedData = {
          id: data.id,
          title: data.title,
          price: data.price,
          originalPrice: data.original_price,
          currency: data.currency,
          condition: data.condition,
          soldQuantity: data.sold_quantity,
          rating: data.rating,
          reviewsCount: data.reviews_count,
          freeShipping: data.free_shipping,
          fullWarranty: data.full_warranty,
          mercadoPago: data.mercado_pago,
          images: data.images || [],
          colors: data.colors || [],
          specifications: data.specifications || [],
          seller: {
            name: data.seller?.name || 'Vendedor desconocido',
            reputation: data.seller?.reputation || 'Sin reputación',
            sales: data.seller?.sales || '0',
            location: data.seller?.location || 'Sin ubicación'
          },
          stock: data.stock || 0,
          paymentMethods: data.payment_methods || [],
          installments: data.installments || { available: false, count: 0, interest: '' },
          description: data.description || '',
          features: data.features || [],
          relatedProducts: data.related_products?.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            currency: product.currency,
            image: product.image,
            rating: product.rating,
            reviewsCount: product.reviews_count,
            freeShipping: product.free_shipping,
            condition: product.condition
          })) || []
        };
        
        setProductData(transformedData);
        console.log('✅ Product data transformed and set');
        
      } catch (err) {
        console.error('❌ Error fetching product data:', err);
        setError(err.message);
        setProductData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  return { productData, loading, error };
};

// Hook para verificar conexión con backend
export const useBackendConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        setLoading(true);
        await productService.healthCheck();
        setIsConnected(true);
        console.log('✅ Backend connection: OK');
      } catch (error) {
        setIsConnected(false);
        console.error('❌ Backend connection: FAILED', error.message);
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  return { isConnected, loading };
};