// src/components/BrandsListPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBrands } from '../utils/shopifyClient';

const BrandsListPage = ({ colorTheme }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      setError(null);
      try {
        const allBrands = await getAllBrands();
        setBrands(allBrands);
      } catch (error) {
        console.error('Error fetching brands:', error);
        setError("Erreur lors du chargement des marques.");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const BrandCard = ({ brand }) => {
    const brandSlug = brand.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <Link
        to={`/marques/${brandSlug}`}
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg 
                 transition-all duration-300 hover:scale-105 group"
      >
        <div className="aspect-[3/2] mb-4">
          <img
            src={`/images/brands/${brandSlug}.jpg`}
            alt={`Logo ${brand}`}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <h3 
          className="text-center font-medium text-lg"
          style={{ color: colorTheme.accent }}
        >
          {brand}
        </h3>
      </Link>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8" style={{ color: colorTheme.text }}>
        Nos Marques
      </h1>

      {error && (
        <div className="text-center py-8" style={{ color: colorTheme.text }}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
            style={{ borderColor: colorTheme.text }}
          ></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {brands.map((brand) => (
            <BrandCard key={brand} brand={brand} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandsListPage;