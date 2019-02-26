import express from "express";
import {getAllUser} from "./UserService";
import {addUser} from "./UserService";
import {responeFileData} from "./UserService";
import {uploadFile} from "./UserService";
import {readFileData} from "./UserService";
import {readFileDataSync} from "./UserService";
import {wrapRequest} from "./Utils";

const router = express.Router();

router.get("/node/all", wrapRequest(getAllUser, false, "Get all data"));

router.post("/node/add", wrapRequest(addUser, true, "Add successfully"));

router.post("/node/upload", uploadFile("data"), wrapRequest(responeFileData, false, "Upload successfully"));

router.get("/node/read", wrapRequest(readFileData, false, "Read OKI"));

router.get("/node/read_sync", wrapRequest(readFileDataSync, false, "Read Sync OKI"));

module.exports = router;
