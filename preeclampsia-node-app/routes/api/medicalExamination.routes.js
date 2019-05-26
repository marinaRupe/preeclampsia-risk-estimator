const express = require('express');
const asyncWrap = require('express-async-wrap');
const PregnancyController = require('../../controllers/pregnancy.controller');
const { authenticate } = require('../../middlewares/authentication.middleware');

const router = express.Router();

router.get('/:medicalExaminationId', authenticate, asyncWrap(PregnancyController.getMedicalExaminationDetails));

module.exports = router;
