"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.HttpError = HttpError;
class Unauthorized extends HttpError {
    constructor(message) {
        super(message, 401);
    }
}
exports.Unauthorized = Unauthorized;
class InternalServerError extends HttpError {
    constructor(message) {
        super(message, 500);
    }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=ErorrUtil.js.map