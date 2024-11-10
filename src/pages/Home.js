import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import './Home.css';

const Home = () => {
  return (
    <main className="home">
      <Hero />
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Latest Products</h2>
          <FeaturedProducts />
        </div>
      </section>
    </main>
  );
};

export default Home; 