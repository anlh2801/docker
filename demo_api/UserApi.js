const express = require('express')
const tools = require("./Tools")
const service = require("./UserService")
const http = require('http');
const fs = require('fs');
var router = express.Router()

router.get('/node/all', tools.wrapRequest(service.getAllUser, false, "Get all data"));

router.post('/node/add', tools.wrapRequest(service.addUser, true, "Add successfully"));

router.post('/node/upload', service.uploadFile('data'), tools.wrapRequest(service.responeFileData, false, "Upload successfully"));

module.exports = router
