import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductGrid from './ProductGrid';

const FeaturedProducts = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (!products || products.length === 0) {
    return <div className="no-products">No products available</div>;
  }

  return (
    <div className="featured-products">
      <ProductGrid products={products} />
    </div>
  );
};

export default FeaturedProducts; 