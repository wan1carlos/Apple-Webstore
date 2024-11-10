import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './MiniCart.css';

const MiniCart = () => {
  const { cart, removeFromCart } = useCart();

  const calculateItemPrice = (item) => {
    let basePrice = item.price;
    
    // Add storage price if selected
    if (item.variants?.storage?.price) {
      basePrice += Number(item.variants.storage.price);
    }
    
    // Add memory price if selected
    if (item.variants?.memory?.price) {
      basePrice += Number(item.variants.memory.price);
    }

    return basePrice;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = calculateItemPrice(item);
      return total + (itemPrice * (item.quantity || 1));
    }, 0);
  };

  return (
    <div className="mini-cart">
      {cart.length === 0 ? (
        <div className="mini-cart-empty">
          <p>Your bag is empty.</p>
        </div>
      ) : (
        <>
          <div className="mini-cart-items">
            {cart.map((item) => (
              <div key={item.id} className="mini-cart-item">
                <img 
                  src={item.variants?.color?.image || item.image} 
                  alt={item.name} 
                  className="mini-cart-item-image" 
                />
                <div className="mini-cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="mini-cart-variants">
                    {item.variants?.color?.name && `Color: ${item.variants.color.name}`}
                    {item.variants?.storage?.size && `, ${item.variants.storage.size}`}
                    {item.variants?.memory?.size && `, ${item.variants.memory.size}`}
                  </p>
                  <p className="mini-cart-price">${calculateItemPrice(item)}</p>
                  <p className="mini-cart-quantity">Quantity: {item.quantity || 1}</p>
                </div>
                <button
                  className="remove-item-btn"
                  onClick={() => removeFromCart(item.id, item.variants)}
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="mini-cart-footer">
            <div className="mini-cart-total">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
            <Link to="/cart" className="review-bag-btn">
              Review Bag
            </Link>
            <button className="checkout-btn">Check Out</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MiniCart; 