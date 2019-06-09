const express = require('express');
const asyncWrap = require('express-async-wrap');
const PatientController = require('../../controllers/patient.controller');
const PregnancyController = require('../../controllers/pregnancy.controller');
const { authenticate } = require('middlewares/authentication.middleware');

const router = express.Router();

router.get('/:patientId/pregnancies/:pregnancyNumber',
  authenticate, asyncWrap(PregnancyController.getPregnancyDetails)
);

router.get('/:patientId', authenticate, asyncWrap(PatientController.getById));

router.put('/:patientId', authenticate, asyncWrap(PatientController.updatePatient));

router.delete('/:patientId', authenticate, asyncWrap(PatientController.deletePatient));

router.get('/', authenticate, asyncWrap(PatientController.getAll));

router.post('/', authenticate, asyncWrap(PatientController.createPatient));

module.exports = router;
