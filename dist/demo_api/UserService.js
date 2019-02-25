"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repo = require("./UserRepo");
// const multer = require('multer');
// const fs = require('fs');
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
function getAllUser(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield repo.getAllData("users");
    });
}
exports.getAllUser = getAllUser;
function addUser(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield repo.addData("users", req.body);
    });
}
exports.addUser = addUser;
// Upload file
function uploadFile(keyFile) {
    const storage = multer_1.default.memoryStorage({
        destination: (req, file, cb) => {
            cb(null, "./uploads");
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    });
    multer_1.default({ storage });
    const upload = multer_1.default({ storage });
    return upload.single(keyFile);
}
exports.uploadFile = uploadFile;
function responeFileData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileUpload = req.file;
        return fileUpload.buffer;
    });
}
exports.responeFileData = responeFileData;
function readFileData() {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile("./uploads/alo em.txt", (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}
exports.readFileData = readFileData;
function readFileDataSync() {
    return __awaiter(this, void 0, void 0, function* () {
        return fs_1.default.readFileSync("./uploads/alo em.txt");
    });
}
exports.readFileDataSync = readFileDataSync;
module.exports = { getAllUser, addUser, uploadFile, responeFileData, readFileData, readFileDataSync };
//# sourceMappingURL=UserService.js.map