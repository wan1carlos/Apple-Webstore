import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  // Find product by ID from Firestore products
  const product = products.find(p => p.id === id);
  
  const [selectedVariants, setSelectedVariants] = useState({
    color: null,
    size: null,
    storage: null,
    memory: null
  });

  // Update selected variants when product changes
  useEffect(() => {
    if (product) {
      setSelectedVariants({
        color: product.variants?.colors?.[0] || null,
        size: product.variants?.sizes?.[0] || null,
        storage: product.variants?.storage?.[0] || null,
        memory: product.variants?.memory?.[0] || null
      });
    }
  }, [product]);

  const calculateTotalPrice = () => {
    if (!product) return 0;
    
    let basePrice = product.price || 0;
    
    // Add storage price if selected
    if (selectedVariants.storage?.price) {
      basePrice += Number(selectedVariants.storage.price);
    }
    
    // Add memory price if selected
    if (selectedVariants.memory?.price) {
      basePrice += Number(selectedVariants.memory.price);
    }

    return basePrice;
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login', { 
        state: { 
          from: window.location.pathname,
          message: 'Please log in to add items to your cart'
        }
      });
      return;
    }

    // Create animation element
    const animationEl = document.createElement('div');
    animationEl.className = 'add-to-cart-animation';
    
    // Get the product image and cart icon positions
    const productImage = document.querySelector('.product-hero-image');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (productImage && cartIcon) {
      const start = productImage.getBoundingClientRect();
      const end = cartIcon.getBoundingClientRect();
      
      // Create a clone of the product image for animation
      const imageClone = document.createElement('img');
      imageClone.src = selectedVariants.color?.image || product.image;
      imageClone.className = 'floating-product-image';
      imageClone.style.top = `${start.top}px`;
      imageClone.style.left = `${start.left}px`;
      imageClone.style.width = `${start.width}px`;
      imageClone.style.height = `${start.height}px`;
      
      document.body.appendChild(imageClone);

      // Trigger animation
      requestAnimationFrame(() => {
        imageClone.style.top = `${end.top}px`;
        imageClone.style.left = `${end.left}px`;
        imageClone.style.width = '20px';
        imageClone.style.height = '20px';
        imageClone.style.opacity = '0';
      });

      // Clean up and add to cart
      setTimeout(() => {
        document.body.removeChild(imageClone);
        addToCart({
          ...product,
          variants: selectedVariants,
          finalPrice: calculateTotalPrice()
        });
      }, 800);
    } else {
      // Fallback if elements not found
      addToCart({
        ...product,
        variants: selectedVariants,
        finalPrice: calculateTotalPrice()
      });
    }
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="product-not-found">
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleVariantChange = (type, variant) => {
    setSelectedVariants(prev => ({
      ...prev,
      [type]: variant
    }));
  };

  return (
    <div className="product-details-page">
      <div className="product-hero">
        <img 
          src={selectedVariants.color?.image || product.image} 
          alt={product.name} 
          className="product-hero-image"
        />
      </div>
      
      <div className="product-info-section">
        <div className="container">
          <div className="product-info-grid">
            <div className="product-main-info">
              <h1>{product.name}</h1>
              <p className="product-tagline">{product.description}</p>
              <p className="product-price">From ${calculateTotalPrice()}</p>
            </div>

            <div className="product-options">
              {product.variants?.colors && (
                <div className="option-group">
                  <h2>Color</h2>
                  <div className="color-options">
                    {product.variants.colors.map(color => (
                      <button
                        key={color.name}
                        className={`color-option ${selectedVariants.color === color ? 'selected' : ''}`}
                        onClick={() => handleVariantChange('color', color)}
                      >
                        <span 
                          className="color-swatch" 
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="color-name">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.variants?.sizes && (
                <div className="option-group">
                  <h2>Size</h2>
                  <div className="size-options">
                    {product.variants.sizes.map(size => (
                      <button
                        key={size.name}
                        className={`option-button ${selectedVariants.size === size ? 'selected' : ''}`}
                        onClick={() => handleVariantChange('size', size)}
                      >
                        <span className="option-name">{size.name}</span>
                        <span className="option-price">
                          {size.price !== product.price && `$${size.price}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.variants?.storage && (
                <div className="option-group">
                  <h2>Storage</h2>
                  <div className="storage-options">
                    {product.variants.storage.map(storage => (
                      <button
                        key={storage.size}
                        className={`option-button ${selectedVariants.storage === storage ? 'selected' : ''}`}
                        onClick={() => handleVariantChange('storage', storage)}
                      >
                        <span className="option-name">{storage.size}</span>
                        <span className="option-price">
                          {storage.price > 0 && `+$${storage.price}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button 
                className="add-to-bag-button"
                onClick={handleAddToCart}
              >
                Add to Bag
              </button>
            </div>
          </div>

          <div className="product-features">
            <h2>Key Features</h2>
            <ul className="features-list">
              {product.specs?.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;