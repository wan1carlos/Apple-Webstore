import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { useProducts } from '../../context/ProductContext';
import './Admin.css';

const ProductManagement = () => {
  const { products, fetchProducts } = useProducts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
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
    fetchProducts();
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a clean product object
      const productData = {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        category: formData.category,
        image: formData.image,
        specs: formData.specs.filter(spec => spec && spec.trim()),
        variants: {
          colors: Array.isArray(formData.variants.colors) ? formData.variants.colors : [],
          storage: Array.isArray(formData.variants.storage) ? formData.variants.storage : [],
          memory: Array.isArray(formData.variants.memory) ? formData.variants.memory : []
        }
      };

      if (editingProduct) {
        // Update existing product
        const productRef = doc(db, 'products', editingProduct.id);
        await setDoc(productRef, {
          ...productData,
          updatedAt: new Date().toISOString()
        });
      } else {
        // Add new product
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: new Date().toISOString()
        });
      }

      // Refresh products list
      await fetchProducts();

      // Reset form
      setFormData({
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

      setShowProductForm(false);
      setEditingProduct(null);
      alert(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleAddSpec = () => {
    setFormData(prev => ({
      ...prev,
      specs: [...prev.specs, '']
    }));
  };

  const handleSpecChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      specs: prev.specs.map((spec, i) => i === index ? value : spec)
    }));
  };

  const handleRemoveSpec = (index) => {
    setFormData(prev => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index)
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

  const renderVariantInputs = () => {
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
                  onChange={(e) => handleVariantChange('storage', index, 'price', Number(e.target.value))}
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

          {/* Memory */}
          <div className="form-group">
            <label>Memory Options</label>
            {formData.variants.memory.map((memory, index) => (
              <div key={index} className="variant-input-group">
                <input
                  type="text"
                  value={memory.size || ''}
                  onChange={(e) => handleVariantChange('memory', index, 'size', e.target.value)}
                  placeholder="Memory size (e.g., 8GB)"
                />
                <input
                  type="number"
                  value={memory.price || ''}
                  onChange={(e) => handleVariantChange('memory', index, 'price', Number(e.target.value))}
                  placeholder="Additional price"
                />
                <button 
                  type="button" 
                  onClick={() => removeVariant('memory', index)}
                  className="remove-variant-button"
                >
                  ×
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={() => addVariant('memory')}
              className="add-variant-button"
            >
              Add Memory Option
            </button>
          </div>
        </>
      );
    }
    return null;
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        await fetchProducts(); // Refresh products list
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('Failed to delete product');
        alert('Error deleting product. Please try again.');
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      specs: product.specs || [''],
      variants: product.variants || {
        colors: [],
        storage: [],
        memory: []
      }
    });
    setShowProductForm(true);
  };

  if (loading) return <div className="admin-loading">Loading products...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div className="product-management">
      <div className="product-management-header">
        <h2>Product Management</h2>
        <button 
          className="add-product-button"
          onClick={() => {
            setEditingProduct(null);
            setFormData({
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
            setShowProductForm(true);
          }}
        >
          Add New Product
        </button>
      </div>

      {showProductForm && (
        <div className="product-form-overlay">
          <div className="product-form-container">
            <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit} className="product-form">
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
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Base Price"
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

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Product Description"
                  required
                />
              </div>

              <div className="form-group">
                <label>Main Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Main Product Image URL"
                  required
                />
                {formData.image && (
                  <img 
                    src={formData.image} 
                    alt="Product preview" 
                    className="image-preview"
                  />
                )}
              </div>

              <div className="form-group">
                <label>Specifications</label>
                {formData.specs.map((spec, index) => (
                  <div key={index} className="spec-input">
                    <input
                      type="text"
                      value={spec}
                      onChange={(e) => handleSpecChange(index, e.target.value)}
                      placeholder={`Specification ${index + 1}`}
                    />
                    {index > 0 && (
                      <button 
                        type="button" 
                        onClick={() => handleRemoveSpec(index)}
                        className="remove-spec-button"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={handleAddSpec} 
                  className="add-spec-button"
                >
                  Add Specification
                </button>
              </div>

              {/* Variants */}
              {renderVariantInputs()}

              <div className="form-buttons">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowProductForm(false);
                    setEditingProduct(null);
                  }}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>{product.category}</p>
            </div>
            <div className="product-actions">
              <button 
                onClick={() => handleEditProduct(product)}
                className="action-button"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDeleteProduct(product.id)}
                className="action-button delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;