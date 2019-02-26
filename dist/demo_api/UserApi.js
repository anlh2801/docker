"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserService_1 = require("./UserService");
const UserService_2 = require("./UserService");
const UserService_3 = require("./UserService");
const UserService_4 = require("./UserService");
const UserService_5 = require("./UserService");
const UserService_6 = require("./UserService");
const Utils_1 = require("./Utils");
const router = express_1.default.Router();
router.get("/node/all", Utils_1.wrapRequest(UserService_1.getAllUser, false, "Get all data"));
router.post("/node/add", Utils_1.wrapRequest(UserService_2.addUser, true, "Add successfully"));
router.post("/node/upload", UserService_4.uploadFile("data"), Utils_1.wrapRequest(UserService_3.responeFileData, false, "Upload successfully"));
router.get("/node/read", Utils_1.wrapRequest(UserService_5.readFileData, false, "Read OKI"));
router.get("/node/read_sync", Utils_1.wrapRequest(UserService_6.readFileDataSync, false, "Read Sync OKI"));
module.exports = router;
//# sourceMappingURL=UserApi.js.map