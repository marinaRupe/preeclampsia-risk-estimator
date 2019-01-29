const express = require('express');
const asyncWrap = require('express-async-wrap');
const PatientController = require('../../controllers/patient.controller');

const router = express.Router();

router.get('/:patientId/pregnancies/:pregnancyNumber', asyncWrap(PatientController.getPregnancyDetails));

router.get('/:patientId', asyncWrap(PatientController.getById));

router.get('/', asyncWrap(PatientController.getAll));

module.exports = router;
