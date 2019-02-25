// const admin = require('firebase-admin');
import admin from "firebase-admin";

import serviceAccount from "./testnodejs-b1d90-firebase-adminsdk-13ij3-284885afef.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export let firestore: admin.firestore.Firestore = admin.firestore();
