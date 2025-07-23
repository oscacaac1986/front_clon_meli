import {
    Award,
    ChevronLeft,
    ChevronRight,
    Heart,
    MapPin,
    Share2,
    Shield,
    Star,
    Truck
} from 'lucide-react';
import { useState } from 'react';

const ProductDetailPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Azul');

  // Datos simulados del producto (en un proyecto real vendrían de una API)
  const product = {
    id: 1,
    title: "Samsung Galaxy A55 5G Dual SIM 128 GB Awesome Blue 8 GB RAM",
    price: 439.99,
    originalPrice: 699.99,
    discount: 37,
    rating: 4.5,
    reviewsCount: 847,
    stock: 15,
    condition: "Nuevo",
    soldQuantity: "500+ vendidos",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500"
    ],
    colors: ["Azul", "Negro", "Blanco"],
    shipping: {
      free: true,
      arrives: "mañana",
      fullShipping: true
    },
    seller: {
      name: "Samsung Official",
      reputation: "Tienda oficial",
      score: 4.8,
      sales: "50k+ ventas"
    },
    specifications: {
      "Memoria interna": "128 GB",
      "Memoria RAM": "8 GB",
      "Pantalla": "6.6 pulgadas",
      "Cámara principal": "50 Mpx",
      "Conectividad": "5G"
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <img src="https://logoeps.com/wp-content/uploads/2013/03/mercado-libre-vector-logo.png" 
               alt="MercadoLibre" className="h-8" />
          <div className="flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Buscar productos, marcas y más..."
              className="w-full px-4 py-2 rounded-sm shadow-sm"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              
              {/* Product Images */}
              <div className="relative mb-6">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation buttons */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Thumbnail images */}
                <div className="flex space-x-2 mt-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded border-2 overflow-hidden ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Title & Rating */}
              <div>
                <p className="text-sm text-gray-600 mb-2">{product.condition} | {product.soldQuantity}</p>
                <h1 className="text-2xl font-light text-gray-800 mb-3">{product.title}</h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-3xl font-light">{formatPrice(product.price)}</span>
                    <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  </div>
                  <p className="text-gray-500 line-through">{formatPrice(product.originalPrice)}</p>
                  <p className="text-green-600 text-sm">en 12x {formatPrice(product.price / 12)}</p>
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Color: {selectedColor}</h3>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded ${
                          selectedColor === color
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specifications */}
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Características del producto</h3>
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Options */}
          <div className="space-y-6">
            
            {/* Purchase Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Truck className="text-green-600" size={20} />
                  <span className="text-green-600 font-medium">Envío gratis</span>
                </div>
                <p className="text-sm text-gray-600">Llega {product.shipping.arrives}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <MapPin size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600">Enviar a Bogotá</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-2">
                  <Shield className="text-blue-600" size={20} />
                  <span className="text-blue-600 font-medium">Compra Protegida</span>
                </div>
                <p className="text-sm text-gray-600">Se abre en una nueva ventana</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Stock disponible: {product.stock} unidades</p>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad:
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors">
                  Comprar ahora
                </button>
                <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-md border border-blue-200 transition-colors">
                  Agregar al carrito
                </button>
              </div>

              <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t">
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                  <Heart size={16} />
                  <span className="text-sm">Agregar a favoritos</span>
                </button>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                  <Share2 size={16} />
                  <span className="text-sm">Compartir</span>
                </button>
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium mb-4">Información del vendedor</h3>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Award className="text-gray-600" size={20} />
                </div>
                <div>
                  <p className="font-medium">{product.seller.name}</p>
                  <p className="text-sm text-blue-600">{product.seller.reputation}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Puntuación</span>
                  <span className="font-medium">{product.seller.score}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ventas</span>
                  <span className="font-medium">{product.seller.sales}</span>
                </div>
              </div>

              <button className="w-full mt-4 border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition-colors">
                Ver más datos del vendedor
              </button>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium mb-4">Medios de pago</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-green-600 mb-2">Hasta 12 cuotas sin tarjeta</p>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-blue-600 text-white text-xs p-1 rounded text-center">VISA</div>
                    <div className="bg-red-600 text-white text-xs p-1 rounded text-center">Master</div>
                    <div className="bg-blue-400 text-white text-xs p-1 rounded text-center">AMEX</div>
                    <div className="bg-orange-500 text-white text-xs p-1 rounded text-center">DIN</div>
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <p className="font-medium mb-2">Efectivo</p>
                  <p className="text-sm text-gray-600">PagoEfectivo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;