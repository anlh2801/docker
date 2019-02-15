class HttpError extends Error {
    constructor(message) {
      super(message);
    }
  }

  class Unauthorized extends HttpError {
    constructor(message) {
      super(message);
      this.code = 401
    }
  }

  class InternalServerError extends HttpError {
    constructor(message) {
      super(message);
      this.code = 500
    }
  }

module.exports = {
  HttpError,
    Unauthorized,
    InternalServerError
};


