export class HttpError extends Error {
  private code: number;
    constructor(message: string, code: number) {
      super(message);
      this.code = code;
    }
  }

export class Unauthorized extends HttpError {
    constructor(message) {
      super(message, 401);
    }
  }

export class InternalServerError extends HttpError {
    constructor(message) {
      super(message, 500);
    }
  }
