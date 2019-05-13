const express = require('express');
const asyncWrap = require('express-async-wrap');
const RiskController = require('../../controllers/risk.controller');

const router = express.Router();

router.post('/trimesters/:trimesterId/generate-pdf', asyncWrap(RiskController.generatePdf));

module.exports = router;
