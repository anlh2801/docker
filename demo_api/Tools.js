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
module.exports = {
    getToken,
    sendResOK
};