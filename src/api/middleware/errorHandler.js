import httpStatus from 'http-status-codes';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let { payload } = err;

  // special case for 500 (internal server error)
  if (statusCode === httpStatus.INTERNAL_SERVER_ERROR) {
    payload = {
      code: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR),
      message: 'Oops! something went wrong!',
    };
    payload.detail = {
      error: err.message,
      stack: err.stack,
    };
  }

  // return http error code with json response
  res.status(statusCode);
  res.json(payload);
};

export default errorHandler;
