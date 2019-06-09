const express = require('express');
const asyncWrap = require('express-async-wrap');
const StatisticsController = require('../../controllers/statistics.controller');
const { authenticate } = require('middlewares/authentication.middleware');

const router = express.Router();

router.get('/characteristics/:characteristicId/medians',
  authenticate, asyncWrap(StatisticsController.getMediansForCharacteristic));

module.exports = router;
