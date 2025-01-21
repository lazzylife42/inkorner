import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Minus, Check } from 'lucide-react';
import { getProductByHandle } from '../utils/shopifyClient';
import { useCart } from '../utils/CartContext';

const ProductPage = ({ colorTheme }) => {
  const { handle } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductByHandle(handle);
        setProduct(fetchedProduct);
        setSelectedVariant(fetchedProduct.variants.edges[0]?.node || null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Erreur lors du chargement du produit');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const productToAdd = {
      id: selectedVariant.id,
      title: product.title,
      price: parseFloat(selectedVariant.price.amount),
      image: product.images.edges[0]?.node.url,
      handle: product.handle,
      variant: selectedVariant.title,
    };

    addToCart(productToAdd, quantity);
    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: colorTheme.text }}
        ></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center" style={{ color: colorTheme.text }}>
        {error || "Produit non trouvé"}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-lg overflow-hidden">
              <div className="aspect-square w-full max-h-[400px]">
                <img
                  src={product.images.edges[selectedImage]?.node.url}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Galerie miniatures */}
            {product.images.edges.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
                {product.images.edges.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 w-16 h-16 bg-white rounded-md overflow-hidden 
                             border-2 transition-transform duration-300 hover:scale-105
                             ${selectedImage === index ? 'border-[#9f7833]' : 'border-transparent'}`}
                  >
                    <img
                      src={image.node.url}
                      alt={`${product.title} - vue ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations produit */}
          <div className="flex flex-col space-y-6">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: colorTheme.text }}>
                {product.title}
              </h1>

              <div className="text-xl md:text-2xl font-bold" style={{ color: colorTheme.text }}>
                {selectedVariant ? parseFloat(selectedVariant.price.amount).toFixed(2) : 'N/A'} CHF
              </div>

              <div style={{ color: colorTheme.text }} className="prose prose-sm md:prose-base max-w-none">
                <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
              </div>
            </div>

            {/* Sélection des variantes */}
            <div className="space-y-4">
              {product.options
                .filter((option) => option.name !== 'Default Title')
                .map((option) => (
                  <div key={option.name} className="flex flex-col space-y-2">
                    <span className="font-medium" style={{ color: colorTheme.text }}>
                      {option.name}
                    </span>
                    <div className="flex gap-2">
                      {option.values.map((value) => {
                        const isAvailable = product.variants.edges.some((v) =>
                          v.node.selectedOptions.some((o) => o.value === value)
                        );
                        return (
                          <button
                            key={value}
                            onClick={() => {
                              if (isAvailable) {
                                const variant = product.variants.edges.find((v) =>
                                  v.node.selectedOptions.some((o) => o.value === value)
                                )?.node;
                                setSelectedVariant(variant || selectedVariant);
                              }
                            }}
                            className={`py-2 px-4 rounded-md transition-all duration-300 ${
                              selectedVariant?.selectedOptions.some((o) => o.value === value)
                                ? 'bg-[#9f7833] text-white'
                                : isAvailable
                                ? 'bg-gray-200'
                                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                            }`}
                            disabled={!isAvailable}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>

            {/* Quantité et ajout au panier */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <div className="flex items-center justify-center sm:justify-start space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: colorTheme.primary }}
                >
                  <Minus size={20} color={colorTheme.text} />
                </button>
                <span 
                  className="w-12 text-center text-lg font-medium"
                  style={{ color: colorTheme.text }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: colorTheme.primary }}
                >
                  <Plus size={20} color={colorTheme.text} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-lg text-center font-medium relative
                          transition-all duration-300 ${addedToCart ? 'scale-105' : 'hover:scale-105'}`}
                style={{ 
                  backgroundColor: addedToCart ? '#22c55e' : colorTheme.primary,
                  color: colorTheme.text 
                }}
                disabled={addedToCart}
              >
                <span className={`transition-opacity duration-300 ${addedToCart ? 'opacity-0' : 'opacity-100'}`}>
                  Ajouter au panier
                </span>
                {addedToCart && (
                  <span className="absolute inset-0 flex items-center justify-center gap-2">
                    <Check className="w-6 h-6" />
                    Ajouté !
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
