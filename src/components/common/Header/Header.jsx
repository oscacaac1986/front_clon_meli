import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-yellow-400 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center space-x-4">
        <img 
          src="https://logoeps.com/wp-content/uploads/2013/03/mercado-libre-vector-logo.png" 
          alt="MercadoLibre" 
          className="h-8" 
        />
        <div className="flex-1 max-w-2xl relative">
          <input
            type="text"
            placeholder="Buscar productos, marcas y más..."
            className="w-full px-4 py-2 pr-12 rounded-sm shadow-sm border-0 focus:ring-2 focus:ring-blue-500"
          />
          <Search 
            className="absolute right-3 top-2.5 text-gray-400" 
            size={20} 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;