import {firestore} from "./FirebaseUtil";

function addData(collectionName: any, data: any) {
    try {
      const docRef = firestore.collection(collectionName).doc(data.id + "_" + data.fullName);
      docRef.set(data);
      return true;
    } catch (ex) {
      console.log(ex);
      return false;
    }
}

function getAllData(collectionName) {
  return firestore.collection(collectionName).get().then((snapshot) => {
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

module.exports = {addData, getAllData};
