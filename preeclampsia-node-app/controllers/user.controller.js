const errors = require('restify-errors');
const UserService = require('../services/user.service');
const settings = require('../constants/constraints.constants');
const UserLoginViewModel = require('../dataTransferObjects/viewModels/userLogin.viewModel');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email.match(settings.EMAIL_REGEX)) {
    throw new errors.BadRequestError({
      info: {
        email: 'Email is invalid.',
      },
    });
  }

  res.json();
};

module.exports = {
  login,
};
