"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const admin = require('firebase-admin');
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const testnodejs_b1d90_firebase_adminsdk_13ij3_284885afef_json_1 = __importDefault(require("./testnodejs-b1d90-firebase-adminsdk-13ij3-284885afef.json"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(testnodejs_b1d90_firebase_adminsdk_13ij3_284885afef_json_1.default)
});
exports.firestore = firebase_admin_1.default.firestore();
//# sourceMappingURL=FirebaseUtil.js.map