const express = require('express');
const asyncWrap = require('express-async-wrap');
const UserRoles = require('../../constants/roles.constants');
const UserController = require('../../controllers/user.controller');
const { authenticate, authorize } = require('../../middlewares/authentication.middleware');

const router = express.Router();

router.post('/login', asyncWrap(UserController.login));

//router.post('/register', asyncWrap(UserController.register));

router.get('/', authenticate, authorize([UserRoles.Admin]), asyncWrap(UserController.getAll));

router.post('/', authenticate, authorize([UserRoles.Admin]), asyncWrap(UserController.createUser));

module.exports = router;
