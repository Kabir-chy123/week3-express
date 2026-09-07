import { validationResult } from 'express-validator';

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message;

  if (err.code === 'LIMIT_FILE_SIZE') {
    status = 400;
    message = 'File is too large. Maximum size is 10 MB';
  }

  res.status(status).json({
    error: {
      message,
      status,
    },
  });
};

const validationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((error) => `${error.path}: ${error.msg}`)
      .join(', ');

    const error = new Error(messages);
    error.status = 400;
    next(error);
    return;
  }

  next();
};

export { notFoundHandler, errorHandler, validationErrors };
