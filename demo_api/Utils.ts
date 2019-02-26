import uuid from "uuid";
import {Unauthorized} from "./ErorrUtil";
import {HttpError} from "./ErorrUtil";
import {InternalServerError} from "./ErorrUtil";

export function getToken() {
    return Math.round(new Date().getTime() / (3 * 60 * 1000));
  }

export function sendResOK(message, data) {
    return {
        status : 200,
        resDetails : {
            success: "true",
            message,
            data
        }

      };
}

export function sendResOKAllType(message, data) {
    return {
        status : 200,
        message,
        resDetails : data
      };
}

export function auth(req, res, next) {
    console.log("Client tocken: " + req.headers.tocken + " ===== " + "Server tocken: " + getToken());
    if (req.headers.tocken == getToken()) {
        console.log("Authenticate successfully");
        req.headers.user = "User";
    } else {
        req.headers.user = null;
    }

    next();
}

export function wrapRequest(op, needAuth, messageRespone) {
    return async (req, res) => {
        try {
            if (req.headers && !req.headers.user && needAuth) {
                console.log("Unauthorized user");
                throw new Unauthorized("Unauthorized user from client");
            }
            console.log(`User logged in as ${req.headers.user}`);
            const result = await op(req);
            console.log("Result: " + result);
            const resOk = sendResOKAllType(messageRespone, result);

            res.status(resOk.status).send(resOk.resDetails);
        } catch (ex) {
            let error = null;
            const uid = uuid();
            if (ex instanceof HttpError) {
            error = ex;
            } else {
            error = new InternalServerError(`Unexpected Exception, please look at the log id ${uid}`);
            console.log(`ErrorId: ${uid}, info: ${ex}`);
            }
            res.status(error.code).send({message: error.message, stack: error.stack});
        }
    };
}

// module.exports = {
//      auth,
//      getToken,
//      sendResOK,
//      wrapRequest,
//  };
