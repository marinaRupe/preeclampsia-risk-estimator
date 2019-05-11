const constraints = require('../constants/constraints.constants');
const UserRoles = require('../constants/roles.constants');
const UserService = require('../services/user.service');
const { addToArray } = require('../utils/array.utils');

const isValidUser = async (user, editMode = false) => {
  const {
    email,
    firstName,
    lastName,
    role,
    password,
    repeatedPassword,
  } = user;

  const errors = {};

  if (!firstName) {
    errors.firstName = addToArray(errors.firstName, 'First name is required');
  }

  if (!lastName) {
    errors.lastName = addToArray(errors.lastName, 'Last name is required');
  }

  if (!role) {
    errors.role = addToArray(errors.role, 'Role is required');
  } else {
    const roleExists = Object.values(UserRoles).includes(role);
    if (!roleExists) {
      errors.role = addToArray(errors.role, 'Role does not exist');
    }
  }

  if (!editMode) {
    if (!email) {
      errors.email = addToArray(errors.email, 'Email is required');
    } else {
      if (!email.match(constraints.EMAIL_REGEX)) {
        errors.email = addToArray(errors.email, 'Email is invalid');
      } else if (await UserService.existsEmail(email)) {
        errors.email = addToArray(errors.email, 'User with this email already exists');
      }
    }

    if (!password) {
      errors.password = addToArray(errors.password, 'Password is required');
    } else {
      if (password.length < constraints.MIN_PASSWORD_LENGTH) {
        errors.password = addToArray(errors.password,
          `Minimum password length is ${constraints.MIN_PASSWORD_LENGTH} characters`);
      }
    }

    if (!repeatedPassword) {
      errors.repeatedPassword = addToArray(errors.repeatedPassword, 'Repeated password is required');
    } else {
      if (repeatedPassword !== password) {
        errors.repeatedPassword = addToArray(errors.repeatedPassword, 'Passwords do not match');
      }
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    errors,
  };
};

const isValidUserPassword = async (userData) => {
  const {
    password,
    repeatedPassword,
  } = userData;

  const errors = {};

  if (!password) {
    errors.password = addToArray(errors.password, 'Password is required');
  } else {
    if (password.length < constraints.MIN_PASSWORD_LENGTH) {
      errors.password = addToArray(errors.password,
        `Minimum password length is ${constraints.MIN_PASSWORD_LENGTH} characters`);
    }
  }

  if (!repeatedPassword) {
    errors.repeatedPassword = addToArray(errors.repeatedPassword, 'Repeated password is required');
  } else {
    if (repeatedPassword !== password) {
      errors.repeatedPassword = addToArray(errors.repeatedPassword, 'Passwords do not match');
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    errors,
  };
};

module.exports = {
  isValidUser,
  isValidUserPassword,
};
