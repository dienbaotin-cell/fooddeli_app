// server/config/firebase.js  (CommonJS)
const admin = require("firebase-admin");

// Tránh init lại nếu file được require nhiều lần
if (!admin.apps.length) {
  // Ưu tiên đọc từ environment variable (cho Vercel)
  let credential;
  
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Vercel: đọc từ env variable
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      credential = admin.credential.cert(serviceAccount);
    } catch (error) {
      console.error("❌ Error parsing FIREBASE_SERVICE_ACCOUNT:", error.message);
      throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT environment variable");
    }
  } else {
    // Local: đọc từ file
    try {
      const serviceAccount = require("./serviceAccountKey.json");
      credential = admin.credential.cert(serviceAccount);
    } catch (error) {
      console.error("❌ serviceAccountKey.json not found. Set FIREBASE_SERVICE_ACCOUNT env variable.");
      throw error;
    }
  }

  admin.initializeApp({
    credential: credential,
    storageBucket: "fooddeli-6d394.firebasestorage.app",
  });
}

// Lấy sẵn bucket & auth (có thể dùng trực tiếp)
const bucket = admin.storage().bucket();
const auth = admin.auth();

// Export theo tên để nơi khác lấy đúng đối tượng
module.exports = { admin, bucket, auth };
