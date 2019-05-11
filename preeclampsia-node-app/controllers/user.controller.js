const Errors = require('restify-errors');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const values = require('../constants/values.constants');
const { translations } = require('../constants/translations.constants');
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
  const language = req.headers['accept-language'] || values.DEFAULT_LANGUAGE;

  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        throw new Errors.InternalError(err.message || translations[language].response.defaultError);
      }

      if (!user) {
        throw new Errors.UnauthorizedError(info.message);
      }

      req.login(user, { session : false }, async (error) => {
        if (error) throw new Errors.InternalError(error.message || translations[language].response.defaultError);
        
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
  const language = req.headers['accept-language'] || values.DEFAULT_LANGUAGE;

  passport.authenticate('signup', async (err, user) => {
    try {
      if (err || !user) {
        throw new Errors.InternalError(err && err.message || translations[language].response.defaultError);
      }

      req.login(user, { session : false }, async (error) => {
        if (error) throw new Errors.InternalError(error.message || translations[language].response.defaultError);
        
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
  const language = req.headers['accept-language'] || values.DEFAULT_LANGUAGE;

  if (!userData) {
    throw new Errors.BadRequestError(translations[language].user.validation.dataRequired);
  }

  const { isValid, errors } = await UserValidator.isValidUser(userData, translations[language].user.validation);

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const user = await UserService.createUser(userData);

  if (!user) {
    throw new Errors.InternalServerError(translations[language].response.error.user.create);
  }

  res.json(new UserViewModel(user));
};


const updateUser = async (req, res) => {
  const { userId } = req.params;
  const userData = req.body;
  const language = req.headers['accept-language'] || values.DEFAULT_LANGUAGE;

  if (!userData) {
    throw new Errors.BadRequestError(translations[language].user.validation.dataRequired);
  }

  if (!UserService.existsWithId(userId)) {
    throw new Errors.NotFoundError(translations[language].response.notFound.user);
  }

  const { isValid, errors } = (
    await UserValidator.isValidUser(userData, translations[language].user.validation, true)
  );

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const user = await UserService.updateUser(userId, userData);

  if (!user) {
    throw new Errors.InternalServerError(translations[language].response.error.user.update);
  }

  res.json(new UserViewModel(user));
};

const updateUserPassword = async (req, res) => {
  const { userId } = req.params;
  const userData = req.body;
  const language = req.headers['accept-language'] || values.DEFAULT_LANGUAGE;

  if (!userData) {
    throw new Errors.BadRequestError(translations[language].user.validation.dataRequired);
  }

  if (!UserService.existsWithId(userId)) {
    throw new Errors.NotFoundError(translations[language].response.notFound.user);
  }

  const { isValid, errors } = await UserValidator.isValidUserPassword(userData, translations[language].user.validation);

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const user = await UserService.updateUserPassword(userId, userData);

  if (!user) {
    throw new Errors.InternalServerError(translations[language].response.error.user.updatePassword);
  }

  res.json(new UserViewModel(user));
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const language = req.headers['accept-language'] || values.DEFAULT_LANGUAGE;

  if (!UserService.existsWithId(userId)) {
    throw new Errors.NotFoundError(translations[language].response.notFound.user);
  }

  const user = await UserService.removeUser(userId);

  if (!user) {
    throw new Errors.InternalServerError(translations[language].response.error.user.delete);
  }

  res.status(200).send(translations[language].response.success.user.delete);
};

module.exports = {
  getAll,
  login,
  register,
  createUser,
  updateUser,
  deleteUser,
};
