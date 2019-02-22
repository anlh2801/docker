const express = require('express')
const tools = require("./Tools")
const service = require("./UserService")
const http = require('http');
const fs = require('fs');
var router = express.Router()

router.get('/node/all', tools.wrapRequest(service.getAllUser, false, "Get all data"));

router.post('/node/add', tools.wrapRequest(service.addUser, true, "Add successfully"));

router.post('/node/upload', service.uploadFile('data'), tools.wrapRequest(service.responeFileData, false, "Upload successfully"));

router.get('/node/read', tools.wrapRequest(service.readFileData, false, "Read OKI"));

router.get('/node/read_sync', tools.wrapRequest(service.readFileDataSync, false, "Read Sync OKI"));

module.exports = router
