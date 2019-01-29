const { db } = require('../models');

const getAll = async () => await db.Patient.findAll();

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
