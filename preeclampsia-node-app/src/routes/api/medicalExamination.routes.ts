import * as express from 'express';
import * as asyncWrap from 'express-async-wrap';
import MedicalExaminationController from 'controllers/medicalExamination.controller';
import { authenticate } from 'middlewares/authentication.middleware';

const router = express.Router();

router.put('/:medicalExaminationId/measurements',
	authenticate, asyncWrap(MedicalExaminationController.updateMeasurements)
);

router.get('/:medicalExaminationId',
	authenticate, asyncWrap(MedicalExaminationController.getMedicalExaminationDetails)
);

router.put('/:medicalExaminationId',
	authenticate, asyncWrap(MedicalExaminationController.updateMedicalExamination)
);

router.post('/',
	authenticate, asyncWrap(MedicalExaminationController.createMedicalExamination)
);

export default router;
