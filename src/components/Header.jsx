import { useState } from "react";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ colorTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const navCategories = [
    { name: "Accessoires", path: "accessoires" },
    { name: "Aiguilles & Tubes", path: "aiguilles-tubes" },
    { name: "Cartouches", path: "cartouches" },
    { name: "Encres", path: "encres" },
    { name: "Hygiène", path: "hygiene" },
    { name: "InKoncious", path: "inkoncious" },
    { name: "Machines", path: "machines" },
    { name: "Mobilier", path: "mobilier" },
    { name: "Soins", path: "soins" },
    { name: "Solde", path: "solde" },
    { name: "Stencils", path: "stencils" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <header
      className="sticky top-0 z-40 shadow transition-colors duration-300"
      style={{ backgroundColor: colorTheme.primary }}
    >
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
            {navCategories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.path}`}
                className="transition-all duration-300 whitespace-nowrap hover:scale-105 hover:opacity-80 text-sm"
                style={{ color: colorTheme.text }}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative w-[280px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher..."
                className="w-full pl-4 pr-10 py-2 rounded-full text-sm focus:outline-none transition-all duration-300 focus:shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-300 hover:scale-110"
              >
                <Search className="h-4 w-4 text-gray-400" />
              </button>
            </form>

            <div className="flex items-center space-x-3">
              <Link
                to="/account"
                className="transition-transform duration-300 hover:scale-110"
                style={{ color: colorTheme.text }}
              >
                <User className="h-6 w-6" />
              </Link>
              <Link
                to="/cart"
                className="transition-transform duration-300 hover:scale-110"
                style={{ color: colorTheme.text }}
              >
                <ShoppingCart className="h-6 w-6" />
              </Link>
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
            {navCategories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.path}`}
                className="block px-3 py-2 text-base font-medium transition-all duration-300 hover:scale-105 hover:opacity-80"
                style={{ color: colorTheme.text }}
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;