const uuid= require("uuid")
const err = require('./ErorrUtil')

function getToken(){
    return Math.round(new Date().getTime() / (3*60*1000));
  }
function sendResOK (message, data) {
    return {
        status : 200,
        resDetails : {
            success: 'true',
            message: message,
            data : data
        }
        
      }
}

function sendResOKAllType (message, data) {
    return {
        status : 200,
        message: message,
        resDetails : data        
      }
}

function auth(req, res, next){
    console.log("Client tocken: " + req.headers.tocken + " ===== " + "Server tocken: " + getToken())
    if (req.headers.tocken == getToken()){
        console.log("Authenticate successfully");
        req.headers.user = "User"
    }
    else {
        req.headers.user = null
    }
    
    next();
}

function wrapRequest(op, needAuth, messageRespone) {
    return async (req, res) => {
        try{
            if(req.headers && !req.headers.user && needAuth){
                console.log("Unauthorized user");
                throw new err.Unauthorized("Unauthorized user")
            }
            console.log(`User logged in as ${req.headers.user}`)
            const result = await op(req)            
            console.log("Result: " + result);
            const resOk = sendResOKAllType(messageRespone, result); 
                    
            res.status(resOk.status).send(resOk.resDetails);
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
    }
}

module.exports = {
     auth,
     getToken,
     sendResOK,
     wrapRequest,
 };