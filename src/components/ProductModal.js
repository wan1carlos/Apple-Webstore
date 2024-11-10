import React, { useState } from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const initialVariants = {
    color: product.variants?.colors?.[0] || null,
    size: product.variants?.sizes?.[0] || null,
    storage: product.variants?.storage?.[0] || null,
    memory: product.variants?.memory?.[0] || null
  };

  const [selectedVariants, setSelectedVariants] = useState(initialVariants);

  const calculateTotalPrice = () => {
    let basePrice = selectedVariants.size?.price || product.price;
    if (selectedVariants.storage?.price) basePrice += selectedVariants.storage.price;
    if (selectedVariants.memory?.price) basePrice += selectedVariants.memory.price;
    return basePrice;
  };

  const handleVariantChange = (type, variant) => {
    setSelectedVariants(prev => ({
      ...prev,
      [type]: variant
    }));
  };

  const handleSubmit = () => {
    onAddToCart({ 
      ...product, 
      variants: selectedVariants, 
      finalPrice: calculateTotalPrice() 
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-product-info">
          <img 
            src={selectedVariants.color?.image || product.image} 
            alt={product.name} 
            className="modal-product-image"
          />
          <div className="modal-product-details">
            <h2>{product.name}</h2>
            <p className="modal-price">${calculateTotalPrice()}</p>
          </div>
        </div>

        <div className="modal-options">
          {product.variants?.colors && product.variants.colors.length > 0 && (
            <div className="option-section">
              <h3>Color</h3>
              <div className="color-options">
                {product.variants.colors.map(color => (
                  <button
                    key={color.name}
                    className={`color-option ${selectedVariants.color === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleVariantChange('color', color)}
                  >
                    <span className="color-name">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.variants?.sizes && product.variants.sizes.length > 0 && (
            <div className="option-section">
              <h3>Size</h3>
              <div className="size-options">
                {product.variants.sizes.map(size => (
                  <button
                    key={size.name}
                    className={`size-option ${selectedVariants.size === size ? 'selected' : ''}`}
                    onClick={() => handleVariantChange('size', size)}
                  >
                    {size.name}
                    {size.price !== product.price && ` (+$${size.price - product.price})`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.variants?.storage && product.variants.storage.length > 0 && (
            <div className="option-section">
              <h3>Storage</h3>
              <div className="storage-options">
                {product.variants.storage.map(storage => (
                  <button
                    key={storage.size}
                    className={`storage-option ${selectedVariants.storage === storage ? 'selected' : ''}`}
                    onClick={() => handleVariantChange('storage', storage)}
                  >
                    {storage.size}
                    {storage.price > 0 && ` (+$${storage.price})`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button className="modal-add-to-cart" onClick={handleSubmit}>
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductModal; 