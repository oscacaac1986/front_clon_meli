import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  MapPin,
  Shield,
  Star,
  Truck,
  Wifi,
  WifiOff
} from 'lucide-react';
import React from 'react';
import { useBackendConnection, useProductData } from '../../hooks/useProductData';
import RelatedProducts from './RelatedProducts';

const ProductPage = () => {
  // Verificar conexión con backend
  const { isConnected, loading: connectionLoading } = useBackendConnection();
  
  // Usar ID del producto por defecto
  const defaultProductId = 'MLA123456789';
  const { productData, loading, error } = useProductData(defaultProductId);

  // Estados para la interfaz
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedColor, setSelectedColor] = React.useState('');
  const [imageErrors, setImageErrors] = React.useState(new Set());

  // Actualizar color seleccionado cuando se carguen los datos
  React.useEffect(() => {
    if (productData?.colors?.length > 0) {
      setSelectedColor(productData.colors[0].name);
    }
  }, [productData]);

  // Manejar errores de imágenes
  const handleImageError = (event, imageUrl) => {
    console.error('❌ Error cargando imagen:', imageUrl);
    setImageErrors(prev => new Set([...prev, imageUrl]));
    
    // Usar imagen por defecto
    if (!event.target.src.includes('default.svg')) {
      event.target.src = 'http://localhost:8000/static/images/products/default.svg';
    }
  };

  const nextImage = () => {
    if (productData?.images?.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === productData.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (productData?.images?.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? productData.images.length - 1 : prev - 1
      );
    }
  };

  // Estado de carga de conexión
  if (connectionLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Conectando con el servidor...</p>
        </div>
      </div>
    );
  }

  // Error de conexión
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <WifiOff className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No se puede conectar al servidor
          </h2>
          <p className="text-gray-600 mb-4">
            Verifica que el backend esté funcionando en http://localhost:8000
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
          >
            Reintentar conexión
          </button>
        </div>
      </div>
    );
  }

  // Estado de carga del producto
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-yellow-400 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-800">MercadoLibre</h1>
              <div className="flex items-center space-x-2 text-green-600">
                <Wifi className="w-4 h-4" />
                <span className="text-sm">Conectado</span>
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando producto desde el servidor...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error al cargar producto
  if (error || !productData) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-yellow-400 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-800">MercadoLibre</h1>
              <div className="flex items-center space-x-2 text-green-600">
                <Wifi className="w-4 h-4" />
                <span className="text-sm">Conectado</span>
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {error || 'Producto no encontrado'}
            </h2>
            <button 
              onClick={() => window.location.reload()}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con indicador de conexión */}
      <header className="bg-yellow-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800">MercadoLibre</h1>
            <div className="flex items-center space-x-2 text-green-600">
              <Wifi className="w-4 h-4" />
              <span className="text-sm">API Conectada</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <input 
              type="text" 
              placeholder="Buscar productos, marcas y más..."
              className="w-96 px-4 py-2 rounded-sm border-none outline-none"
            />
            <button className="bg-gray-200 px-4 py-2 rounded-sm hover:bg-gray-300 transition-colors">
              Buscar
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Indicador de que los datos vienen del backend */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <div className="flex items-center space-x-2 text-blue-700">
            <Wifi className="w-5 h-5" />
            <span className="text-sm font-medium">
              Datos e imágenes cargados desde FastAPI Backend (ID: {productData.id})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Images */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="relative">
                <img 
                  src={productData.images[currentImageIndex]}
                  alt={productData.title}
                  className="w-full h-96 object-contain rounded-lg"
                  onError={(e) => handleImageError(e, productData.images[currentImageIndex])}
                />
                {productData.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Images */}
              {productData.images.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto">
                  {productData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden ${
                        currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Vista ${index + 1}`}
                        className="w-full h-full object-contain"
                        onError={(e) => handleImageError(e, image)}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">Descripción</h3>
              <div className="space-y-4 text-gray-700">
                <p>{productData.description}</p>
                {productData.features.length > 0 && (
                  <>
                    <p>Características principales:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      {productData.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Specifications */}
            {productData.specifications.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h3 className="text-xl font-semibold mb-4">Características del producto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {productData.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Purchase Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              {/* Condition and Sales */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <span>{productData.condition}</span>
                <span>|</span>
                <span>{productData.soldQuantity} vendidos</span>
              </div>

              {/* Title */}
              <h1 className="text-xl font-semibold text-gray-900 mb-4">
                {productData.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < Math.floor(productData.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {productData.rating} ({productData.reviewsCount})
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-3xl font-light text-gray-900 mb-1">
                  {productData.currency} {productData.price.toLocaleString()}
                </div>
                {productData.installments.available && (
                  <div className="text-sm text-green-600">
                    en {productData.installments.count}x ${Math.round(productData.price / productData.installments.count)} {productData.installments.interest}
                  </div>
                )}
              </div>

              {/* Colors */}
              {productData.colors.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Color: {selectedColor}</h4>
                  <div className="flex space-x-2">
                    {productData.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => color.available && setSelectedColor(color.name)}
                        disabled={!color.available}
                        className={`px-3 py-2 border rounded-lg text-sm ${
                          selectedColor === color.name
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : color.available
                            ? 'border-gray-300 hover:border-gray-400'
                            : 'border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Cantidad:</h4>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(productData.stock, quantity + 1))}
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-600">
                    ({productData.stock} disponibles)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  Comprar ahora
                </button>
                <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-600 py-3 px-4 rounded-lg font-medium transition-colors">
                  Agregar al carrito
                </button>
              </div>

              {/* Features */}
              <div className="space-y-3 border-t border-gray-100 pt-6">
                {productData.freeShipping && (
                  <div className="flex items-center space-x-3 text-green-600">
                    <Truck className="w-5 h-5" />
                    <span className="text-sm">Envío gratis</span>
                  </div>
                )}
                {productData.fullWarranty && (
                  <div className="flex items-center space-x-3 text-green-600">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm">Garantía completa</span>
                  </div>
                )}
                {productData.mercadoPago && (
                  <div className="flex items-center space-x-3 text-blue-600">
                    <CreditCard className="w-5 h-5" />
                    <span className="text-sm">MercadoPago</span>
                  </div>
                )}
              </div>

              {/* Seller Info */}
              <div className="border-t border-gray-100 pt-6 mt-6">
                <h4 className="font-medium mb-3">Vendido por</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{productData.seller.name}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      productData.seller.reputation === 'verde' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {productData.seller.reputation}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{productData.seller.location}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {productData.seller.sales} ventas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts products={productData.relatedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;