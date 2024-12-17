// components/Header.js
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

const Header = ({ colorTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navCategories = [
    "Accessoires", "Aiguilles & Tubes", "Cartouches", "Encres",
    "Hygiène", "InKoncious", "Machines", "Mobilier", "Soins",
    "Solde", "Stencils"
  ];

  return (
    <header className="sticky top-0 z-40 shadow transition-colors duration-300" 
            style={{ backgroundColor: colorTheme.primary }}>
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="flex items-center h-16">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden mr-4 transition-transform duration-300 hover:scale-110"
            style={{ color: colorTheme.text }}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
          
          <nav className="hidden lg:flex space-x-4 flex-grow justify-center overflow-x-auto scrollbar-hide">
            {navCategories.map(category => (
              <a
                key={category}
                href={`/${category.toLowerCase().replace(/ & /g, '-')}`}
                className="transition-all duration-300 whitespace-nowrap hover:scale-105 hover:opacity-80 text-sm"
                style={{ color: colorTheme.text }}
              >
                {category}
              </a>
            ))}
          </nav>

          <div className="ml-auto w-[320px]">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-4 pr-10 py-2 rounded-full text-sm focus:outline-none transition-all duration-300 focus:shadow-lg"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-transform duration-300 hover:scale-110 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="lg:hidden absolute left-0 right-0 shadow-lg"
          style={{ backgroundColor: colorTheme.primary }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navCategories.map(category => (
              <a
                key={category}
                href={`/${category.toLowerCase().replace(/ & /g, '-')}`}
                className="block px-3 py-2 text-base font-medium transition-all duration-300 hover:scale-105 hover:opacity-80"
                style={{ color: colorTheme.text }}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;