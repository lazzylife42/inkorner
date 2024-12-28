// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Carousel from "./components/Carousel.jsx";
import Categories from "./components/Categories.jsx";
import ProductPage from "./components/ProductPage.jsx";
import { getFeaturedProducts } from "./utils/shopifyClient";

function App() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const colorTheme = {
    primary: "#9f7833",
    secondary: "#9f7833",
    accent: "#221804",
    background: "#221804",
    text: "#FFFFFF",
  };

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (err) {
        setError(err.message);
        console.error("Failed to load featured products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const ProductCard = ({ product }) => (
    <div
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
        <Link
          to={`/product/${product.handle}`}
          className="block w-full mt-3 py-1.5 px-3 rounded text-sm text-center transition-all duration-300 hover:brightness-110"
          style={{
            backgroundColor: colorTheme.primary,
            color: colorTheme.text,
          }}
        >
          Voir le produit
        </Link>
      </div>
    </div>
  );

  const HomePage = () => (
    <>
      <Carousel colorTheme={colorTheme} />
      <Categories colorTheme={colorTheme} />

      {/* Nos Marques */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h2 className="text-2xl font-bold mb-8" style={{ color: colorTheme.text }}>
          Nos Marques
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
          {[
            "Dynamic",
            "Eclipse",
            "inKoncious",
            "Panthera",
            "Dermalize Pro",
            "World Famous",
          ].map((brand) => (
            <Link
              key={brand}
              to={`/marques/${brand.toLowerCase().replace(/ /g, "-")}`}
              className="flex items-center justify-center p-8 h-32 rounded-lg bg-white 
                       hover:shadow-lg hover:shadow-white/20 transition-all duration-300 
                       hover:scale-105 cursor-pointer group"
            >
              <img
                src={`/images/brands/${brand.toLowerCase().replace(/ /g, "-")}.jpg`}
                alt={`Logo ${brand}`}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/marques"
            className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-semibold 
                     transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
            style={{
              backgroundColor: colorTheme.primary,
              color: colorTheme.text,
            }}
          >
            Voir toutes nos marques
          </Link>
        </div>
      </div>

      {/* Produits en vedette */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h2 className="text-2xl font-bold mb-6" style={{ color: colorTheme.text }}>
          Produits en vedette
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div
              className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
              style={{ borderColor: colorTheme.text }}
            ></div>
          </div>
        ) : error ? (
          <div className="text-center py-8" style={{ color: colorTheme.text }}>
            Une erreur est survenue lors du chargement des produits.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 justify-items-center">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} colorTheme={colorTheme} />
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <Router>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: colorTheme.background }}>
        {/* Logo Section */}
        <Link to="/" className="py-4 px-6" style={{ backgroundColor: colorTheme.background }}>
          <img
            src="/logo.svg"
            alt="Inkorner Logo"
            className="h-28 mx-auto transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Header Component */}
        <Header colorTheme={colorTheme} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:handle" element={<ProductPage colorTheme={colorTheme} />} />
          </Routes>
        </main>

        {/* Footer Component */}
        <Footer colorTheme={colorTheme} />
      </div>
    </Router>
  );
}

export default App;