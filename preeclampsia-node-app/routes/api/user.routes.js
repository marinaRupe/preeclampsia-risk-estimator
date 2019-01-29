const express = require('express');
const asyncWrap = require('express-async-wrap');
const UserController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/login', asyncWrap(UserController.login));

module.exports = router;
