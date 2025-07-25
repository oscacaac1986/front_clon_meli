import { Star } from 'lucide-react';

const RelatedProducts = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-6">Productos relacionados</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="relative mb-3">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-32 object-contain group-hover:scale-105 transition-transform"
                />
                {product.freeShipping && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Envío gratis
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900 leading-tight h-10 overflow-hidden">
                  {product.title}
                </h4>
                
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">
                    ({product.reviewsCount})
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className="text-lg font-semibold text-gray-900">
                    {product.currency} {product.price}
                  </div>
                  <div className="text-xs text-green-600">
                    en 12x ${Math.round(product.price / 12)} sin interés
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  {product.condition}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline">
            Ver más productos similares
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;