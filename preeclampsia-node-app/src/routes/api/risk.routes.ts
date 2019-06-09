import * as express from 'express';
import * as asyncWrap from 'express-async-wrap';
import RiskController from 'controllers/risk.controller';
import { authenticate, authorize } from 'middlewares/authentication.middleware';
import UserRoles from 'constants/roles.constants';

const router = express.Router();

router.post('/med-examinations/:medicalExaminationId/generate-pdf',
  authenticate, authorize([UserRoles.Admin]), asyncWrap(RiskController.generatePdf));

export default router;
