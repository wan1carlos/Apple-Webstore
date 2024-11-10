import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDtYRScB2ETbg7wpd7EtCK19RbC3SIGsIY",
  authDomain: "test-webstore-e5a7e.firebaseapp.com",
  projectId: "test-webstore-e5a7e",
  storageBucket: "test-webstore-e5a7e.appspot.com",
  messagingSenderId: "684233837413",
  appId: "1:684233837413:web:9ac827407802fa7704af8c",
  measurementId: "G-NKDJK58SPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Enable persistence
(async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch (error) {
    console.error("Error setting persistence:", error);
  }
})();

export { auth, db, analytics }; 