const admin = require('firebase-admin');

var serviceAccount = require('./testnodejs-b1d90-firebase-adminsdk-13ij3-284885afef.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let firestore = admin.firestore();

module.exports = {firestore : firestore}