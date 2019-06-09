import * as Errors from 'restify-errors';

const errorMiddleware = async (error, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }

  if (error && error.statusCode) {
    if (error.statusCode === (new Errors.BadRequestError()).statusCode) {
      res.status(error.statusCode).json({ ...error.body, errors: error.jse_info, success: false });
    } else {
      res.status(error.statusCode).json({ ...error.body, success: false });
    }
  } else if (error && !error.statusCode) {
    res.status(500).json({
      ...(new Errors.InternalServerError()).body,
      success: false
    });
  } else if (next) {
    next();
  }
};

export default errorMiddleware;
