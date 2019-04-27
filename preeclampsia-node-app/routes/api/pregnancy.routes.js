const express = require('express');
const asyncWrap = require('express-async-wrap');
const PregnancyController = require('../../controllers/pregnancy.controller');

const router = express.Router();

router.get('/:pregnancyId/trimesters/:trimesterNumber', asyncWrap(PregnancyController.getPregnancyTrimesterDetails));

module.exports = router;
