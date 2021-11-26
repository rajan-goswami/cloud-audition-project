class ApiError extends Error {
  constructor(statusCode, message, stack = '') {
    super(message);
    this.apiErrorMessage = message;
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
