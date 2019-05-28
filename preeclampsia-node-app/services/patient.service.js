const values = require('../constants/values.constants');
const { patientListSortColumnNames } = require('../constants/patient.constants');
const { sortDirections } = require('../constants/query.constants');
const { getSortColumnName, getSortDirection } = require('../utils/query.utils');
const { db } = require('../models');

const getAll = async (
  page = values.DEFAULT_PAGE,
  pageSize = values.DEFAULT_PAGE_SIZE,
  sortColumn,
  sortDirection,
) => (
  await db.Patient.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order: [
      [
        getSortColumnName(sortColumn, patientListSortColumnNames),
        getSortDirection(sortDirection, sortDirections.DESC),
      ],
    ],
  })
);

const getById = async (id) => await db.Patient.findByPk(id);

const getByIdWithPregnancies = async (patientId) => await db.Patient.findOne({
  where: {
    id: patientId
  },
  include: [{ model: db.Pregnancy, as: 'pregnancies' }]
});

const createPatient = async (patientData) => {
  const {
    firstName,
    lastName,
    MBO,
    birthDate,
    racialOrigin,
  } = patientData;

  const patient = await db.Patient.create({
    firstName,
    lastName,
    MBO,
    birthDate,
    racialOrigin,
  });

  return patient;
};

const updatePatient = async (patientId, patientData) => {
  const {
    firstName,
    lastName,
    MBO,
    birthDate,
    racialOrigin,
  } = patientData;

  const patient = await getById(patientId);

  return await patient.update({
    firstName,
    lastName,
    MBO,
    birthDate,
    racialOrigin,
  });
};

const removePatient = async (patientId) => {
  const patient = await getById(patientId);

  return await patient.destroy();
};

const existsPatientWithId = async (id) => !!(await getById(id));

const existsPatientWithMBO = async (MBO) => {
  const patient = await db.Patient.findOne({
    where: { MBO }
  });

  return !!patient;
};

module.exports = {
  getAll,
  getById,
  getByIdWithPregnancies,
  createPatient,
  updatePatient,
  removePatient,
  existsPatientWithMBO,
  existsPatientWithId,
};
