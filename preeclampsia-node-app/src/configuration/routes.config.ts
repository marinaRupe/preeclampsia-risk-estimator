import * as express from 'express';
import * as path from 'path';
import expressConfig from 'configuration/express.config';
import apiConstants from 'constants/api.constants';
import userRouter from 'routes/api/user.routes';
import patientRouter from 'routes/api/patient.routes';
import pregnancyRouter from 'routes/api/pregnancy.routes';
import medicalExaminationRoutes from 'routes/api/medicalExamination.routes';
import riskRouter from 'routes/api/risk.routes';
import statisticsRouter from 'routes/api/statistics.routes';
import { setLanguage } from 'middlewares/language.middleware';

const useProductionRoutes = app => {
  app.use('/images', express.static(path.join(__dirname, '..', '..', 'dist-react', 'images'), { maxAge: 31557600000 }));
  app.use('/libs', express.static(path.join(__dirname, '..', '..', 'dist-react', 'libs'), { maxAge: 31557600000 }));
  app.use('/static', express.static(path.join(__dirname, '..', '..', 'dist-react', 'static'), { maxAge: 31557600000 }));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', '..', 'dist-react', 'index.html')));
};

const useDevelopmentRoutes = app => {
  app.get('/:url?', (req, res) => (res.redirect(`http://localhost:3001/${req.params.url || ''}`)));
};

export const configure = app => {
  app.use(setLanguage);
  app.use(`${apiConstants.API_PATH}/users`, userRouter);
  app.use(`${apiConstants.API_PATH}/patients`, patientRouter);
  app.use(`${apiConstants.API_PATH}/pregnancies`, pregnancyRouter);
  app.use(`${apiConstants.API_PATH}/med-examinations`, medicalExaminationRoutes);
  app.use(`${apiConstants.API_PATH}/risks`, riskRouter);
  app.use(`${apiConstants.API_PATH}/statistics`, statisticsRouter);

  if (expressConfig.isProduction()) {
    useProductionRoutes(app);
  } else {
    useDevelopmentRoutes(app);
  }
};

export default {
  configure,
};