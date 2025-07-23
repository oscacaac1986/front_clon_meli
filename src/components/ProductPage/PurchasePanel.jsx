import { CreditCard, MapPin, Shield, Star, Truck } from 'lucide-react';
import { useState } from 'react';

const PurchasePanel = ({ productData }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]?.name || '');

  const handleBuyNow = () => {
    console.log('Comprar ahora:', { quantity, selectedColor });
    // Aquí implementarías la lógica de compra
  };

  const handleAddToCart = () => {
    console.log('Agregar al carrito:', { quantity, selectedColor });
    // Aquí implementarías la lógica del carrito
  };

  return (
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
                className={`px-3 py-2 border rounded-lg text-sm transition-colors ${
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
            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            -
          </button>
          <span className="font-medium">{quantity}</span>
          <button 
            onClick={() => setQuantity(Math.min(productData.stock, quantity + 1))}
            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
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
        <button 
          onClick={handleBuyNow}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Comprar ahora
        </button>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-blue-100 hover:bg-blue-200 text-blue-600 py-3 px-4 rounded-lg font-medium transition-colors"
        >
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
  );
};

export default PurchasePanel;