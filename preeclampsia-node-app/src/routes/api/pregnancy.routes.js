const express = require('express');
const asyncWrap = require('express-async-wrap');
const PregnancyController = require('../../controllers/pregnancy.controller');
const { authenticate } = require('middlewares/authentication.middleware');

const router = express.Router();

router.get('/:pregnancyId/med-examinations',
  authenticate, asyncWrap(PregnancyController.getMedicalExaminationsForPregnancy)
);

router.put('/:pregnancyId', authenticate, asyncWrap(PregnancyController.updatePregnancy));

router.post('/', authenticate, asyncWrap(PregnancyController.createPregnancy));

module.exports = router;
