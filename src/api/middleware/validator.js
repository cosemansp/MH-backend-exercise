import inspector from 'schema-inspector';
import httpStatus from 'http-status-codes';

const validate = validationSchema => (req, res, next) => {
  const result = inspector.validate(validationSchema, req.body);
  if (!result.valid) {
    const errors = result.error;

    const errorArray = errors.map(item => {
      return {
        key: item.property.split('@.')[1],
        message: item.message,
      };
    });

    const error = new Error('Bad request');
    error.statusCode = 400;
    error.payload = {
      code: httpStatus.getStatusText(error.statusCode),
      message: 'This is an invalid request',
      details: errorArray,
    };
    throw error;
  }

  next();
};

export default validate;
