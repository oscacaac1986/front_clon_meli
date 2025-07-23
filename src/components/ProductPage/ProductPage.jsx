import { useProductData } from '../../hooks/useProductData';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import PurchasePanel from './PurchasePanel';

const ProductPage = ({ productId = 'MLA123456789' }) => {
  const { productData, loading, error } = useProductData(productId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800">MercadoLibre</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Images and Info */}
          <div className="lg:col-span-2">
            <ProductImages 
              images={productData.images} 
              title={productData.title}
            />
            <ProductInfo productData={productData} />
          </div>

          {/* Purchase Panel */}
          <div className="lg:col-span-1">
            <PurchasePanel productData={productData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;