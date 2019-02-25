const repo = require("./UserRepo");
// const multer = require('multer');
// const fs = require('fs');
import fs from "fs";
import multer from "multer";

export async function getAllUser(req) {
    return await repo.getAllData("users");
}

export async function addUser(req) {
    return await repo.addData("users", req.body);
}

// Upload file
export function uploadFile(keyFile) {
    const storage = multer.memoryStorage({
        destination: (req, file, cb) => {
          cb(null, "./uploads");
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + "-" + file.originalname);
        }
    });

    multer({storage});
    const upload = multer({storage});
    return upload.single(keyFile);
}

export async function responeFileData(req, res) {
    const fileUpload = req.file;
    return fileUpload.buffer;
}

export function readFileData() {
    return new Promise( (resolve, reject) => {
        fs.readFile("./uploads/alo em.txt", (err, data) => {
            if (err) { reject(err); }
            resolve(data);

         });
    } );
}

export async function readFileDataSync() {
    return fs.readFileSync("./uploads/alo em.txt");
}

module.exports = {getAllUser, addUser, uploadFile, responeFileData, readFileData, readFileDataSync};
