const Errors = require('restify-errors');
const passport = require('passport');
const asyncWrap = require('express-async-wrap');
const UserService = require('../services/user.service');

const authenticate = asyncWrap(async (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, next);
});

const authorize = (allowedRoles = []) => asyncWrap(async (req, res, next) => {
  const userData = req.user;

  const user = await UserService.findById(userData.id);

  if (!allowedRoles.includes(user.role)) {
    throw new Errors.ForbiddenError();
  }

  next();
});

module.exports = {
  authenticate,
  authorize
};
