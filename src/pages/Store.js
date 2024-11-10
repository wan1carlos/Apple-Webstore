import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import './Store.css';

const Store = () => {
  const { products, loading } = useProducts();

  // Helper function to get the best representative image for each category
  const getCategoryImage = (categoryId) => {
    const categoryProducts = products.filter(p => p.category === categoryId);
    if (categoryProducts.length === 0) return null;

    switch(categoryId) {
      case 'iphone':
        return categoryProducts.find(p => p.name.includes('Pro'))?.image || categoryProducts[0].image;
      case 'watch':
        return categoryProducts.find(p => p.name.includes('Ultra'))?.image || categoryProducts[0].image;
      case 'mac':
        return categoryProducts.find(p => p.name.includes('Pro'))?.image || categoryProducts[0].image;
      case 'ipad':
        return categoryProducts.find(p => p.name.includes('Pro'))?.image || categoryProducts[0].image;
      case 'accessories':
        return categoryProducts[0]?.image;
      default:
        return categoryProducts[0]?.image;
    }
  };

  const categories = [
    {
      id: 'mac',
      name: 'Mac',
      image: getCategoryImage('mac')
    },
    {
      id: 'iphone',
      name: 'iPhone',
      image: getCategoryImage('iphone')
    },
    {
      id: 'ipad',
      name: 'iPad',
      image: getCategoryImage('ipad')
    },
    {
      id: 'watch',
      name: 'Apple Watch',
      image: getCategoryImage('watch')
    },
    {
      id: 'accessories',
      name: 'Accessories',
      image: getCategoryImage('accessories')
    }
  ];

  if (loading) {
    return (
      <div className="store-page">
        <div className="container">
          <h1 className="store-title">Store</h1>
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="store-page">
      <div className="container">
        <h1 className="store-title">Store</h1>
        <div className="categories-grid">
          {categories.map(category => (
            <Link to={`/${category.id}`} key={category.id} className="category-card">
              <div className="category-image-container">
                {category.image ? (
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="category-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-40-iphone-15-pro-202309?wid=400&hei=500&fmt=jpeg&qlt=95&.v=1692910040844';
                    }}
                  />
                ) : (
                  <div className="placeholder-image">No Image Available</div>
                )}
              </div>
              <h2 className="category-name">{category.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store; 