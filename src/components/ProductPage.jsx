// src/components/ProductPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByHandle } from '../utils/shopifyClient';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

const ProductPage = ({ colorTheme }) => {
  const { handle } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductByHandle(handle);
        setProduct(data);
        if (data.variants.edges.length > 0) {
          const defaultVariant = data.variants.edges.find(
            ({ node }) => node.availableForSale
          )?.node || data.variants.edges[0].node;
          setSelectedVariant(defaultVariant);
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const handleVariantChange = (optionName, value) => {
    const newSelectedOptions = selectedVariant.selectedOptions.map(option =>
      option.name === optionName ? { ...option, value } : option
    );

    const newVariant = product.variants.edges.find(({ node }) =>
      node.selectedOptions.every(option =>
        newSelectedOptions.find(newOption =>
          newOption.name === option.name && newOption.value === option.value
        )
      )
    )?.node;

    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div 
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" 
          style={{ borderColor: colorTheme.primary }}
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center" style={{ color: colorTheme.text }}>
          Une erreur est survenue : {error}
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image principale */}
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images.edges[0]?.node.url}
              alt={product.images.edges[0]?.node.altText || product.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Vendor (Brand) */}
          <p className="text-sm font-medium mb-2" style={{ color: colorTheme.text }}>
            {product.vendor}
          </p>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4" style={{ color: colorTheme.text }}>
            {product.title}
          </h1>
          
          {/* Price */}
          {selectedVariant && (
            <div className="mb-6">
              <p className="text-2xl font-bold" style={{ color: colorTheme.text }}>
                {parseFloat(selectedVariant.price.amount).toFixed(2)} {selectedVariant.price.currencyCode}
                {selectedVariant.compareAtPrice && (
                  <span className="ml-2 text-lg line-through opacity-70">
                    {parseFloat(selectedVariant.compareAtPrice.amount).toFixed(2)} {selectedVariant.compareAtPrice.currencyCode}
                  </span>
                )}
              </p>
              {!selectedVariant.availableForSale && (
                <p className="text-red-500 mt-2">Produit non disponible</p>
              )}
            </div>
          )}

          {/* Product Options */}
          {product.options.map(option => (
            option.values.length > 1 && (
              <div key={option.name} className="mb-6">
                <h3 className="text-sm font-medium mb-2" style={{ color: colorTheme.text }}>
                  {option.name}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {option.values.map(value => (
                    <button
                      key={value}
                      onClick={() => handleVariantChange(option.name, value)}
                      className="px-4 py-2 text-sm rounded-md transition-all duration-300 hover:scale-95"
                      style={{
                        backgroundColor: selectedVariant?.selectedOptions.some(o => o.name === option.name && o.value === value)
                          ? colorTheme.primary
                          : 'transparent',
                        border: `2px solid ${colorTheme.primary}`,
                        color: colorTheme.text
                      }}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            )
          ))}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2" style={{ color: colorTheme.text }}>
              Quantité
            </h3>
            <div className="inline-flex items-center">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="w-10 h-10 rounded-l-md transition-all duration-300 hover:opacity-80 flex items-center justify-center"
                style={{ 
                  backgroundColor: colorTheme.primary,
                  color: colorTheme.text,
                }}
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 h-10 text-center border-x-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                style={{ 
                  backgroundColor: colorTheme.primary,
                  color: colorTheme.text,
                  borderColor: colorTheme.primary,
                }}
              />
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="w-10 h-10 rounded-r-md transition-all duration-300 hover:opacity-80 flex items-center justify-center"
                style={{ 
                  backgroundColor: colorTheme.primary,
                  color: colorTheme.text,
                }}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="w-full py-3 px-6 rounded-md flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-95"
            disabled={!selectedVariant?.availableForSale}
            style={{ 
              backgroundColor: selectedVariant?.availableForSale ? colorTheme.primary : '#666',
              color: colorTheme.text,
              opacity: selectedVariant?.availableForSale ? 1 : 0.7
            }}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>
              {selectedVariant?.availableForSale ? 'Ajouter au panier' : 'Non disponible'}
            </span>
          </button>

          {/* Description */}
          <div className="prose max-w-none mt-8" style={{ color: colorTheme.text }}>
            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;