import * as express from 'express';
import * as asyncWrap from 'express-async-wrap';
import PatientController from 'controllers/patient.controller';
import PregnancyController from 'controllers/pregnancy.controller';
import { authenticate } from 'middlewares/authentication.middleware';

const router = express.Router();

router.get('/:patientId/pregnancies/:pregnancyNumber',
  authenticate, asyncWrap(PregnancyController.getPregnancyDetails)
);

router.get('/:patientId', authenticate, asyncWrap(PatientController.getById));

router.put('/:patientId', authenticate, asyncWrap(PatientController.updatePatient));

router.delete('/:patientId', authenticate, asyncWrap(PatientController.deletePatient));

router.get('/', authenticate, asyncWrap(PatientController.getAll));

router.post('/', authenticate, asyncWrap(PatientController.createPatient));

export default router;
