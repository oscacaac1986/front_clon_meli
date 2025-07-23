export const MOCK_PRODUCT_DATA = {
  id: 'MLA123456789',
  title: 'Samsung Galaxy A55 5G Dual SIM 128 GB azul claro 8 GB RAM',
  price: 439,
  originalPrice: null,
  currency: 'US$',
  condition: 'Nuevo',
  soldQuantity: '500+',
  rating: 4.5,
  reviewsCount: 127,
  freeShipping: true,
  fullWarranty: true,
  mercadoPago: true,
  images: [
    'https://via.placeholder.com/400x400/667eea/ffffff?text=Galaxy+A55+1',
    'https://via.placeholder.com/400x400/764ba2/ffffff?text=Galaxy+A55+2',
    'https://via.placeholder.com/400x400/f093fb/ffffff?text=Galaxy+A55+3',
    'https://via.placeholder.com/400x400/4facfe/ffffff?text=Galaxy+A55+4'
  ],
  colors: [
    { name: 'Negro', available: true },
    { name: 'Azul claro', available: true },
    { name: 'Blanco', available: false }
  ],
  specifications: [
    { label: 'Memoria RAM', value: '8 GB' },
    { label: 'Almacenamiento interno', value: '128 GB' },
    { label: 'Tipo de pantalla', value: 'Super AMOLED' },
    { label: 'Tamaño de pantalla', value: '6.6"' },
    { label: 'Resolución de la cámara trasera principal', value: '50 Mpx' },
    { label: 'Sistema operativo', value: 'Android' }
  ],
  seller: {
    name: 'TecnoOficial',
    reputation: 'verde',
    sales: '1000+',
    location: 'Capital Federal'
  },
  stock: 25,
  paymentMethods: ['visa', 'mastercard', 'mercadopago'],
  installments: {
    available: true,
    count: 12,
    interest: 'sin interés'
  }
};

export const PAYMENT_METHODS = {
  visa: 'Visa',
  mastercard: 'Mastercard', 
  mercadopago: 'MercadoPago',
  amex: 'American Express'
};

export const SELLER_REPUTATION_COLORS = {
  verde: 'bg-green-100 text-green-800',
  amarillo: 'bg-yellow-100 text-yellow-800',
  rojo: 'bg-red-100 text-red-800'
};