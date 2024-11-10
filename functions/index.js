const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteUser = functions.https.onCall(async (data, context) => {
  // Check if request is made by an admin
  if (!context.auth.token.admin === true) {
    throw new functions.https.HttpsError('permission-denied', 'Must be an admin to delete users.');
  }

  const uid = data.uid;

  try {
    // Delete from Authentication
    await admin.auth().deleteUser(uid);
    
    // Delete from Firestore
    await admin.firestore().doc(`users/${uid}`).delete();
    
    // Delete user's cart
    await admin.firestore().doc(`carts/${uid}`).delete();

    // Delete any other user-related data
    const batch = admin.firestore().batch();
    
    // Delete user's orders if they exist
    const ordersRef = admin.firestore().collection('orders').where('userId', '==', uid);
    const orders = await ordersRef.get();
    orders.forEach(doc => batch.delete(doc.ref));

    // Execute batch delete
    await batch.commit();
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
}); 