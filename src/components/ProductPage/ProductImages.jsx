import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const ProductImages = ({ images, title }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="relative">
        <img 
          src={images[currentImageIndex]}
          alt={title}
          className="w-full h-96 object-contain rounded-lg"
        />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex space-x-2 mt-4 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden transition-colors ${
                currentImageIndex === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img 
                src={image} 
                alt={`Vista ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;