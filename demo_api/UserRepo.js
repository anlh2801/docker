let firebase = require('./FirebaseUtil')
let firestore = firebase.firestore

function addData (collectionName, data){
    try {
      var docRef = firestore.collection(collectionName).doc(data.id + '_' + data.fullName);
      docRef.set(data);
      return true;
    }catch (ex){
      console.log(ex);
      return false;
    }    
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
