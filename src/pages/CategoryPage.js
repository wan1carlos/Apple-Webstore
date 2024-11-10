import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/ProductGrid';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category = '' } = useParams();
  const { products } = useProducts();

  // Filter products based on exact category match
  const categoryProducts = products.filter(product => {
    // Convert both to lowercase for case-insensitive comparison
    return product.category.toLowerCase() === category.toLowerCase();
  });

  const getCategoryTitle = () => {
    switch(category.toLowerCase()) {
      case 'mac':
        return 'Mac';
      case 'iphone':
        return 'iPhone';
      case 'ipad':
        return 'iPad';
      case 'watch':
        return 'Apple Watch';
      case 'accessories':
        return 'Accessories';
      default:
        return category;
    }
  };

  return (
    <div className="category-page">
      <div className="container">
        <h1 className="category-title">{getCategoryTitle()}</h1>
        <div className="category-grid">
          <ProductGrid products={categoryProducts} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage; 