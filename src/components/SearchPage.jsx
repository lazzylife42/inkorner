import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchProducts } from '../utils/shopifyClient';

const SearchPage = ({ colorTheme }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      try {
        const results = await searchProducts(query);
        setProducts(results);
      } catch (err) {
        console.error('Error searching products:', err);
        setError('Une erreur est survenue lors de la recherche.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-2xl font-bold mb-6" style={{ color: colorTheme.text }}>
        {products.length > 0 
          ? `Résultats pour "${query}" (${products.length})`
          : `Aucun résultat pour "${query}"`}
      </h2>

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

      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p 
            className="mb-4"
            style={{ color: colorTheme.text }}
          >
            Essayez avec d'autres mots-clés ou consultez nos catégories.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: colorTheme.primary, color: colorTheme.text }}
          >
            Retour à l'accueil
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchPage;