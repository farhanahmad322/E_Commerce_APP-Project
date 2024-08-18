import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create the Cart Context
const CartContext = createContext();

// Createinng a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, minimumOrderQuantity: item.minimumOrderQuantity + product.minimumOrderQuantity }
            : item
        );
      } else {
        return [...prevItems, product];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateCartItemQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, minimumOrderQuantity: newQuantity } : item
      )
    );
  };

  // Calculate the total number of unique items in  cart bcz it show only in nvbar menu
  const cartCount = cartItems.length;

  // Calculate the total quantity of items in the cart
  const totalQuantity = cartItems.reduce((count, item) => count + item.minimumOrderQuantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity, cartCount, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Prop validation 
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// this is the custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
