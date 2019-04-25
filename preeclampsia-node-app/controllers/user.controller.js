const Errors = require('restify-errors');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const UserService = require('../services/user.service');
const UserValidator = require('../validators/user.validator');
const UserLoginViewModel = require('../dataTransferObjects/viewModels/User/UserLogin.viewModel');
const UserViewModel = require('../dataTransferObjects/viewModels/User/User.viewModel');

const login = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        throw new Errors.InternalError(err.message || 'An Error Occured');
      }

      if (!user) {
        throw new Errors.UnauthorizedError(info.message);
      }

      req.login(user, { session : false }, async (error) => {
        if (error) throw new Errors.InternalError(error.message || 'An Error Occured');
        
        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

        return res.json(new UserLoginViewModel(user, token));
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const register = async (req, res, next) => {
  passport.authenticate('signup', async (err, user) => {
    try {
      if (err || !user) {
        throw new Errors.InternalError(err && err.message || 'An Error Occured');
      }

      req.login(user, { session : false }, async (error) => {
        if (error) throw new Errors.InternalError(error.message || 'An Error Occured');
        
        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

        return res.json(new UserLoginViewModel(user, token));
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const createUser = async (req, res) => {
  const userData = req.body;

  if (!userData) {
    throw new Errors.BadRequestError('User data is required');
  }

  const { isValid, errors } = await UserValidator.isValidUser(userData);

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const user = await UserService.createUser(userData);

  if (!user) {
    throw new Errors.InternalServerError('Could not create new user');
  }

  res.json(new UserViewModel(user));
};

module.exports = {
  login,
  register,
  createUser,
};
