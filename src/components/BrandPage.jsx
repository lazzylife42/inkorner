import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { getProductsByBrand } from '../utils/shopifyClient';

const BrandPage = ({ colorTheme }) => {
  const { brand } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProducts = await getProductsByBrand(brand);
        
        let sortedProducts = [...fetchedProducts];
        switch(sortBy) {
          case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
          case 'name-asc':
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
          default:
            break;
        }
        
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error:', error);
        setError("Erreur lors du chargement des produits.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brand, sortBy]);

  // Formater le nom de la marque pour l'affichage
  const formatBrandName = (brandName) => {
    return brandName.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          <img
            src={`/images/brands/${brand}.jpg`}
            alt={`Logo ${formatBrandName(brand)}`}
            className="h-16 object-contain"
          />
          <h1 className="text-3xl font-bold" style={{ color: colorTheme.text }}>
            {formatBrandName(brand)}
          </h1>
        </div>

        <div className="relative">
          <select
            className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 focus:outline-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Populaire</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="name-asc">A-Z</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
            style={{ borderColor: colorTheme.text }}
          ></div>
        </div>
      ) : error ? (
        <div className="text-center py-8" style={{ color: colorTheme.text }}>
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 justify-items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-md overflow-hidden border border-white hover:border-gray-300 
                        transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20 
                        w-full max-w-[200px] mx-auto group"
            >
              <div className="relative w-full pb-[100%] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-3" style={{ backgroundColor: colorTheme.accent }}>
                <h3 className="text-white font-medium text-xs mb-2 line-clamp-2 h-8">
                  {product.title}
                </h3>
                <p className="text-white font-bold text-sm">
                  {new Intl.NumberFormat('fr-CH', {
                    style: 'currency',
                    currency: 'CHF'
                  }).format(product.price)}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandPage;