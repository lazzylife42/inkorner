// src/components/BrandPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
        
        // Trier les produits selon le critère sélectionné
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
          // Le cas 'featured' utilise l'ordre par défaut
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.imageAlt || product.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {product.compareAtPrice && (
          <div 
            className="absolute top-2 right-2 px-2 py-1 rounded text-sm font-semibold"
            style={{ backgroundColor: colorTheme.primary, color: colorTheme.text }}
          >
            Promo
          </div>
        )}
      </div>
      <div className="p-4" style={{ backgroundColor: colorTheme.accent }}>
        <h3 className="text-white font-medium mb-2 line-clamp-2">{product.title}</h3>
        <div className="flex items-end gap-2 mb-3">
          <p className="text-white font-bold">{formatPrice(product.price)}</p>
          {product.compareAtPrice && (
            <p className="text-white text-sm line-through opacity-70">
              {formatPrice(product.compareAtPrice)}
            </p>
          )}
        </div>
        <Link
          to={`/product/${product.handle}`}
          className="block w-full py-2 text-center rounded transition-all duration-300 hover:brightness-110"
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

  // Formater le nom de la marque pour l'affichage
  const formatBrandName = (brandName) => {
    return brandName.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Brand Header */}
      <div className="mb-8">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={`/images/brands/${brand}.jpg`}
            alt={`Logo ${formatBrandName(brand)}`}
            className="h-16 object-contain"
          />
          <h1 className="text-3xl font-bold" style={{ color: colorTheme.text }}>
            {formatBrandName(brand)}
          </h1>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex gap-4">
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
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-8" style={{ color: colorTheme.text }}>
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
            style={{ borderColor: colorTheme.text }}
          ></div>
        </div>
      ) : (
        <>
          {/* Empty State */}
          {products.length === 0 && !error ? (
            <div className="text-center py-8" style={{ color: colorTheme.text }}>
              Aucun produit trouvé pour cette marque.
            </div>
          ) : (
            /* Products Grid */
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BrandPage;