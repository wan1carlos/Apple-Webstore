import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { DEFAULT_ADMIN } from './adminUtils';

export const initializeAdmin = async () => {
  try {
    // Check if admin account exists in Firestore
    const adminDoc = await getDoc(doc(db, 'users', 'admin'));
    
    if (!adminDoc.exists()) {
      // Create admin account if it doesn't exist
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          DEFAULT_ADMIN.email,
          DEFAULT_ADMIN.password
        );

        // Store admin data in Firestore
        await setDoc(doc(db, 'users', 'admin'), {
          uid: userCredential.user.uid,
          email: DEFAULT_ADMIN.email,
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          createdAt: new Date().toISOString()
        });

        console.log('Admin account created successfully');
      } catch (error) {
        // If admin account already exists in Authentication but not in Firestore
        if (error.code === 'auth/email-already-in-use') {
          await setDoc(doc(db, 'users', 'admin'), {
            email: DEFAULT_ADMIN.email,
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin',
            createdAt: new Date().toISOString()
          });
        } else {
          console.error('Error creating admin account:', error);
        }
      }
    }
  } catch (error) {
    console.error('Error checking admin account:', error);
  }
}; 