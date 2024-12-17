// src/App.jsx
import { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Carousel from './components/Carousel.jsx';
import Categories from './components/Categories.jsx';

function App() {
  const colorTheme = {
    primary: "#9f7833",
    secondary: "#9f7833",
    accent: "#221804",
    background: "#221804",
    text: "#FFFFFF"
  };

  const featuredProducts = [
    {
      id: 1,
      name: "CMD 1L Flacon de Savon Vert Cyber",
      price: 12.50,
      currency: "CHF",
      image: "/images/products/cyber-green-soap.jpg"
    },
    {
      id: 2,
      name: "CMD Panthera Encre Noir Or 150ml",
      price: 35.00,
      currency: "CHF",
      image: "/images/products/panthera-ink.jpg"
    },
    {
      id: 3,
      name: "CMD Boîte x 100 Original ReproFX Spirit Classic Papier Thermique Violet 8.5\" x 14\"",
      price: 55.00,
      currency: "CHF",
      image: "/images/products/reprofx-paper.jpg"
    },
    {
      id: 4,
      name: "Hustle Butter Deluxe - Soin Bio pour Tatouage - 150 ml / 5 oz",
      price: 25.00,
      currency: "CHF",
      image: "/images/products/hustle-butter.jpg"
    },
    {
      id: 5,
      name: "inKoncious Cart. 05 RL 30 boîte de 20",
      price: 28.00,
      currency: "CHF",
      image: "/images/products/inkoncious-cart.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colorTheme.background }}>
      {/* Logo Section */}
      <div className="py-4 px-6" style={{ backgroundColor: colorTheme.background }}>
        <img 
          src="/logo.svg" 
          alt="Inkorner Logo" 
          className="h-28 mx-auto transition-transform duration-300 hover:scale-105" 
        />
      </div>

      {/* Header Component */}
      <Header colorTheme={colorTheme} />

      {/* Carousel Component */}
      <Carousel colorTheme={colorTheme} />

      {/* Categories Component */}
      <Categories colorTheme={colorTheme} />

      {/* Nos Marques */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h2 className="text-2xl font-bold mb-8" style={{ color: colorTheme.text }}>Nos Marques</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
          {['Dynamic', 'Eclipse', 'inKoncious', 'Panthera', 'Dermalize Pro', 'World Famous'].map((brand) => (
            <a
              key={brand}
              href={`/marques/${brand.toLowerCase().replace(/ /g, '-')}`}
              className="flex items-center justify-center p-8 h-32 rounded-lg bg-white 
                       hover:shadow-lg hover:shadow-white/20 transition-all duration-300 
                       hover:scale-105 cursor-pointer group"
            >
              <img
                src={`/images/brands/${brand.toLowerCase().replace(/ /g, '-')}.jpg`}
                alt={`Logo ${brand}`}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </a>
          ))}
        </div>
        
        <div className="flex justify-center">
          <a
            href="/marques"
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

      {/* Produits en vedette */}
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
                  {product.price.toFixed(2)} {product.currency}
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

      {/* Footer Component */}
      <Footer colorTheme={colorTheme} />
    </div>
  );
}

export default App;