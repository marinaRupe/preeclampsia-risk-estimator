const { db } = require('models');

const getById = async (id) => await db.MedicalExamination.findOne({
  where: { id },
  include: [
    { model: db.BooleanMeasurement, as: 'booleanMeasurements' },
    { model: db.EnumMeasurement, as: 'enumMeasurements' },
    { model: db.NumericalMeasurement, as: 'numericalMeasurements' },
  ],
});

const getByIdDetailed = async (id) => await db.MedicalExamination.findOne({
  where: { id },
  include: [
    { model: db.BooleanMeasurement, as: 'booleanMeasurements' },
    { model: db.EnumMeasurement, as: 'enumMeasurements' },
    { model: db.NumericalMeasurement, as: 'numericalMeasurements' },
    {
      model: db.Pregnancy, as: 'pregnancy',
      include: [
        { model: db.Patient, as: 'patient' },
      ],
    },
  ],
});

const getAllForPregnancy = async (pregnancyId) => (
  await db.MedicalExamination.findAll({
    where: {
      pregnancyId,
    },
    include: [
      { model: db.BooleanMeasurement, as: 'booleanMeasurements' },
      { model: db.EnumMeasurement, as: 'enumMeasurements' },
      { model: db.NumericalMeasurement, as: 'numericalMeasurements' },
    ],
  })
);

const existWithId = async (id) => !!(getById(id));

const createMedicalExamination = async (medicalExaminationData) => {
  const {
    gynecologist,
    pregnancyNumber,
    pregnancyType,
    conceptionMethod,
    lastPeriodDate,
    lastPeriodDateIsReliable,
    deliveryDate,
    birthWeight,
    birthLength,
    numberOfPreviousPregnancies,
    numberOfPreviousBirths,
    hadPEInPreviousPregnancy,
    resultedWithPE,
  } = medicalExaminationData;

  const medicalExamination = await db.MedicalExamination.create({
    gynecologist,
    pregnancyNumber,
    pregnancyType,
    conceptionMethod,
    lastPeriodDate,
    lastPeriodDateIsReliable,
    deliveryDate,
    birthWeight,
    birthLength,
    numberOfPreviousPregnancies,
    numberOfPreviousBirths,
    hadPEInPreviousPregnancy,
    resultedWithPE,
  });

  return medicalExamination;
};

const updateMedicalExamination = async (medicalExaminationId, medicalExaminationData) => {
  const medicalExamination = await getById(medicalExaminationId);

  return await medicalExamination.update({
    trimesterNumber: medicalExaminationData.trimesterNumber,
    protocol: medicalExaminationData.protocol,
    ultrasoundDate: medicalExaminationData.ultrasoundDate,
    gestationalAgeByUltrasoundWeeks: medicalExaminationData.gestationalAgeByUltrasoundWeeks,
    gestationalAgeByUltrasoundDays: medicalExaminationData.gestationalAgeByUltrasoundDays,
    bloodTestDate: medicalExaminationData.bloodTestDate,
    gestationalAgeOnBloodTestWeeks: medicalExaminationData.gestationalAgeOnBloodTestWeeks,
    gestationalAgeOnBloodTestDays: medicalExaminationData.gestationalAgeOnBloodTestDays,
    note: medicalExaminationData.note,
  });
};

const removeMedicalExamination = async (medicalExaminationId) => {
  const medicalExamination = await getById(medicalExaminationId);

  return await medicalExamination.destroy();
};

module.exports = {
  getById,
  getByIdDetailed,
  getAllForPregnancy,
  existWithId,
  createMedicalExamination,
  updateMedicalExamination,
  removeMedicalExamination,
};

