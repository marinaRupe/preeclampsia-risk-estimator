import * as Errors from 'restify-errors';
import * as passport from 'passport';
import * as asyncWrap from 'express-async-wrap';
import UserService from 'services/user.service';

export const authenticate = asyncWrap(async (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, next);
});

export const authorize = (allowedRoles = []) => asyncWrap(async (req, res, next) => {
  const userData = req.user;

  const user = await UserService.getById(userData.id);

  if (!allowedRoles.includes(user.role)) {
    throw new Errors.ForbiddenError();
  }

  next();
});

export default {
  authenticate,
  authorize
};
