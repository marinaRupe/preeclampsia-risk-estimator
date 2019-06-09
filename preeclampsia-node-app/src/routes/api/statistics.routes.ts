import * as express from 'express';
import * as asyncWrap from 'express-async-wrap';
import StatisticsController from 'controllers/statistics.controller';
import { authenticate } from 'middlewares/authentication.middleware';

const router = express.Router();

router.get('/characteristics/:characteristicId/medians',
  authenticate, asyncWrap(StatisticsController.getMediansForCharacteristic));

export default router;
