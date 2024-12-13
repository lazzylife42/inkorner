import { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronLeft, ChevronRight, Palette } from 'lucide-react';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  
  // Définition des palettes de couleurs
  const colorThemes = [
    {
      name: "Original",
      primary: "#1A1A1A",
      secondary: "#9A2617",
      accent: "#8B8178",
      background: "#F5F5F5",
      text: "#ffffff"
    },
    {
      name: "Océan Profond",
      primary: "#1a3c5a",
      secondary: "#2d6a9f",
      accent: "#40b5c4",
      background: "#f0f5f9",
      text: "#ffffff"
    },
    {
      name: "Forêt Enchantée",
      primary: "#2d5a4d",
      secondary: "#4a8c76",
      accent: "#6fb98f",
      background: "#f2f7f5",
      text: "#ffffff"
    },
    {
      name: "Glacier Nordique",
      primary: "#2b4c7e",
      secondary: "#567ebc",
      accent: "#88a9d9",
      background: "#f4f7fb",
      text: "#ffffff"
    },
    {
      name: "Lagon Tropical",
      primary: "#006d77",
      secondary: "#83c5be",
      accent: "#edf6f9",
      background: "#f8f9fa",
      text: "#ffffff"
    },
    {
      name: "Aurore Boréale",
      primary: "#5f0f40",
      secondary: "#9a0f58",
      accent: "#0a8754",
      background: "#f0f7f4",
      text: "#ffffff"
    },
    {
      name: "Coucher de Soleil",
      primary: "#2d3142",
      secondary: "#ef8354",
      accent: "#4f5d75",
      background: "#fef9f8",
      text: "#ffffff"
    },
    {
      name: "Menthe Fraîche",
      primary: "#004e64",
      secondary: "#00a5cf",
      accent: "#9fffcb",
      background: "#f1fefa",
      text: "#ffffff"
    },
    {
      name: "Lavande",
      primary: "#474973",
      secondary: "#9b9ece",
      accent: "#e1e2ef",
      background: "#f7f7fd",
      text: "#ffffff"
    }
  ];

  const CARDS_PER_ROW = 4;
  const ROWS_TO_SHOW = 2;
  const initialDisplayCount = CARDS_PER_ROW * ROWS_TO_SHOW;

  const categories = [
    "Accessoires", "Aiguilles & Tubes", "Cartouches", "Encres", 
    "Hygiène", "InKoncious", "Machines", "Mobilier", "Soins", 
    "Solde", "Stencils"
  ];

  const slides = [
    { id: 1, image: "/images/carousel/slide1.jpg", title: "Nouvelle Collection" },
    { id: 2, image: "/images/carousel/slide2.jpg", title: "Promotions" },
    { id: 3, image: "/images/carousel/slide3.jpg", title: "Événements" }
  ];

  const displayedCategories = showAllCategories 
    ? categories 
    : categories.slice(0, initialDisplayCount);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const selectTheme = (index) => {
    setCurrentTheme(index);
    setShowThemeSelector(false);
  };

  const currentColors = colorThemes[currentTheme];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: currentColors.background }}>
      {/* Bouton sélecteur de thème */}
      <button
        onClick={() => setShowThemeSelector(!showThemeSelector)}
        className="fixed right-4 top-4 z-50 p-2 rounded-full shadow-lg"
        style={{ backgroundColor: currentColors.secondary }}
      >
        <Palette className="h-6 w-6" style={{ color: currentColors.text }} />
      </button>

      {/* Menu sélecteur de thème */}
      {showThemeSelector && (
        <div className="fixed right-4 top-16 z-50 bg-white rounded-lg shadow-xl p-4 w-64">
          <h3 className="text-lg font-semibold mb-3">Thèmes de couleurs</h3>
          <div className="space-y-2">
            {colorThemes.map((theme, index) => (
              <button
                key={theme.name}
                onClick={() => selectTheme(index)}
                className="w-full text-left p-2 rounded flex items-center space-x-2 hover:bg-gray-100"
              >
                <div className="flex space-x-1">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.primary }} />
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.secondary }} />
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.accent }} />
                </div>
                <span className="ml-2">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Logo Section */}
      <div className="py-4 px-6" style={{ backgroundColor: currentColors.background }}>
        <img src="/logo.svg" alt="Inkorner Logo" className="h-28 mx-auto" />
      </div>

      {/* Navigation */}
      <header className="shadow sticky top-0 z-40" style={{ backgroundColor: currentColors.primary }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
              style={{ color: currentColors.text }}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
            
            <nav className="hidden lg:flex space-x-6 flex-shrink min-w-0">
              {categories.map(category => (
                <a
                  key={category}
                  href="/"
                  className="transition-colors whitespace-nowrap hover:opacity-80"
                  style={{ color: currentColors.text }}
                >
                  {category}
                </a>
              ))}
            </nav>

            <div className="flex items-center flex-shrink-0 ml-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-3 pr-10 py-1 rounded-full text-sm focus:outline-none"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden" style={{ backgroundColor: currentColors.primary }}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {categories.map(category => (
              <a
                key={category}
                href="/"
                className="block px-3 py-2 text-base font-medium hover:opacity-80"
                style={{ color: currentColors.text }}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Carousel */}
      <div className="relative bg-white">
        <div className="overflow-hidden relative h-96">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
                index === currentSlide ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white">{slide.title}</h2>
              </div>
            </div>
          ))}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
            style={{ backgroundColor: `${currentColors.primary}80` }}
          >
            <ChevronLeft className="h-6 w-6" style={{ color: currentColors.text }} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
            style={{ backgroundColor: `${currentColors.primary}80` }}
          >
            <ChevronRight className="h-6 w-6" style={{ color: currentColors.text }} />
          </button>
        </div>
      </div>

      {/* Category Blocks */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCategories.map((category) => (
            <div
              key={category}
              className="relative w-64 h-64 mx-auto group"
            >
              <div className="w-full h-full rounded-lg overflow-hidden">
                <img
                  src={`/images/categories/${category.toLowerCase().replace(/ & /g, '-')}.jpg`}
                  alt={category}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{category}</h3>
                    <button 
                      className="w-full text-white px-4 py-2 rounded text-sm font-medium transition-all duration-300 opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: `${currentColors.primary}CC` }}
                    >
                      Voir plus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bouton "Tout voir" */}
        {!showAllCategories && categories.length > initialDisplayCount && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllCategories(true)}
              className="px-6 py-3 rounded transition-colors font-medium"
              style={{ 
                backgroundColor: currentColors.accent,
                color: currentColors.primary
              }}
            >
              Voir toutes les catégories
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;