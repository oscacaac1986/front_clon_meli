import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { productService } from '../../services/api';
import ProductPage from '../ProductPage/ProductPage';

// Mock del servicio
jest.mock('../../services/api', () => ({
  productService: {
    getProduct: jest.fn(),
    healthCheck: jest.fn()
  }
}));

const mockProductData = {
  id: 'MLA123456789',
  title: 'Samsung Galaxy A55 5G Test',
  price: 439,
  currency: 'US$',
  condition: 'Nuevo',
  sold_quantity: '500+',
  rating: 4.5,
  reviews_count: 127,
  free_shipping: true,
  full_warranty: true,
  mercado_pago: true,
  images: [
    'http://localhost:8000/static/images/products/galaxy_a55_1.svg'
  ],
  colors: [
    { name: 'Negro', available: true },
    { name: 'Azul claro', available: true }
  ],
  specifications: [
    { label: 'Memoria RAM', value: '8 GB' }
  ],
  seller: {
    name: 'TecnoOficial',
    reputation: 'verde',
    sales: '1000+',
    location: 'Capital Federal'
  },
  stock: 25,
  payment_methods: ['visa', 'mastercard'],
  installments: {
    available: true,
    count: 12,
    interest: 'sin interés'
  },
  description: 'Test description',
  features: ['Feature 1', 'Feature 2'],
  related_products: []
};

describe('ProductPage', () => {
  beforeEach(() => {
    // Reset mocks antes de cada test
    jest.clearAllMocks();
    productService.healthCheck.mockResolvedValue({ status: 'healthy' });
  });

  test('should render loading state initially', () => {
    productService.getProduct.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(<ProductPage />);
    
    expect(screen.getByText(/Conectando con el servidor/i)).toBeInTheDocument();
  });

  test('should render product data when loaded successfully', async () => {
    productService.getProduct.mockResolvedValue(mockProductData);
    
    render(<ProductPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Samsung Galaxy A55 5G Test/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/US\$ 439/i)).toBeInTheDocument();
    expect(screen.getByText(/TecnoOficial/i)).toBeInTheDocument();
    expect(screen.getByText(/Envío gratis/i)).toBeInTheDocument();
  });

  test('should handle product not found error', async () => {
    productService.getProduct.mockRejectedValue(new Error('Product not found'));
    
    render(<ProductPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Producto no encontrado/i)).toBeInTheDocument();
    });
  });

  test('should handle backend connection error', async () => {
    productService.healthCheck.mockRejectedValue(new Error('Connection failed'));
    
    render(<ProductPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/No se puede conectar al servidor/i)).toBeInTheDocument();
    });
  });

  test('should change product image when thumbnail is clicked', async () => {
    const multiImageProduct = {
      ...mockProductData,
      images: [
        'http://localhost:8000/static/images/products/galaxy_a55_1.svg',
        'http://localhost:8000/static/images/products/galaxy_a55_2.svg'
      ]
    };
    
    productService.getProduct.mockResolvedValue(multiImageProduct);
    
    render(<ProductPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Samsung Galaxy A55 5G Test/i)).toBeInTheDocument();
    });

    // Verificar que hay thumbnails
    const thumbnails = screen.getAllByAltText(/Vista \d+/);
    expect(thumbnails).toHaveLength(2);
    
    // Click en el segundo thumbnail
    fireEvent.click(thumbnails[1]);
    
    // Verificar que la imagen principal cambió
    const mainImage = screen.getByAltText(/Samsung Galaxy A55 5G Test/);
    expect(mainImage.src).toBe('http://localhost:8000/static/images/products/galaxy_a55_2.svg');
  });

  test('should update quantity when buttons are clicked', async () => {
    productService.getProduct.mockResolvedValue(mockProductData);
    
    render(<ProductPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Samsung Galaxy A55 5G Test/i)).toBeInTheDocument();
    });

    // Buscar botones de cantidad
    const increaseButton = screen.getByText('+');
    const decreaseButton = screen.getByText('-');
    
    // Verificar cantidad inicial
    expect(screen.getByText('1')).toBeInTheDocument();
    
    // Incrementar cantidad
    fireEvent.click(increaseButton);
    expect(screen.getByText('2')).toBeInTheDocument();
    
    // Decrementar cantidad
    fireEvent.click(decreaseButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('should change selected color when color button is clicked', async () => {
    productService.getProduct.mockResolvedValue(mockProductData);
    
    render(<ProductPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Color: Negro/i)).toBeInTheDocument();
    });

    // Click en color azul claro
    const azulClaroButton = screen.getByText('Azul claro');
    fireEvent.click(azulClaroButton);
    
    expect(screen.getByText(/Color: Azul claro/i)).toBeInTheDocument();
  });

  test('should show retry button on error', async () => {
    productService.getProduct.mockRejectedValue(new Error('API Error'));
    
    render(<ProductPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Intentar nuevamente/i)).toBeInTheDocument();
    });

    const retryButton = screen.getByText(/Intentar nuevamente/i);
    expect(retryButton).toBeInTheDocument();
  });
});