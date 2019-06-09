const express = require('express');
const asyncWrap = require('express-async-wrap');
const RiskController = require('../../controllers/risk.controller');
const { authenticate, authorize } = require('middlewares/authentication.middleware');
const UserRoles = require('constants/roles.constants');

const router = express.Router();

router.post('/med-examinations/:medicalExaminationId/generate-pdf',
  authenticate, authorize([UserRoles.Admin]), asyncWrap(RiskController.generatePdf));

module.exports = router;
