import * as Errors from 'restify-errors';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import values from 'constants/values.constants';
import UserService from 'services/user.service';
import UserValidator from 'validators/user.validator';
import UserLoginViewModel from 'dataTransferObjects/viewModels/User/UserLogin.viewModel';
import UserViewModel from 'dataTransferObjects/viewModels/User/User.viewModel';
import PageViewModel from 'dataTransferObjects/viewModels/Paging/Page.viewModel';
import { isDefined } from 'utils/value.utils';

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
  const { translations } = res.locals;

  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        throw new Errors.InternalError(err.message || translations.response.defaultError);
      }

      if (!isDefined(user)) {
        throw new Errors.UnauthorizedError(info.message);
      }

      req.login(user, { session : false }, async (error) => {
        if (error) throw new Errors.InternalError(error.message || translations.response.defaultError);
        
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
  const { translations } = res.locals;

  passport.authenticate('signup', async (err, user) => {
    try {
      if (err || !user) {
        throw new Errors.InternalError(err && err.message || translations.response.defaultError);
      }

      req.login(user, { session : false }, async (error) => {
        if (error) throw new Errors.InternalError(error.message || translations.response.defaultError);
        
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
  const { translations } = res.locals;

  if (!isDefined(userData)) {
    throw new Errors.BadRequestError(translations.user.validation.dataRequired);
  }

  const { isValid, errors } = await UserValidator.isValidUser(userData, translations.user.validation);

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const user = await UserService.createUser(userData);

  if (!isDefined(user)) {
    throw new Errors.InternalServerError(translations.response.error.user.create);
  }

  res.json(new UserViewModel(user));
};


const updateUser = async (req, res) => {
  const userId = +req.params.userId;
  const userData = req.body;
  const { translations } = res.locals;

  if (!isDefined(userId)) {
    throw new Errors.BadRequestError();
  }

  if (!isDefined(userData)) {
    throw new Errors.BadRequestError(translations.user.validation.dataRequired);
  }

  if (!(await UserService.existsWithId(userId))) {
    throw new Errors.NotFoundError(translations.response.notFound.user);
  }

  const { isValid, errors } = (
    await UserValidator.isValidUser(userData, translations.user.validation, true)
  );

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const user = await UserService.updateUser(userId, userData);

  if (!isDefined(user)) {
    throw new Errors.InternalServerError(translations.response.error.user.update);
  }

  res.json(new UserViewModel(user));
};

const updateUserPassword = async (req, res) => {
  const userId = +req.params.userId;
  const userData = req.body;
  const { translations } = res.locals;

  if (!isDefined(userId)) {
    throw new Errors.BadRequestError();
  }

  if (!isDefined(userData)) {
    throw new Errors.BadRequestError(translations.user.validation.dataRequired);
  }

  if (!(await UserService.existsWithId(userId))) {
    throw new Errors.NotFoundError(translations.response.notFound.user);
  }

  const { isValid, errors } = await UserValidator.isValidUserPassword(userData, translations.user.validation);

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const user = await UserService.updateUserPassword(userId, userData);

  if (!isDefined(user)) {
    throw new Errors.InternalServerError(translations.response.error.user.updatePassword);
  }

  res.json(new UserViewModel(user));
};

const deleteUser = async (req, res) => {
  const userId = +req.params.userId;
  const { translations } = res.locals;

  if (!isDefined(userId)) {
    throw new Errors.BadRequestError();
  }

  if (!(await UserService.existsWithId(userId))) {
    throw new Errors.NotFoundError(translations.response.notFound.user);
  }

  const user = await UserService.removeUser(userId);

  if (!isDefined(user)) {
    throw new Errors.InternalServerError(translations.response.error.user.delete);
  }

  res.status(200).send(translations.response.success.user.delete);
};

export default {
  getAll,
  login,
  register,
  createUser,
  updateUser,
  deleteUser,
};
