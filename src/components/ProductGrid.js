import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductModal from './ProductModal';
import './ProductGrid.css';

const ProductGrid = ({ products }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  console.log('ProductGrid received products:', products);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/login', { 
        state: { 
          from: window.location.pathname,
          message: 'Please log in to add items to your cart'
        }
      });
      return;
    }
    
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCartFromModal = (productWithVariants) => {
    if (!user) {
      navigate('/login', { 
        state: { 
          from: window.location.pathname,
          message: 'Please log in to add items to your cart'
        }
      });
      return;
    }

    const animationEl = document.createElement('div');
    animationEl.className = 'cart-animation';
    document.body.appendChild(animationEl);

    const productCard = document.querySelector(`[data-product-id="${productWithVariants.id}"]`);
    const cartIcon = document.querySelector('.cart-icon');
    
    if (productCard && cartIcon) {
      const start = productCard.getBoundingClientRect();
      const end = cartIcon.getBoundingClientRect();

      animationEl.style.top = `${start.top}px`;
      animationEl.style.left = `${start.left}px`;

      requestAnimationFrame(() => {
        animationEl.style.top = `${end.top}px`;
        animationEl.style.left = `${end.left}px`;
        animationEl.style.opacity = '0';
        animationEl.style.transform = 'scale(0.1)';
      });

      setTimeout(() => {
        document.body.removeChild(animationEl);
        addToCart(productWithVariants);
      }, 500);
    } else {
      addToCart(productWithVariants);
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="no-products-message">
        <p>No products available in this category.</p>
      </div>
    );
  }

  return (
    <>
      <div className="product-grid">
        {products.map((product) => (
          <Link 
            to={`/product/${product.id}`}
            key={product.id} 
            className="product-card"
            data-product-id={product.id}
          >
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-40-iphone-15-pro-202309?wid=400&hei=500&fmt=jpeg&qlt=95&.v=1692910040844';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">From ${product.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={(e) => handleAddToCart(e, product)}
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
      
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCartFromModal}
        />
      )}
    </>
  );
};

export default ProductGrid;