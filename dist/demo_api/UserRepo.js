"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirebaseUtil_1 = require("./FirebaseUtil");
function addData(collectionName, data) {
    try {
        const docRef = FirebaseUtil_1.firestore.collection(collectionName).doc(data.id + "_" + data.fullName);
        docRef.set(data);
        return true;
    }
    catch (ex) {
        console.log(ex);
        return false;
    }
}
function getAllData(collectionName) {
    return FirebaseUtil_1.firestore.collection(collectionName).get().then((snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
            result.push(doc.data());
        });
        return result;
    })
        .catch((err) => {
        console.log("Error getting documents", err);
    });
}
module.exports = { addData, getAllData };
//# sourceMappingURL=UserRepo.js.map