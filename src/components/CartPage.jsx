// src/components/CartPage.jsx
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../utils/CartContext';

const CartPage = ({ colorTheme }) => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    clearCart 
  } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8" style={{ color: colorTheme.text }}>
          Panier
        </h1>
        <div className="text-center py-12">
          <p className="text-xl mb-6" style={{ color: colorTheme.text }}>
            Votre panier est vide
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: colorTheme.primary, color: colorTheme.text }}
          >
            Continuer les achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8" style={{ color: colorTheme.text }}>
        Panier
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div 
              key={item.id}
              className="flex gap-4 p-4 rounded-lg"
              style={{ backgroundColor: colorTheme.accent }}
            >
              <Link 
                to={`/product/${item.handle}`}
                className="w-24 h-24 flex-shrink-0 bg-white rounded overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </Link>

              <div className="flex-grow min-w-0">
                <Link 
                  to={`/product/${item.handle}`}
                  className="font-medium hover:opacity-80 transition-opacity line-clamp-2"
                  style={{ color: colorTheme.text }}
                >
                  {item.title}
                </Link>
                <p className="text-sm mt-1" style={{ color: colorTheme.text }}>
                  {formatPrice(item.price)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: colorTheme.primary }}
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} color={colorTheme.text} />
                  </button>
                  <span 
                    className="w-8 text-center" 
                    style={{ color: colorTheme.text }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: colorTheme.primary }}
                  >
                    <Plus size={16} color={colorTheme.text} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 rounded transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: colorTheme.primary }}
                >
                  <Trash2 size={20} color={colorTheme.text} />
                </button>
                <p 
                  className="font-bold" 
                  style={{ color: colorTheme.text }}
                >
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div 
          className="p-6 rounded-lg h-fit"
          style={{ backgroundColor: colorTheme.accent }}
        >
          <h2 
            className="text-xl font-bold mb-4" 
            style={{ color: colorTheme.text }}
          >
            Récapitulatif
          </h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span style={{ color: colorTheme.text }}>Sous-total</span>
              <span style={{ color: colorTheme.text }}>
                {formatPrice(getCartTotal())}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: colorTheme.text }}>Livraison</span>
              <span style={{ color: colorTheme.text }}>
                Calculé à l'étape suivante
              </span>
            </div>
          </div>
          <div className="flex justify-between font-bold mb-6">
            <span style={{ color: colorTheme.text }}>Total</span>
            <span style={{ color: colorTheme.text }}>
              {formatPrice(getCartTotal())}
            </span>
          </div>
          <button
            onClick={() => {/* TODO: Implémenter le checkout */}}
            className="w-full py-3 rounded-lg text-center transition-all duration-300 hover:scale-105 mb-3"
            style={{ backgroundColor: colorTheme.primary, color: colorTheme.text }}
          >
            Passer la commande
          </button>
          <button
            onClick={clearCart}
            className="w-full py-2 rounded-lg text-center text-sm transition-all duration-300 hover:opacity-80"
            style={{ color: colorTheme.text }}
          >
            Vider le panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;