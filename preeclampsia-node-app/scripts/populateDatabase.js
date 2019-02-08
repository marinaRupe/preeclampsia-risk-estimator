const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const models = require('../models');
const { Characteristics } = require('../constants/characteristics.constants');
const { ConceptionMethods } = require('../constants/pregnancy.constants');
const { ConceptionMethodEnum } = require('../enums/pregnancy.enums');
const { HypertensionTypes } = require('../constants/measurements.constants');
const { RacialOriginTypes } = require('../constants/patient.constants');

const expressConfig = require('../configuration/express.config');
const sequelizeConfig = require('../configuration/sequelize.config');

const app = express();
expressConfig.initialize(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

async function addCharacteristics() {
  await Promise.all(Object.values(Characteristics).map(async (value) => {
    await models.db.Characteristic.create({
      id: value.key,
      enName: value.en.name,
      hrName: value.hr.name,
      type: value.type,
      unitOfMeasure: value.unitOfMeasure || null,
    });
  }));
}

async function addTestPatients() {
  const patient1 = await models.db.Patient.create({
    firstName: 'Ana',
    lastName: 'Anić',
    birthDate: new Date('1990-01-01'),
    racialOrigin: RacialOriginTypes.White.hr,
    email: 'ana.anic@blabla.com',
    phoneNumber: '123/456-789',
    address: '-',
  });

  const patient2 = await models.db.Patient.create({
    firstName: 'Marija',
    lastName: 'Marijić',
    birthDate: new Date('1987-05-05'),
    racialOrigin: RacialOriginTypes.White.hr,
    email: 'marija.marijic@blabla.com',
    phoneNumber: '123/456-789',
    address: '-',
  });

  const patient3 = await models.db.Patient.create({
    firstName: 'Iva',
    lastName: 'Ivić',
    birthDate: new Date('1989-03-03'),
    racialOrigin: RacialOriginTypes.White.hr,
    email: 'iva.ivic@blabla.com',
    phoneNumber: '123/456-789',
    address: '-',
  });

  const pregnancy1 = await models.db.Pregnancy.create({
    pregnancyNumber: 1,
    patientId: patient1.id,
    lastPeriodDate: '2018-11-11',
    lastPeriodDateIsReliable: false,
    numberOfFetuses: 1,
    numberOfPreviousPregnancies: 0,
    numberOfPreviousBirths: 0,
    hadPEInPreviousPregnancy: false,
  });

  const pregnancy2 = await models.db.Pregnancy.create({
    pregnancyNumber: 1,
    patientId: patient2.id,
    lastPeriodDate: '2018-11-11',
    lastPeriodDateIsReliable: false,
    numberOfFetuses: 1,
    numberOfPreviousPregnancies: 1,
    numberOfPreviousBirths: 1,
    hadPEInPreviousPregnancy: false,
  });

  const pregnancy3 = await models.db.Pregnancy.create({
    pregnancyNumber: 1,
    patientId: patient3.id,
    lastPeriodDate: '2018-11-11',
    lastPeriodDateIsReliable: false,
    numberOfFetuses: 1,
    numberOfPreviousPregnancies: 0,
    numberOfPreviousBirths: 0,
    hadPEInPreviousPregnancy: true,
  });

  await addTestMeasures(pregnancy1);
  await addTestMeasures(pregnancy2);
  await addTestMeasures(pregnancy3);
}

async function addTestMeasures(pregnancy) {
  // Boolean measurements
  await models.db.BooleanMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: false,
    pregnancyId: pregnancy.id,
    characteristicId: Characteristics.SmokingDuringPregnancy.key,
  });

  await models.db.BooleanMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: false,
    pregnancyId: pregnancy.id,
    characteristicId: Characteristics.AntiPhospholipidSyndrome.key,
  });

  await models.db.BooleanMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: true,
    pregnancyId: pregnancy.id,
    characteristicId: Characteristics.Hypertension.key,
  });

  await models.db.BooleanMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: false,
    pregnancyId: pregnancy.id,
    characteristicId: Characteristics.SystemicLupusErythematosus.key,
  });

  await models.db.BooleanMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: false,
    pregnancyId: pregnancy.id,
    characteristicId: Characteristics.Diabetes.key,
  });

  // Numerical Measurements
  await models.db.NumericalMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: 165,
    pregnancyId: pregnancy.id,
    characteristicId: Characteristics.Height.key,
  });

  await models.db.NumericalMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: 55,
    pregnancyId: pregnancy.id,
    characteristicId: Characteristics.Weight.key,
  });

  await models.db.NumericalMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: 100.0,
    pregnancyId: pregnancy.id,
    characteristicId: Characteristics.MeanArterialPressure.key,
  });

  await models.db.NumericalMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: 80,
    pregnancyId: pregnancy.id,
    characteristicId: Characteristics.MeanUterineArteryPI.key,
  });

  await models.db.NumericalMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: 55,
    pregnancyId: pregnancy.id,
    characteristicId: Characteristics.FetalCrownRumpLength.key,
  });

  // Enum Measurements
  await models.db.EnumMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: null,
    hrName: null,
    pregnancyId: pregnancy.id,
    characteristicId: Characteristics.DiabetesType.key,
  });

  await models.db.EnumMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: HypertensionTypes.ChronicHipertension.key,
    hrName: HypertensionTypes.ChronicHipertension.hr,
    pregnancyId: pregnancy.id,
    characteristicId: Characteristics.HypertensionType.key,
  });

  await models.db.EnumMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: ConceptionMethodEnum.Spontaneous,
    hrName: ConceptionMethods.Spontaneous.hr,
    pregnancyId: pregnancy.id,
    characteristicId: Characteristics.ConceptionMethod.key,
  });
}

async function populateDb() {
  await addCharacteristics();
  await addTestPatients();
}

sequelizeConfig.configure().then(() => {
  sequelizeConfig.initializeDatabase(true).then(() => {
    populateDb().then(() => {
      process.exit(0);
    });
  });
});
