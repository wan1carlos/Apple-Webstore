import React from 'react';
import { products } from '../data/products';
import ProductGrid from './ProductGrid';

const FeaturedProducts = () => {
  // Show all products instead of just the first 4
  const featuredProducts = products;

  return (
    <div className="featured-products">
      <ProductGrid products={featuredProducts} />
    </div>
  );
};

export default FeaturedProducts; 