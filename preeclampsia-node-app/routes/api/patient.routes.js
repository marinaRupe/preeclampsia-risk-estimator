const express = require('express');
const asyncWrap = require('express-async-wrap');
const PatientController = require('../../controllers/patient.controller');
const PregnancyController = require('../../controllers/pregnancy.controller');

const router = express.Router();

router.get('/:patientId/pregnancies/:pregnancyNumber', asyncWrap(PregnancyController.getPregnancyDetails));

router.get('/:patientId', asyncWrap(PatientController.getById));

router.get('/', asyncWrap(PatientController.getAll));

module.exports = router;
