let firebase = require('./FirebaseUtil')
let firestore = firebase.firestore

function addData (collectionName, data){
    var docRef = firestore.collection(collectionName).doc(data.id + '_' + data.fullName);
    docRef.set(data);
    
}

function getAllData (collectionName){
  return firestore.collection(collectionName).get().then((snapshot) => {
    let result = [];
    snapshot.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
}

module.exports = {addData, getAllData}
