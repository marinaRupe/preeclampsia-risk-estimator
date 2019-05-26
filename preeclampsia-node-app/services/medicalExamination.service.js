const { db } = require('../models');

const getById = async (id) => await db.MedicalExamination.findOne({
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

module.exports = {
  getById,
  getAllForPregnancy,
  existWithId,
};

