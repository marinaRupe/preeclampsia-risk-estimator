const { db } = require('../models');

const getById = async (id) => await db.Pregnancy.findByPk(id);

const getDetails = async (patientId, pregnancyNumber) => await db.Pregnancy.findOne({
  where: {
    patientId,
    pregnancyNumber
  },
});

const getPregnancyTrimesterById = async (id) => await db.PregnancyTrimester.findOne({
  where: { id },
  include: [
    { model: db.BooleanMeasurement, as: 'booleanMeasurements' },
    { model: db.EnumMeasurement, as: 'enumMeasurements' },
    { model: db.NumericalMeasurement, as: 'numericalMeasurements' },
  ],
});

const getPregnancyTrimesterDetails = async (pregnancyId, trimesterNumber = 1) => await db.PregnancyTrimester.findOne({
  where: {
    pregnancyId,
    trimesterNumber
  },
  include: [
    { model: db.BooleanMeasurement, as: 'booleanMeasurements' },
    { model: db.EnumMeasurement, as: 'enumMeasurements' },
    { model: db.NumericalMeasurement, as: 'numericalMeasurements' },
  ],
});

module.exports = {
  getById,
  getDetails,
  getPregnancyTrimesterDetails,
  getPregnancyTrimesterById,
};
