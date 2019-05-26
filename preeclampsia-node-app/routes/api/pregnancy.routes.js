const express = require('express');
const asyncWrap = require('express-async-wrap');
const PregnancyController = require('../../controllers/pregnancy.controller');

const router = express.Router();

router.get('/:pregnancyId/med-examinations', asyncWrap(PregnancyController.getMedicalExaminationsForPregnancy));

module.exports = router;
