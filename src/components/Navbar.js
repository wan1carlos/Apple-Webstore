import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { isAdmin } from '../utils/adminUtils';
import MiniCart from './MiniCart';
import './Navbar.css';

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { products } = useProducts();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  const handleMouseEnter = (category) => {
    setActiveDropdown(category);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderDropdownContent = (category) => {
    const categoryProducts = getProductsByCategory(category);

    return (
      <div className="dropdown-content">
        <div className="dropdown-section">
          <div className="dropdown-products">
            {categoryProducts.map(product => (
              <Link 
                key={product.id}
                to={`/product/${product.id}`}
                className="dropdown-item"
              >
                <span className="item-name">{product.name}</span>
                <span className="item-price">From ${product.price}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="dropdown-footer">
          <Link to={`/${category}`} className="view-all-link">
            View all {category === 'watch' ? 'Apple Watch' : category}
            <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        <Link to="/" className="logo">
          <svg className="apple-logo" viewBox="0 0 17 17" width="17" height="17">
            <path d="M15.5 13.4c-.3.7-.4 1-.8 1.6-.5.9-1.2 2-2.1 2-.8 0-1-.5-2-.5-.9 0-1.1.5-2 .5-.8 0-1.4-.9-2-1.9-.7-1.1-1.2-2.7-1.2-4.3 0-2.7 1.8-4.1 3.4-4.1.9 0 1.6.6 2.2.6.6 0 1.4-.6 2.4-.6 1.2 0 2.3.9 2.8 2.2-2.5 1.4-2.1 5.5.3 6.5zm-3.2-9.5c.7-.8.6-1.9.5-2.9-.9.1-1.9.6-2.5 1.4-.6.7-.7 1.8-.6 2.8.9 0 1.9-.5 2.6-1.3z"/>
          </svg>
        </Link>

        <div className="nav-links">
          <Link to="/store" className="nav-link">Store</Link>
          
          {['mac', 'iphone', 'ipad', 'watch', 'accessories'].map((category) => (
            <div 
              key={category}
              className="nav-item"
              onMouseEnter={() => handleMouseEnter(category)}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                to={`/${category}`} 
                className={`nav-link ${location.pathname === `/${category}` ? 'active' : ''}`}
              >
                {category === 'watch' ? 'Watch' : category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
              
              {activeDropdown === category && (
                <div className="nav-dropdown">
                  {renderDropdownContent(category)}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <div 
                className="profile-wrapper"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <button className="auth-nav-button">
                  Hi, {user.displayName?.split(' ')[0]}
                </button>
                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <Link to="/profile" className="profile-item">
                      Profile Settings
                    </Link>
                    {isAdmin(user) && (
                      <Link to="/admin" className="profile-item">
                        Admin Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout} className="profile-item">
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <div 
                className="cart-icon-wrapper"
                onMouseEnter={() => setIsMiniCartOpen(true)}
                onMouseLeave={() => setIsMiniCartOpen(false)}
              >
                <Link to="/cart" className="cart-button">
                  <span className="cart-icon">🛒</span>
                  {cart.length > 0 && (
                    <span className="cart-badge">{cart.length}</span>
                  )}
                </Link>
                {isMiniCartOpen && <MiniCart />}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-nav-button">
                Sign In
              </Link>
              <Link to="/signup" className="auth-nav-button primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;