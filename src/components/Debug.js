import React from 'react';
import { products } from '../data/products';

const Debug = () => {
  const categories = [...new Set(products.map(p => p.category))];
  
  return (
    <div style={{ padding: 20, background: '#f0f0f0', margin: 20 }}>
      <h3>Debug Info</h3>
      <p>Total Products: {products.length}</p>
      <p>Categories: {categories.join(', ')}</p>
      <h4>Products by Category:</h4>
      {categories.map(cat => (
        <div key={cat}>
          <strong>{cat}:</strong> {products.filter(p => p.category === cat).length} products
        </div>
      ))}
    </div>
  );
};

export default Debug; 