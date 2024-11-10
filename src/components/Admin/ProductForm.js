import React, { useState, useEffect } from 'react';
import './Admin.css';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    specs: [''],
    variants: {
      colors: [],
      storage: [],
      memory: []
    }
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVariantChange = (type, index, field, value) => {
    setFormData(prev => {
      const variants = { ...prev.variants };
      if (!variants[type]) variants[type] = [];
      
      if (!variants[type][index]) {
        variants[type][index] = {};
      }
      
      variants[type][index][field] = value;
      return { ...prev, variants };
    });
  };

  const addVariant = (type) => {
    setFormData(prev => ({
      ...prev,
      variants: {
        ...prev.variants,
        [type]: [...(prev.variants[type] || []), {}]
      }
    }));
  };

  const removeVariant = (type, index) => {
    setFormData(prev => ({
      ...prev,
      variants: {
        ...prev.variants,
        [type]: prev.variants[type].filter((_, i) => i !== index)
      }
    }));
  };

  const renderCategorySpecificFields = () => {
    const category = formData.category.toLowerCase();
    
    if (['mac', 'iphone', 'ipad'].includes(category)) {
      return (
        <>
          {/* Colors */}
          <div className="form-group">
            <label>Colors</label>
            {formData.variants.colors.map((color, index) => (
              <div key={index} className="variant-input-group">
                <input
                  type="text"
                  value={color.name || ''}
                  onChange={(e) => handleVariantChange('colors', index, 'name', e.target.value)}
                  placeholder="Color name"
                />
                <input
                  type="text"
                  value={color.hex || ''}
                  onChange={(e) => handleVariantChange('colors', index, 'hex', e.target.value)}
                  placeholder="Color hex code"
                />
                <input
                  type="url"
                  value={color.image || ''}
                  onChange={(e) => handleVariantChange('colors', index, 'image', e.target.value)}
                  placeholder="Color variant image URL"
                />
                <button 
                  type="button" 
                  onClick={() => removeVariant('colors', index)}
                  className="remove-variant-button"
                >
                  ×
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={() => addVariant('colors')}
              className="add-variant-button"
            >
              Add Color
            </button>
          </div>

          {/* Storage */}
          <div className="form-group">
            <label>Storage Options</label>
            {formData.variants.storage.map((storage, index) => (
              <div key={index} className="variant-input-group">
                <input
                  type="text"
                  value={storage.size || ''}
                  onChange={(e) => handleVariantChange('storage', index, 'size', e.target.value)}
                  placeholder="Storage size (e.g., 256GB)"
                />
                <input
                  type="number"
                  value={storage.price || ''}
                  onChange={(e) => handleVariantChange('storage', index, 'price', e.target.value)}
                  placeholder="Additional price"
                />
                <button 
                  type="button" 
                  onClick={() => removeVariant('storage', index)}
                  className="remove-variant-button"
                >
                  ×
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={() => addVariant('storage')}
              className="add-variant-button"
            >
              Add Storage Option
            </button>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }} className="product-form">
      {/* Basic fields */}
      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          <option value="mac">Mac</option>
          <option value="iphone">iPhone</option>
          <option value="ipad">iPad</option>
          <option value="watch">Watch</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      {/* Category-specific fields */}
      {renderCategorySpecificFields()}

      {/* Rest of the form fields */}
      <div className="form-buttons">
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="save-button">
          {product ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm; 