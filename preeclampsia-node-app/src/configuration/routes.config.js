const express = require('express');
const path = require('path');
const expressConfig = require('configuration/express.config');
const apiConstants = require('constants/api.constants');
const userRouter = require('routes/api/user.routes');
const patientRouter = require('routes/api/patient.routes');
const pregnancyRouter = require('routes/api/pregnancy.routes');
const medicalExaminationRoutes = require('routes/api/medicalExamination.routes');
const riskRouter = require('routes/api/risk.routes');
const statisticsRouter = require('routes/api/statistics.routes');
const { setLanguage } = require('middlewares/language.middleware');

const useProductionRoutes = app => {
  app.use('/images', express.static(path.join(__dirname, '..', '..', 'dist-react', 'images'), { maxAge: 31557600000 }));
  app.use('/libs', express.static(path.join(__dirname, '..', '..', 'dist-react', 'libs'), { maxAge: 31557600000 }));
  app.use('/static', express.static(path.join(__dirname, '..', '..', 'dist-react', 'static'), { maxAge: 31557600000 }));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', '..', 'dist-react', 'index.html')));
};

const useDevelopmentRoutes = app => {
  app.get('/:url?', (req, res) => (res.redirect(`http://localhost:3001/${req.params.url || ''}`)));
};

const configure = app => {
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

module.exports = {
  configure,
};