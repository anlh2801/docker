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
const uuid_1 = __importDefault(require("uuid"));
const ErorrUtil_1 = require("./ErorrUtil");
const ErorrUtil_2 = require("./ErorrUtil");
const ErorrUtil_3 = require("./ErorrUtil");
function getToken() {
    return Math.round(new Date().getTime() / (3 * 60 * 1000));
}
exports.getToken = getToken;
function sendResOK(message, data) {
    return {
        status: 200,
        resDetails: {
            success: "true",
            message,
            data
        }
    };
}
exports.sendResOK = sendResOK;
function sendResOKAllType(message, data) {
    return {
        status: 200,
        message,
        resDetails: data
    };
}
exports.sendResOKAllType = sendResOKAllType;
function auth(req, res, next) {
    console.log("Client tocken: " + req.headers.tocken + " ===== " + "Server tocken: " + getToken());
    if (req.headers.tocken == getToken()) {
        console.log("Authenticate successfully");
        req.headers.user = "User";
    }
    else {
        req.headers.user = null;
    }
    next();
}
exports.auth = auth;
function wrapRequest(op, needAuth, messageRespone) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.headers && !req.headers.user && needAuth) {
                console.log("Unauthorized user");
                throw new ErorrUtil_1.Unauthorized("Unauthorized user from client");
            }
            console.log(`User logged in as ${req.headers.user}`);
            const result = yield op(req);
            console.log("Result: " + result);
            const resOk = sendResOKAllType(messageRespone, result);
            res.status(resOk.status).send(resOk.resDetails);
        }
        catch (ex) {
            let error = null;
            const uid = uuid_1.default();
            if (ex instanceof ErorrUtil_2.HttpError) {
                error = ex;
            }
            else {
                error = new ErorrUtil_3.InternalServerError(`Unexpected Exception, please look at the log id ${uid}`);
                console.log(`ErrorId: ${uid}, info: ${ex}`);
            }
            res.status(error.code).send({ message: error.message, stack: error.stack });
        }
    });
}
exports.wrapRequest = wrapRequest;
// module.exports = {
//      auth,
//      getToken,
//      sendResOK,
//      wrapRequest,
//  };
//# sourceMappingURL=Utils.js.map