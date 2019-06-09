const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs'); 
const csv = require('csv-parser');
const moment = require('moment');
const models = require('models');
const UserRoles = require('constants/roles.constants');
const { Characteristics } = require('constants/characteristics.constants');
const { PregnancyTypes, ConceptionMethods } = require('constants/pregnancy.constants');
const { ConceptionMethodEnum } = require('enums/pregnancy.enums');
const { DiabetesTypes, HypertensionTypes } = require('constants/measurements.constants');
const { RacialOriginTypes } = require('constants/patient.constants');
const {
  calculateGestationalAgeFromDate,
  calculateGestationalAgeFromLastPeriodDate
} = require('utils/dateTime.utils');

const expressConfig = require('configuration/express.config');
const sequelizeConfig = require('configuration/sequelize.config');

const app = express();
expressConfig.initialize(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

function formatDate(date) {
  const CSV_DATE_FORMAT = 'YYYY-MM-DD';
  const DB_DATE_FORMAT = 'YYYY-MM-DD';

  return moment(date, CSV_DATE_FORMAT).format(DB_DATE_FORMAT);
}

async function addTestUser() {
  await models.db.User.create({
    firstName: 'Test',
    lastName: 'Test',
    role: UserRoles.Admin,
    email: 'test@test.hr',
    hashedPassword: 'test',
  });
}

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

async function addPregnancyMeasures(medicalExamination, row) {
  // Boolean measurements
  if (row.smokingDuringPregnancy) {
    await models.db.BooleanMeasurement.create({
      value: row.smokingDuringPregnancy, // 0 - false, 1 - true
      medicalExaminationId: medicalExamination.id,
      characteristicId: Characteristics.SmokingDuringPregnancy.key,
    });
  }

  if (row.antiPhospholipidSyndrome) {
    await models.db.BooleanMeasurement.create({
      value: row.antiPhospholipidSyndrome, // 0 - false, 1 - true
      medicalExaminationId: medicalExamination.id,
      characteristicId: Characteristics.AntiPhospholipidSyndrome.key,
    });
  }

  if (row.systemicLupusErythematosus)  {
    await models.db.BooleanMeasurement.create({
      value: row.systemicLupusErythematosus, // 0 - false, 1 - true
      medicalExaminationId: medicalExamination.id,
      characteristicId: Characteristics.SystemicLupusErythematosus.key,
    });
  }

  // Numerical Measurements
  if (row.height) {
    await models.db.NumericalMeasurement.create({
      value: parseFloat(row.height),
      medicalExaminationId: medicalExamination.id,
      characteristicId: Characteristics.Height.key,
    });
  }

  if (row.weight) {
    await models.db.NumericalMeasurement.create({
      value: parseFloat(row.weight),
      medicalExaminationId: medicalExamination.id,
      characteristicId: Characteristics.Weight.key,
    });
  }

  if (row.meanArterialPressure) {
    await models.db.NumericalMeasurement.create({
      value: parseFloat(row.meanArterialPressure),
      medicalExaminationId: medicalExamination.id,
      characteristicId: Characteristics.MeanArterialPressure.key,
    });
  }

  if (row.meanUterineArteryPI) {
    await models.db.NumericalMeasurement.create({
      value: parseFloat(row.meanUterineArteryPI),
      medicalExaminationId: medicalExamination.id,
      characteristicId: Characteristics.MeanUterineArteryPI.key,
    });
  }

  if (row.CRL) {
    await models.db.NumericalMeasurement.create({
      value: parseFloat(row.CRL),
      medicalExaminationId: medicalExamination.id,
      characteristicId: Characteristics.FetalCrownRumpLength.key,
    });
  }

  if (row.PLGF) {
    await models.db.NumericalMeasurement.create({
      value: parseFloat(row.PLGF),
      medicalExaminationId: medicalExamination.id,
      characteristicId: Characteristics.SerumPLGF.key,
    });
  }

  if (row.PAPP_A) {
    await models.db.NumericalMeasurement.create({
      value: parseFloat(row.PAPP_A),
      medicalExaminationId: medicalExamination.id,
      characteristicId: Characteristics.SerumPAPPA.key,
    });
  }

  // Enum Measurements
  if (row.diabetesType) {
    const diabetesType = parseInt(row.diabetesType);
    await models.db.EnumMeasurement.create({
      value: diabetesType,
      medicalExaminationId: medicalExamination.id,
      characteristicId: Characteristics.DiabetesType.key,
    });
  }

  if (row.hypertensionType) {
    const hypertensionType = parseInt(row.hypertensionType);
    await models.db.EnumMeasurement.create({
      value: hypertensionType,
      medicalExaminationId: medicalExamination.id,
      characteristicId: Characteristics.HypertensionType.key,
    });
  }

  await models.db.EnumMeasurement.create({
    value: ConceptionMethodEnum.Spontaneous,
    medicalExaminationId: medicalExamination.id,
    characteristicId: Characteristics.ConceptionMethod.key,
  });
}

async function addPatient(row, index) {
  const patient = await models.db.Patient.create({
    firstName: `Ana${index}`,
    lastName: `Anić${index}`,
    birthDate: formatDate(row.birthDate),
    racialOrigin: RacialOriginTypes.White.key,
    MBO: index,
  });

  const pregnancy = await models.db.Pregnancy.create({
    pregnancyNumber: new Number(row.numberOfPreviousPregnancies) + 1,
    patientId: patient.id,
    lastPeriodDate: row.lastPeriodDate ? formatDate(row.lastPeriodDate) : null,
    lastPeriodDateIsReliable: false, // TODO: get from CSV
    deliveryDate: row.deliveryDate ? formatDate(row.deliveryDate) : null,
    birthLength: row.birthLength ? parseFloat(row.birthLength) : null,
    birthWeight: row.birthWeight ? parseFloat(row.birthWeight) : null,
    pregnancyType: PregnancyTypes.Singleton.key, // TODO: get from CSV
    numberOfPreviousPregnancies: row.numberOfPreviousPregnancies,
    numberOfPreviousBirths: row.numberOfPreviousBirths,
    hadPEInPreviousPregnancy: null, // TODO: get from CSV
    resultedWithPE: row.resultedWithPE // 0 - false, 1 - true
  });

  let gestationalAgeOnBloodTest = null;
  if (row.ultrasoundDate && row.gestationalAgeByUltrasoundWeeks && row.gestationalAgeByUltrasoundDays) {
    gestationalAgeOnBloodTest = calculateGestationalAgeFromDate(
      row.ultrasoundDate,
      row.bloodTestDate,
      parseInt(row.gestationalAgeByUltrasoundWeeks),
      parseInt(row.gestationalAgeByUltrasoundDays)
    );
  } else if (row.lastPeriodDate) {
    gestationalAgeOnBloodTest = calculateGestationalAgeFromLastPeriodDate(row.bloodTestDate, row.lastPeriodDate);
  }

  const medicalExamination = await models.db.MedicalExamination.create({
    pregnancyId: pregnancy.id,
    trimesterNumber: 1,
    protocol: row.protocol,
    gestationalAgeByUltrasoundWeeks: row.gestationalAgeByUltrasoundWeeks || null,
    gestationalAgeByUltrasoundDays: row.gestationalAgeByUltrasoundDays || null,
    gestationalAgeOnBloodTestWeeks: gestationalAgeOnBloodTest && gestationalAgeOnBloodTest.weeks,
    gestationalAgeOnBloodTestDays: gestationalAgeOnBloodTest && gestationalAgeOnBloodTest.days,
    ultrasoundDate: row.ultrasoundDate ? formatDate(row.ultrasoundDate) : null,
    bloodTestDate: formatDate(row.bloodTestDate),
    note: row.note
  });

  await addPregnancyMeasures(medicalExamination, row);
}

async function populateDb() {
  await addTestUser();
  await addCharacteristics();

  const results = [];
  let rowNumber = 1;

  await fs.createReadStream(process.env.POPULATE_DB_DATA_LOCATION)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
      try {
        results.push(addPatient(row, rowNumber));
        rowNumber++;
      }
      catch(err) {
        console.error(err.message);
      }
    })
    .on('end', async () => {
      await Promise.all(results);
      process.exit(0);
    });
}

sequelizeConfig.configure().then(() => {
  sequelizeConfig.initializeDatabase(true).then(() => {
    populateDb();
  });
});
