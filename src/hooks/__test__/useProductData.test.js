import { renderHook, waitFor } from '@testing-library/react';
import { productService } from '../../services/api';
import { useBackendConnection, useProductData } from '../useProductData';

jest.mock('../../services/api');

describe('useProductData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return loading state initially', () => {
    productService.getProduct.mockImplementation(() => new Promise(() => {}));
    
    const { result } = renderHook(() => useProductData('MLA123456789'));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.productData).toBe(null);
    expect(result.current.error).toBe(null);
  });

  test('should return product data on successful fetch', async () => {
    const mockData = {
      id: 'MLA123456789',
      title: 'Test Product',
      price: 100,
      currency: 'US$',
      images: [],
      colors: [],
      specifications: [],
      seller: { name: 'Test Seller' },
      related_products: []
    };

    productService.getProduct.mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useProductData('MLA123456789'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.productData).toBeDefined();
    expect(result.current.productData.id).toBe('MLA123456789');
    expect(result.current.error).toBe(null);
  });

  test('should return error on failed fetch', async () => {
    productService.getProduct.mockRejectedValue(new Error('API Error'));
    
    const { result } = renderHook(() => useProductData('MLA123456789'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.productData).toBe(null);
    expect(result.current.error).toBe('API Error');
  });

  test('should not fetch when productId is null', () => {
    const { result } = renderHook(() => useProductData(null));
    
    expect(result.current.loading).toBe(false);
    expect(productService.getProduct).not.toHaveBeenCalled();
  });
});

describe('useBackendConnection', () => {
  test('should return connected state on successful health check', async () => {
    productService.healthCheck.mockResolvedValue({ status: 'healthy' });
    
    const { result } = renderHook(() => useBackendConnection());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.isConnected).toBe(true);
  });

  test('should return disconnected state on failed health check', async () => {
    productService.healthCheck.mockRejectedValue(new Error('Connection failed'));
    
    const { result } = renderHook(() => useBackendConnection());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.isConnected).toBe(false);
  });
});