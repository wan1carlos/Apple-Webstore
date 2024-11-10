import React, { useState } from 'react';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import './Admin.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-tabs">
          <button 
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button 
            className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
        </div>
      </div>

      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'products' && <ProductManagement />}
    </div>
  );
};

export default Dashboard; 