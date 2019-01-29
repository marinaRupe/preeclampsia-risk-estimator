const { db } = require('../models');

const getDetails = async (patientId, pregnancyNumber) => await db.Pregnancy.find({
  where: {
    patientId,
    pregnancyNumber
  },
  include: [
    { model: db.BooleanMeasurement, as: 'booleanMeasurements' },
    { model: db.EnumMeasurement, as: 'enumMeasurements' },
    { model: db.NumericalMeasurement, as: 'numericalMeasurements' },
  ],
  order: [
    ['pregnancyNumber', 'ASC'],
  ],
});

module.exports = {
  getDetails,
};
