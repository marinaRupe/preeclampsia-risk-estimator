import * as express from 'express';
import * as asyncWrap from 'express-async-wrap';
import PregnancyController from 'controllers/pregnancy.controller';
import { authenticate } from 'middlewares/authentication.middleware';

const router = express.Router();

router.get('/:pregnancyId/med-examinations',
	authenticate, asyncWrap(PregnancyController.getMedicalExaminationsForPregnancy)
);

router.put('/:pregnancyId', authenticate, asyncWrap(PregnancyController.updatePregnancy));

router.post('/', authenticate, asyncWrap(PregnancyController.createPregnancy));

export default router;
