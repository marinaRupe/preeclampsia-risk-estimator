const { db } = require('../models');

const existWithId = async (id) => !!(await getById(id));

const getById = async (id) => await db.Pregnancy.findByPk(id);

const getDetails = async (patientId, pregnancyNumber) => await db.Pregnancy.findOne({
  where: {
    patientId,
    pregnancyNumber
  },
});

module.exports = {
  getById,
  getDetails,
  existWithId,
};
