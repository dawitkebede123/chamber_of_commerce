const functions = require('firebase-functions'); 
const admin = require('firebase-admin'); 
 
admin.initializeApp(); 
const db = admin.database(); // This is for Realtime Database reference 
 
exports.preprocessData = functions.database 
  .ref('business/{documentId}') 
  .onWrite(async (change, context) => { 
    const newDocument = change.after.val(); 
    const documentId = context.params.documentId; 
 
    // Preprocess data (e.g., lowercase text fields, create search indexes) 
    const searchIndex = { 
      title_lowercase: newDocument.title.toLowerCase(), 
      // ... other searchable fields with preprocessing 
    }; 
 
    // Update the Realtime Database with the search index alongside the original data 
    await db.ref(`business/${documentId}`).update({ 
      ...newDocument, 
      searchIndex, 
    }); 
  });