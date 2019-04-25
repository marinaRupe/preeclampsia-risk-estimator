const constraints = require('../constants/constraints.constants');
const UserRoles = require('../constants/roles.constants');
const UserService = require('../services/user.service');

const isValidUser = async (user, editMode = false) => {
  const {
    email,
    firstName,
    lastName,
    role,
    password,
  } = user;

  const errors = {};

  if (!firstName) {
    errors.firstName = 'First name is required';
  }

  if (!lastName) {
    errors.lastName = 'Last name is required';
  }

  if (!role) {
    errors.role = 'Role is required';
  } else {
    const roleExists = Object.values(UserRoles).includes(role);
    if (!roleExists) {
      errors.role = 'Role does not exist';
    }
  }

  if (!editMode) {
    if (!email) {
      errors.email = 'Email is required';
    } else {
      if (!email.match(constraints.EMAIL_REGEX)) {
        errors.email = 'Email is invalid';
      } else if (await UserService.existsEmail(email)) {
        errors.email = 'User with this email already exists';
      }
    }

    if (!password) {
      errors.password = 'Password is required';
    } else {
      if (password.length < constraints.MIN_PASSWORD_LENGTH) {
        errors.password = `Minimum password length is ${constraints.MIN_PASSWORD_LENGTH} characters`;
      }
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
};
