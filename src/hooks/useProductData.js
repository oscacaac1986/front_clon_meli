import { useEffect, useState } from 'react';
import { productService } from '../services/api';
import { MOCK_PRODUCT_DATA } from '../utils/constants';

export const useProductData = (productId) => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // En desarrollo, usar datos mock
        if (process.env.NODE_ENV === 'development') {
          // Simular delay de API
          await new Promise(resolve => setTimeout(resolve, 1000));
          setProductData(MOCK_PRODUCT_DATA);
        } else {
          // En producción, usar API real
          const data = await productService.getProduct(productId);
          setProductData(data);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching product data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  return { productData, loading, error };
};