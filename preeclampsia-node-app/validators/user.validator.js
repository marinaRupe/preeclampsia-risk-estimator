const settings = require('../constants/constraints.constants');

const isValidUserObject = user => {
  const {
    email,
    firstName,
    lastName,
  } = user;

  const errors = {};

  if (!firstName) {
    errors.firstName = 'First name is invalid.';
  }

  if (!lastName) {
    errors.lastName = 'Last name is invalid.';
  }

  if (!email.match(settings.EMAIL_REGEX)) {
    errors.email = 'Email is invalid.';
  }

  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    errors,
  };
};

module.exports = {
  isValidUserObject,
};
