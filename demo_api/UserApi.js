const express = require('express')
const service = require('./UserService')
const err = require('./ErorrUtil')
const tools = require('./Tools')
const uuid= require("uuid")
var router = express.Router()

router.get('/node/all', async (req, res) => {
  try{
    let data = await service.getAllData('users');
    //console.log(data);
    let resOK = tools.sendResOK('Get data successfully', data);
    res.status(resOK.status).send(resOK.resDetails)
  }
  catch(ex){
    let error = null
    const uid = uuid()
    if(ex instanceof err.HttpError){
      error = ex
    }
    else{
      error = new err.InternalServerError(`Unexpected Exception, please look at the log id ${uid}`)
      console.log(`ErrorId: ${uid}, info: ${ex}`)
    }
    res.status(error.code).send({message: error.message, stack: error.stack})
  }
    
});
router.post('/node/add', (req, res) => {
  try{
    service.addData('users', req.body)
        let resOK = tools.sendResOK('Add successfully');
        res.status(resOK.status).send(resOK.resDetails)
  }
  catch(ex){
    let error = null
    const uid = uuid()
    if(ex instanceof err.HttpError){
      error = ex
    }
    else{
      error = new err.InternalServerError(`Unexpected Exception, please look at the log id ${uid}`)
      console.log(`ErrorId: ${uid}, info: ${ex}`)
    }
    res.status(error.code).send({message: error.message, stack: error.stack})
  }     
  });
module.exports = router
