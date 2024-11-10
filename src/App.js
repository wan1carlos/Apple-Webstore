import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetails from './pages/ProductDetails';
import CategoryPage from './pages/CategoryPage';
import Cart from './pages/Cart';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Profile from './pages/Profile';
import Dashboard from './components/Admin/Dashboard';
import { initializeAdmin } from './utils/initAdmin';
import { initializeProducts } from './utils/initProducts';
import { useAuth } from './context/AuthContext';
import { isAdmin } from './utils/adminUtils';
import { ProductProvider } from './context/ProductContext';

function App() {
  const { user } = useAuth();

  useEffect(() => {
    // Initialize admin account and products
    initializeAdmin();
    initializeProducts();
  }, []);

  return (
    <ProductProvider>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          {isAdmin(user) && <Route path="/admin" element={<Dashboard />} />}
          <Route path="/:category" element={<CategoryPage />} />
        </Routes>
      </div>
    </ProductProvider>
  );
}

export default App;
