const express = require('express');
const asyncWrap = require('express-async-wrap');
const PregnancyController = require('../../controllers/pregnancy.controller');

const router = express.Router();

router.get('/:medicalExaminationId', asyncWrap(PregnancyController.getMedicalExaminationDetails));

module.exports = router;
