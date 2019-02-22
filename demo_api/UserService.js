const repo = require('./UserRepo')
const multer = require('multer');
const fs = require('fs');

async function getAllUser(req){
    return await repo.getAllData('users');
}

async function addUser(req) {
    return await repo.addData('users', req.body);
}

// Upload file
function uploadFile(keyFile){
    let storage = multer.memoryStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads')
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + "-" + file.originalname)
        }
    });
    
    multer({storage: storage});
    let upload = multer({storage: storage});  
    return upload.single(keyFile);
}

async function responeFileData(req, res){
    let fileUpload = req.file;
    return fileUpload.buffer;
}

function readFileData(){
    return new Promise( (resolve, reject) => {
        fs.readFile('./uploads/alo em.txt', (err, data) => { 
            if (err) reject(err); 
            resolve(data);
    
         });
    } );
}

async function readFileDataSync(){
    return new fs.readFileSync('./uploads/alo em.txt');
}

module.exports = {getAllUser, addUser, uploadFile, responeFileData, readFileData, readFileDataSync}