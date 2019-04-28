const { db } = require('../models');

const getDetails = async (patientId, pregnancyNumber) => await db.Pregnancy.findOne({
  where: {
    patientId,
    pregnancyNumber
  },
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
  getDetails,
  getPregnancyTrimesterDetails,
};
