"use strict";
// const admin = require('firebase-admin');
// import admin from "firebase-admin";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import serviceAccount from './testnodejs-b1d90-firebase-adminsdk-13ij3-284885afef.json';
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
exports.firestore = firebase_admin_1.default.firestore();
//# sourceMappingURL=FirebaseUtil.js.map