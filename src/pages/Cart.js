import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.finalPrice || item.price), 0);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page empty">
        <div className="container">
          <h1>Your bag is empty.</h1>
          <p>Find products you want to add to your bag.</p>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Review your bag.</h1>
        <p className="cart-subtitle">Free delivery and free returns.</p>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.variants?.color?.image || item.image} 
                  alt={item.name} 
                  className="cart-item-image" 
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-variants">
                    {item.variants?.color?.name && `Color: ${item.variants.color.name}`}
                    {item.variants?.size?.name && `, Size: ${item.variants.size.name}`}
                    {item.variants?.storage?.size && `, Storage: ${item.variants.storage.size}`}
                  </p>
                  <p className="cart-item-price">${item.finalPrice || item.price}</p>
                  <button 
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
            <button className="checkout-button">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 