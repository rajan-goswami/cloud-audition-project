const httpStatus = require('http-status');
const { ValidationError } = require('express-json-validator-middleware');
const { logger } = require('../config/logger');
const ApiError = require('../utils/ApiError');

/**
 * Root level API exception handler
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  logger.error(err);

  let { statusCode } = err;
  let { message } = err;

  if (err instanceof ValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = err.validationErrors;
  } else if (!(err instanceof ApiError)) {
    const apiError = new ApiError(httpStatus.INTERNAL_SERVER_ERROR,
      err.message, err.stack);
    statusCode = apiError.statusCode;
    message = apiError.message;
  } else if (err instanceof ApiError) {
    message = err.apiErrorMessage;
  }

  const response = {
    code: statusCode,
    message,
  };
  res.status(statusCode).send(response);
};

module.exports = {
  errorHandler,
};
