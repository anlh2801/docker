const uuid= require("uuid")
const err = require('./ErorrUtil')

function getToken(){
    return Math.round(new Date().getTime() / (3*60*1000));
  }
function sendResOK (message, data) {
    //res.status(200).send(obj)
    return {
        status : 200,
        resDetails : {
            success: 'true',
            message: message,
            data : data
        }
        
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

function wrapRequest(op, needAuth) {
    return async (req, res) => {
        try{
            if(req.headers && !req.headers.user && needAuth){
                return res.status("401").send("Error")
            }
            console.log(`User logged in as ${req.headers.user}`)
            const result = await op(req)
            res.status(200).send(result);
        }
        catch(ex){

        }
    }
}

module.exports = {
     auth,
     getToken,
     sendResOK,
     wrapRequest
 };