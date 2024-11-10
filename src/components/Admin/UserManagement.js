import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/config';
import { collection, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { deleteUser, getAuth } from 'firebase/auth';
import { httpsCallable, getFunctions } from 'firebase/functions';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeactivateUser = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const newStatus = !userDoc.data().isActive;

      await updateDoc(userRef, {
        isActive: newStatus,
        updatedAt: new Date().toISOString()
      });

      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isActive: newStatus } : user
      ));

      alert(`User ${newStatus ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      console.error('Error updating user status:', error);
      setError('Failed to update user status');
      alert('Error updating user status. Please try again.');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        // Get Firebase Functions instance
        const functions = getFunctions();
        const deleteUserFunction = httpsCallable(functions, 'deleteUser');

        // Call the Cloud Function to delete the user
        await deleteUserFunction({ uid: userId });

        // Delete from Firestore
        await deleteDoc(doc(db, 'users', userId));

        // Delete user's cart
        try {
          await deleteDoc(doc(db, 'carts', userId));
        } catch (error) {
          console.error('Error deleting user cart:', error);
        }

        // Update local state
        setUsers(users.filter(user => user.id !== userId));
        alert('User deleted successfully!');
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user');
        alert('Error deleting user. Please try again.');
      }
    }
  };

  if (loading) return <div className="admin-loading">Loading users...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div className="admin-note">
        NOTE: Some of the functions on this page are still underwork.
      </div>
      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <h3>{user.firstName} {user.lastName}</h3>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
            </div>
            <div className="user-actions">
              <button 
                onClick={() => handleDeactivateUser(user.id)}
                className="action-button"
              >
                {user.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button 
                onClick={() => handleDeleteUser(user.id)}
                className="action-button delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement; 