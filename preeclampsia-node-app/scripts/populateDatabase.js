const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const models = require('../models');
const { CharacteristicsEnum } = require('../enums/characteristics.enums');
const { PregnancyTypes, ConceptionMethods } = require('../constants/pregnancy.constants');
const {
  PregnancyTypeEnum, ConceptionMethodEnum,
} = require('../enums/pregnancy.enums');

const expressConfig = require('../configuration/express.config');
const sequelizeConfig = require('../configuration/sequelize.config');

const app = express();
expressConfig.initialize(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

async function addCharacteristics() {
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.PregnancyType,
    name: 'Vrsta trudnoće',
  });
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.ConceptionMethod,
    name: 'Vrsta začeća',
  });
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.Height,
    name: 'Visina majke',
  });
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.Weight,
    name: 'Težina majke',
  });
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.SmokingDuringPregnancy,
    name: 'Pušenje za vrijeme trudnoće',
  });
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.MotherOfPatientHadPE,
    name: 'Majka pacijentice imala PE',
  });
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.ChronicHypertension,
    name: 'Kronična hipertenzija',
  });
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.DiabetesType1,
    name: 'Dijabetes tipa I',
  });
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.DiabetesType2,
    name: 'Dijabetes tipa II',
  });
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.SystemicLupusErythematosus,
    name: 'Sistemski eritemski lupus',
  });
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.AntiPhospholipidSyndrome,
    name: 'Antifosfolipidni sindrom',
  });
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.MeanArterialPressure,
    name: 'Srednji arterijski tlak',
  });
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.MeanUterineArteryPI,
    name: 'Srednji PI maternične arterije',
  });
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.SerumPLGFMoM,
    name: 'Serum PLFG',
  });
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.SerumPAPPAMoM,
    name: 'Serum PAPP-A',
  });
  await models.db.Characteristic.create({
    id: CharacteristicsEnum.FetalCrownRumpLength,
    name: 'Duljina fetalne krune',
  });
}

async function addTestPatients() {
  const patient1 = await models.db.Patient.create({
    firstName: 'Ana',
    lastName: 'Anić',
    birthDate: new Date('1990-01-01'),
  });

  const patient2 = await models.db.Patient.create({
    firstName: 'Marija',
    lastName: 'Marijanović',
    birthDate: new Date('1987-05-05'),
  });

  const patient3 = await models.db.Patient.create({
    firstName: 'Iva',
    lastName: 'Ivić',
    birthDate: new Date('1989-03-03'),
  });

  const pregnancy1 = await models.db.Pregnancy.create({
    pregnancyNumber: 1,
    pregnancyType: PregnancyTypeEnum.Singleton,
    pregnancyTypeHrName: PregnancyTypes.Singleton.hr,
    patientId: patient1.id,
  });

  const pregnancy2 = await models.db.Pregnancy.create({
    pregnancyNumber: 1,
    pregnancyType: PregnancyTypeEnum.Singleton,
    pregnancyTypeHrName: PregnancyTypes.Singleton.hr,
    patientId: patient2.id,
  });

  const pregnancy3 = await models.db.Pregnancy.create({
    pregnancyNumber: 1,
    pregnancyType: PregnancyTypeEnum.Singleton,
    pregnancyTypeHrName: PregnancyTypes.Singleton.hr,
    patientId: patient3.id,
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
    characteristicId: CharacteristicsEnum.SmokingDuringPregnancy,
  });

  await models.db.BooleanMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: false,
    pregnancyId: pregnancy.id,
    characteristicId: CharacteristicsEnum.AntiPhospholipidSyndrome,
  });

  await models.db.BooleanMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: true,
    pregnancyId: pregnancy.id,
    characteristicId: CharacteristicsEnum.ChronicHypertension,
  });

  await models.db.BooleanMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: false,
    pregnancyId: pregnancy.id,
    characteristicId: CharacteristicsEnum.SystemicLupusErythematosus,
  });

  await models.db.BooleanMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: false,
    pregnancyId: pregnancy.id,
    characteristicId: CharacteristicsEnum.DiabetesType1,
  });

  await models.db.BooleanMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: true,
    pregnancyId: pregnancy.id,
    characteristicId: CharacteristicsEnum.DiabetesType2,
  });

  await models.db.BooleanMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: true,
    pregnancyId: pregnancy.id,
    characteristicId: CharacteristicsEnum.DiabetesType2,
  });

  // Numerical Measurements
  await models.db.NumericalMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: 165,
    pregnancyId: pregnancy.id,
    characteristicId: CharacteristicsEnum.Height,
  });

  await models.db.NumericalMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: 55,
    pregnancyId: pregnancy.id,
    characteristicId: CharacteristicsEnum.Weight,
  });

  await models.db.NumericalMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: 100.0,
    pregnancyId: pregnancy.id,
    characteristicId: CharacteristicsEnum.MeanArterialPressure,
  });

  await models.db.NumericalMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: 80,
    pregnancyId: pregnancy.id,
    characteristicId: CharacteristicsEnum.MeanUterineArteryPI,
  });

  await models.db.NumericalMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: 55,
    pregnancyId: pregnancy.id,
    characteristicId: CharacteristicsEnum.FetalCrownRumpLength,
  });

  // Enum Measurements
  await models.db.EnumMeasurement.create({
    dateMeasured: new Date('2018-12-12'),
    value: ConceptionMethodEnum.Spontaneous,
    hrName: ConceptionMethods.Spontaneous.hr,
    pregnancyId: pregnancy.id,
    characteristicId: CharacteristicsEnum.ConceptionMethod,
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

