// src/components/CartPage.jsx
import { useState, useEffect } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = ({ colorTheme }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement actual cart fetching logic
    const fetchCart = async () => {
      setLoading(false);
    };

    fetchCart();
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: colorTheme.text }}
        ></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8" style={{ color: colorTheme.text }}>
        Panier
      </h1>

      {cart.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div 
                key={item.id}
                className="flex gap-4 p-4 rounded-lg"
                style={{ backgroundColor: colorTheme.accent }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-grow">
                  <h3 className="font-medium mb-2" style={{ color: colorTheme.text }}>
                    {item.name}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: colorTheme.text }}>
                    {item.price.toFixed(2)} €
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded transition-all duration-300 hover:scale-110"
                      style={{ backgroundColor: colorTheme.primary }}
                    >
                      <Minus size={16} color={colorTheme.text} />
                    </button>
                    <span className="w-8 text-center" style={{ color: colorTheme.text }}>
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
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 rounded transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: colorTheme.primary }}
                >
                  <Trash2 size={20} color={colorTheme.text} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div 
            className="p-6 rounded-lg h-fit"
            style={{ backgroundColor: colorTheme.accent }}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: colorTheme.text }}>
              Récapitulatif
            </h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span style={{ color: colorTheme.text }}>Sous-total</span>
                <span style={{ color: colorTheme.text }}>{calculateTotal().toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colorTheme.text }}>Livraison</span>
                <span style={{ color: colorTheme.text }}>Calculé à l'étape suivante</span>
              </div>
            </div>
            <div className="flex justify-between font-bold mb-6">
              <span style={{ color: colorTheme.text }}>Total</span>
              <span style={{ color: colorTheme.text }}>{calculateTotal().toFixed(2)} €</span>
            </div>
            <button
              className="w-full py-3 rounded-lg text-center transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: colorTheme.primary, color: colorTheme.text }}
            >
              Passer la commande
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;