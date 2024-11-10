import { db } from '../firebase/config';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { products } from '../data/products';

export const initializeProducts = async () => {
  try {
    // Check if products collection exists and has items
    const productsSnapshot = await getDocs(collection(db, 'products'));
    
    if (productsSnapshot.empty) {
      console.log('Initializing products in Firebase...');
      
      // Add each product to Firestore
      for (const product of products) {
        await setDoc(doc(db, 'products', product.id.toString()), {
          ...product,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      
      console.log('Products initialized successfully');
    } else {
      console.log('Products collection already exists');
    }
  } catch (error) {
    console.error('Error initializing products:', error);
  }
}; 