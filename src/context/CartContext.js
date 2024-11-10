import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  // Load cart from Firestore when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const cartDoc = await getDoc(doc(db, 'carts', user.uid));
          if (cartDoc.exists()) {
            setCart(cartDoc.data().items || []);
          }
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      } else {
        // Clear cart when user logs out
        setCart([]);
      }
    };

    loadCart();
  }, [user]);

  // Save cart to Firestore whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      if (user) {
        try {
          await setDoc(doc(db, 'carts', user.uid), {
            items: cart,
            updatedAt: new Date().toISOString()
          });
        } catch (error) {
          console.error('Error saving cart:', error);
        }
      }
    };

    if (user && cart.length > 0) {
      saveCart();
    }
  }, [cart, user]);

  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already exists in cart with same variants
      const existingProduct = prevCart.find(item => 
        item.id === product.id && 
        JSON.stringify(item.variants) === JSON.stringify(product.variants)
      );

      if (existingProduct) {
        // Update quantity if product exists
        return prevCart.map(item =>
          item === existingProduct
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      // Add new product with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId, variants = {}) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => {
        // If variants are provided, check both id and variants
        if (Object.keys(variants).length > 0) {
          return !(item.id === productId && 
            JSON.stringify(item.variants) === JSON.stringify(variants));
        }
        // Otherwise, just check the id
        return item.id !== productId;
      });

      // If cart is empty after removal, save empty cart to Firestore
      if (newCart.length === 0 && user) {
        setDoc(doc(db, 'carts', user.uid), {
          items: [],
          updatedAt: new Date().toISOString()
        });
      }

      return newCart;
    });
  };

  const updateQuantity = (productId, variants, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && 
        JSON.stringify(item.variants) === JSON.stringify(variants)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    if (user) {
      setDoc(doc(db, 'carts', user.uid), {
        items: [],
        updatedAt: new Date().toISOString()
      });
    }
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};