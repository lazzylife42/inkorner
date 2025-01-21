import { useState } from "react";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from '../utils/CartContext';

const Header = ({ colorTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { getCartCount } = useCart();

  const navCategories = [
    { name: "Access.", path: "accessoires", fullName: "Accessoires" },
    { name: "Aig. & Tubes", path: "aiguilles-tubes", fullName: "Aiguilles & Tubes" },
    { name: "Cartouches", path: "cartouches", fullName: "Cartouches" },
    { name: "Encres", path: "encres", fullName: "Encres" },
    { name: "Hygiène", path: "hygiene", fullName: "Hygiène" },
    { name: "InKoncious", path: "inkoncious", fullName: "InKoncious" },
    { name: "Machines", path: "machines", fullName: "Machines" },
    { name: "Mobilier", path: "mobilier", fullName: "Mobilier" },
    { name: "Soins", path: "soins", fullName: "Soins" },
    { name: "Solde", path: "solde", fullName: "Solde" },
    { name: "Stencils", path: "stencils", fullName: "Stencils" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className="sticky top-0 z-40 shadow transition-colors duration-300"
      style={{ backgroundColor: colorTheme.primary }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden mr-4 transition-transform duration-300 hover:scale-110"
            style={{ color: colorTheme.text }}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex flex-shrink-0 justify-center flex-grow mx-4">
            <nav className="flex items-center justify-center space-x-6">
              {navCategories.map((category) => (
                <Link
                  key={category.name}
                  to={`/category/${category.path}`}
                  className="text-sm transition-all duration-300 hover:scale-105 hover:opacity-80"
                  style={{ color: colorTheme.text }}
                  title={category.fullName}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                to="/marques"
                className="text-sm transition-all duration-300 hover:scale-105 hover:opacity-80"
                style={{ color: colorTheme.text }}
              >
                Marques
              </Link>
            </nav>
          </div>

          {/* Recherche et Icônes */}
          <div className="flex items-center gap-4 flex-grow justify-end">
            <form onSubmit={handleSearch} className="relative hidden md:block w-[200px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher..."
                className="w-full pl-4 pr-10 py-2 rounded-full text-sm focus:outline-none transition-all duration-300 focus:shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                aria-label="Rechercher"
              >
                <Search className="h-4 w-4 text-gray-400 cursor-pointer" />
              </button>
            </form>

            <div className="flex items-center gap-3">
              <Link
                to="/account"
                className="transition-transform duration-300 hover:scale-110"
                style={{ color: colorTheme.text }}
                aria-label="Mon compte"
              >
                <User className="h-6 w-6" />
              </Link>
              <Link
                to="/cart"
                className="relative transition-transform duration-300 hover:scale-110"
                style={{ color: colorTheme.text }}
                aria-label="Panier"
              >
                <ShoppingCart className="h-6 w-6" />
                {getCartCount() > 0 && (
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center"
                    style={{ backgroundColor: colorTheme.accent, color: colorTheme.text }}
                  >
                    {getCartCount()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div
          className="lg:hidden absolute left-0 right-0 shadow-lg"
          style={{ backgroundColor: colorTheme.primary }}
        >
          <div className="px-4 py-2">
            <form onSubmit={handleSearch} className="relative w-full mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher..."
                className="w-full pl-4 pr-10 py-2 rounded-full text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-4 w-4 text-gray-400" />
              </button>
            </form>

            <div className="space-y-1">
              {navCategories.map((category) => (
                <Link
                  key={category.name}
                  to={`/category/${category.path}`}
                  className="block px-2 py-2 rounded-md text-base transition-all duration-300 hover:bg-black/10"
                  style={{ color: colorTheme.text }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.fullName}
                </Link>
              ))}
              <Link
                to="/marques"
                className="block px-2 py-2 rounded-md text-base transition-all duration-300 hover:bg-black/10"
                style={{ color: colorTheme.text }}
                onClick={() => setIsMenuOpen(false)}
              >
                Nos Marques
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
