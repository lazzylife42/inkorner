import { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronLeft, ChevronRight, Instagram, Mail, Phone } from 'lucide-react';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const colorTheme = {
    primary: "#9f7833",
    secondary: "#9f7833",
    accent: "#221804",
    background: "#221804",
    text: "#FFFFFF"
  };

  const navCategories = [
    "Accessoires", "Aiguilles & Tubes", "Cartouches", "Encres",
    "Hygiène", "InKoncious", "Machines", "Mobilier", "Soins",
    "Solde", "Stencils"
  ];

  const categories = [
    { id: "new", title: "NEW", image: "/images/categories/new.jpg" },
    { id: "machines", title: "MACHINES & POWER SUPPLIES", image: "/images/categories/machines.jpg" },
    { id: "needles", title: "NEEDLES, GRIPS & TUBES", image: "/images/categories/needles.jpg" },
    { id: "ink", title: "TATTOO INK", image: "/images/categories/ink.jpg" },
    { id: "hygiene", title: "HYGIENE & AFTERCARE", image: "/images/categories/hygiene.jpg" },
    { id: "supplies", title: "STUDIO SUPPLIES", image: "/images/categories/supplies.jpg" }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "CMD 1L Bottle of Cyber Green Soap",
      price: 12.50,
      currency: "CHF",
      image: "/images/products/cyber-green-soap.jpg"
    },
    {
      id: 2,
      name: "CMD Panthera Ink Black Gold 150ml",
      price: 35.00,
      currency: "CHF",
      image: "/images/products/panthera-ink.jpg"
    },
    {
      id: 3,
      name: "CMD Box x 100 Original ReproFX Spirit Classic Purple Thermal Copier Paper 8.5\" x 14\"",
      price: 55.00,
      currency: "CHF",
      image: "/images/products/reprofx-paper.jpg"
    },
    {
      id: 4,
      name: "Hustle Butter Deluxe - Organic Tattoo Care - 150 ml / 5 oz",
      price: 25.00,
      currency: "CHF",
      image: "/images/products/hustle-butter.jpg"
    },
    {
      id: 5,
      name: "inKoncious Cart. 05 RL 30 box 20",
      price: 28.00,
      currency: "CHF",
      image: "/images/products/inkoncious-cart.jpg"
    }
  ];

  const slides = [
    { id: 1, image: "/images/carousel/nouveaute.jpg", title: "Nouveautés" },
    { id: 2, image: "/images/carousel/promo.jpg", title: "Promotions" },
    { id: 3, image: "/images/carousel/start.jpg", title: "Start Tattoo" },
    { id: 4, image: "/images/carousel/actualite.jpg", title: "Actualités" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (<div className="min-h-screen flex flex-col" style={{ backgroundColor: colorTheme.background }}>
    {/* Logo Section */}
    <div className="py-4 px-6" style={{ backgroundColor: colorTheme.background }}>
      <img 
        src="/logo.svg" 
        alt="Inkorner Logo" 
        className="h-28 mx-auto transition-transform duration-300 hover:scale-105" 
      />
    </div>

    {/* Navigation */}
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

    {/* Carousel */}
    <div className="relative bg-white">
      <div className="overflow-hidden relative h-96">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-transform duration-700 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <h2 className="text-4xl font-bold text-white transition-all duration-300 hover:scale-105">
                {slide.title}
              </h2>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: `${colorTheme.primary}80` }}
        >
          <ChevronLeft className="h-6 w-6" style={{ color: colorTheme.text }} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: `${colorTheme.primary}80` }}
        >
          <ChevronRight className="h-6 w-6" style={{ color: colorTheme.text }} />
        </button>
      </div>
    </div>

    {/* Category Blocks */}
    <div className="w-full px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative h-64 xl:h-80 2xl:h-96 group w-full transition-transform duration-300 hover:scale-105"
          >
            <div className="w-full h-full rounded-md overflow-hidden border border-white">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div 
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to top, 
                    ${colorTheme.primary}CC,
                    ${colorTheme.primary}40,
                    transparent
                  )`
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 transition-transform duration-300 group-hover:translate-y-[-4px]">
                    {category.title}
                  </h3>
                  <button 
                    className="w-full text-white px-4 py-2 rounded text-sm font-medium bg-black/50
                             transition-all duration-300 transform translate-y-2 opacity-0 
                             group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black/70"
                  >
                    Voir plus
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Our Brands */}
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h2 className="text-2xl font-bold mb-8" style={{ color: colorTheme.text }}>Nos Marques</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
        {['Dynamic', 'Eclipse', 'inKoncious', 'Panthera', 'Dermalize Pro', 'World Famous'].map((brand) => (
          <a
            key={brand}
            href={`/brands/${brand.toLowerCase().replace(/ /g, '-')}`}
            className="flex items-center justify-center p-8 h-32 rounded-lg bg-white 
                     hover:shadow-lg hover:shadow-white/20 transition-all duration-300 
                     hover:scale-105 cursor-pointer group"
          >
            <img
              src={`/images/brands/${brand.toLowerCase().replace(/ /g, '-')}.jpg`}
              alt={`${brand} logo`}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </a>
        ))}
      </div>
      
      <div className="flex justify-center">
        <a
          href="/brands"
          className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-semibold 
                   transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
          style={{ 
            backgroundColor: colorTheme.primary,
            color: colorTheme.text,
          }}
        >
          Voir toutes nos marques
        </a>
      </div>
    </div>

    {/* Featured Products */}
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-2xl font-bold mb-6" style={{ color: colorTheme.text }}>Produits en vedette</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 justify-items-center">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-md overflow-hidden border border-white hover:border-gray-300 
                     transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20 
                     w-full max-w-[240px] mx-auto group"
          >
            <div className="relative w-full pb-[100%] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-3" style={{ backgroundColor: colorTheme.accent }}>
              <h3 className="text-white font-medium text-xs mb-2 line-clamp-2 h-8 transition-transform duration-300 group-hover:translate-y-[-2px]">
                {product.name}
              </h3>
              <p className="text-white font-bold text-sm">
                PV {product.price.toFixed(2)} {product.currency}
              </p>
              <button
                className="w-full mt-3 py-1.5 px-3 rounded text-sm transition-all duration-300 hover:brightness-110"
                style={{ backgroundColor: colorTheme.primary, color: colorTheme.text }}
              >
                Voir le produit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Footer */}
    <footer className="mt-auto py-8" style={{ backgroundColor: colorTheme.primary }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold" style={{ color: colorTheme.text }}>Contact</h4>
            <div className="space-y-2">
              <a 
                href="tel:+33000000000" 
                className="flex items-center space-x-2 text-sm transition-all duration-300 hover:scale-105" 
                style={{ color: colorTheme.text }}
              >
                <Phone className="flex-shrink-0" size={20} />
                <span className="flex-1 break-all">+33 0 00 00 00 00</span>
              </a>
              <a 
                href="mailto:contact@inkorner.com" 
                className="flex items-center space-x-2 text-sm transition-all duration-300 hover:scale-105" 
                style={{ color: colorTheme.text }}
              >
                <Mail className="flex-shrink-0" size={20} />
                <span className="flex-1 break-all">contact@inkorner.com</span>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold" style={{ color: colorTheme.text }}>Suivez-nous</h4>
            <a 
              href="https://www.instagram.com/inkorner.shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm transition-all duration-300 hover:scale-105"
              style={{ color: colorTheme.text }}
            >
              <Instagram className="flex-shrink-0" size={20} />
              <span>@inkorner</span>
            </a>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold" style={{ color: colorTheme.text }}>Newsletter</h4>
            <div className="max-w-full">
              <div className="flex flex-col md:flex-row gap-2 max-w-full">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full md:max-w-[65%] px-4 py-2 rounded md:rounded-l focus:outline-none transition-all duration-300 focus:scale-105"
                />
                <button
                  className="w-full md:w-auto px-4 py-2 rounded md:rounded-r whitespace-nowrap transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: colorTheme.accent,
                    color: colorTheme.text,
                  }}
                >
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
);
};

export default Layout;