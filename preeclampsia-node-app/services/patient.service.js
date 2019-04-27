const values = require('../constants/values.constants');
const { db } = require('../models');

const getAll = async (page = values.DEFAULT_PAGE, pageSize = values.DEFAULT_PAGE_SIZE) => (
  await db.Patient.findAndCountAll({ offset: (page - 1) * pageSize, limit: pageSize })
);

const getById = async (patientId) => await db.Patient.find({
  where: {
    id: patientId
  },
  include: [{ model: db.Pregnancy, as: 'pregnancies' }]
});

module.exports = {
  getAll,
  getById
};
