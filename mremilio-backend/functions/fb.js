const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const initializeFirebaseAdmin = () => {
  if (admin.apps.length > 0) {
    return;
  }

  const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket:
        process.env.FIREBASE_STORAGE_BUCKET ||
        `${serviceAccount.project_id}.appspot.com`,
    });

    console.log("Firebase Admin initialized with local service account");

    return;
  }

  admin.initializeApp();

  console.log(
    "Firebase Admin initialized with default Cloud Functions credentials"
  );
};

initializeFirebaseAdmin();

const db = admin.firestore();
const getAuth = admin.auth();
const bucket = admin.storage().bucket();

module.exports = {
  admin,
  db,
  getAuth,
  bucket,
};
// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: "mr-emilio---backend.appspot.com",
//   });
// }

// const getAuth = admin.auth();
// const db = admin.firestore();
// const bucket = admin.storage().bucket();

// module.exports = {
//   admin,
//   db,
//   getAuth,
//   bucket,
// };
