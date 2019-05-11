const Errors = require('restify-errors');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const values = require('../constants/values.constants');
const UserService = require('../services/user.service');
const UserValidator = require('../validators/user.validator');
const UserLoginViewModel = require('../dataTransferObjects/viewModels/User/UserLogin.viewModel');
const UserViewModel = require('../dataTransferObjects/viewModels/User/User.viewModel');
const PageViewModel = require('../dataTransferObjects/viewModels/Paging/Page.viewModel');

const getAll = async (req, res) => {
  let { page, pageSize } = req.query;
  const { sortColumn, sortDirection } = req.query;

  page = page || values.DEFAULT_PAGE;
  pageSize = pageSize || values.DEFAULT_PAGE_SIZE;

  const userList = await UserService.getAll(page, pageSize, sortColumn, sortDirection);
  const users = userList.rows.map(user => new UserViewModel(user));
  res.json(new PageViewModel(users, userList.count, page, pageSize));
};

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


const updateUser = async (req, res) => {
  const { userId } = req.params;
  const userData = req.body;

  if (!userData) {
    throw new Errors.BadRequestError('User data is required');
  }

  if (!UserService.existsWithId(userId)) {
    throw new Errors.NotFoundError('User does not exist ');
  }

  const { isValid, errors } = await UserValidator.isValidUser(userData, true);

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const user = await UserService.updateUser(userId, userData);

  if (!user) {
    throw new Errors.InternalServerError('Could not update user');
  }

  res.json(new UserViewModel(user));
};

const updateUserPassword = async (req, res) => {
  const { userId } = req.params;
  const userData = req.body;

  if (!userData) {
    throw new Errors.BadRequestError('User data is required');
  }

  if (!UserService.existsWithId(userId)) {
    throw new Errors.NotFoundError('User does not exist ');
  }

  const { isValid, errors } = await UserValidator.isValidUserPassword(userData);

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const user = await UserService.updateUserPassword(userId, userData);

  if (!user) {
    throw new Errors.InternalServerError('Could not update user password');
  }

  res.json(new UserViewModel(user));
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!UserService.existsWithId(userId)) {
    throw new Errors.NotFoundError('Patient does not exist ');
  }

  const user = await UserService.removeUser(userId);

  if (!user) {
    throw new Errors.InternalServerError('Could not delete user');
  }

  res.status(200).send('User is successfully deleted');
};

module.exports = {
  getAll,
  login,
  register,
  createUser,
  updateUser,
  deleteUser,
};
