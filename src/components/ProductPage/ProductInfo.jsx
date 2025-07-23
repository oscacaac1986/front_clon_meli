
const ProductInfo = ({ productData }) => {
  return (
    <>
      {/* Product Description */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h3 className="text-xl font-semibold mb-4">Descripción</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            El Samsung Galaxy A55 5G combina diseño premium con rendimiento excepcional. 
            Su pantalla Super AMOLED de 6.6 pulgadas ofrece colores vibrantes y detalles nítidos.
          </p>
          <p>Características principales:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Procesador Exynos 1480 de alto rendimiento</li>
            <li>Sistema de cámara triple con IA</li>
            <li>Batería de 5000 mAh con carga rápida</li>
            <li>Resistente al agua IP67</li>
          </ul>
        </div>
      </div>

      {/* Specifications */}
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
    </>
  );
};

export default ProductInfo;