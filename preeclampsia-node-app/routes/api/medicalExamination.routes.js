const express = require('express');
const asyncWrap = require('express-async-wrap');
const MedicalExaminationController = require('../../controllers/medicalExamination.controller');
const { authenticate } = require('../../middlewares/authentication.middleware');

const router = express.Router();

router.get('/:medicalExaminationId',
  authenticate, asyncWrap(MedicalExaminationController.getMedicalExaminationDetails)
);

router.put('/:medicalExaminationId/measurements',
  authenticate, asyncWrap(MedicalExaminationController.updateMeasurements)
);

module.exports = router;
