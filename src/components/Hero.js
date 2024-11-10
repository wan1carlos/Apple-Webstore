import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import './Hero.css';

const Hero = () => {
  const { products } = useProducts();
  
  // Find the iPhone 15 Pro product from the database
  const iphone15Pro = products.find(p => 
    p.name.toLowerCase().includes('iphone 15 pro') || 
    p.name.toLowerCase().includes('iphone15pro')
  );

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">iPhone 15 Pro</h1>
        <p className="hero-subtitle">Titanium. So strong. So light. So Pro.</p>
        <div className="hero-cta">
          <p className="hero-price">From $999</p>
          <div className="hero-buttons">
            {iphone15Pro ? (
              <>
                <Link to={`/product/${iphone15Pro.id}`} className="hero-button primary">
                  Buy
                </Link>
                <Link to={`/product/${iphone15Pro.id}`} className="hero-button secondary">
                  Learn more <span className="arrow">→</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/iphone" className="hero-button primary">
                  Buy
                </Link>
                <Link to="/iphone" className="hero-button secondary">
                  Learn more <span className="arrow">→</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="hero-image-wrapper">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://www.apple.com/v/iphone-15-pro/a/images/overview/hero/hero_iphone_15_pro__i70z9oz3hj2i_large.jpg"
        >
          <source 
            src="https://www.apple.com/105/media/us/iphone-15-pro/2023/2f337511-a940-4b57-b89c-1512b7507777/anim/hero/large.mp4" 
            type="video/mp4" 
          />
        </video>
      </div>
    </section>
  );
};

export default Hero; 