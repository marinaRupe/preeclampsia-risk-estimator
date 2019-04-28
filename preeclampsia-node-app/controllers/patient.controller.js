const Errors = require('restify-errors');
const PatientService = require('../services/patient.service');
const values = require('../constants/values.constants');
const PatientValidator = require('../validators/patient.validator');
const PageViewModel = require('../dataTransferObjects/viewModels/Paging/Page.viewModel');

const getAll = async (req, res) => {
  let { page, pageSize } = req.query;
  const { sortColumn, sortDirection } = req.query;

  page = page || values.DEFAULT_PAGE;
  pageSize = pageSize || values.DEFAULT_PAGE_SIZE;

  const patientList = await PatientService.getAll(page, pageSize, sortColumn, sortDirection);
  res.json(new PageViewModel(patientList.rows, patientList.count, page, pageSize));
};

const getById = async (req, res) => {
  const { patientId } = req.params;

  if (!patientId) {
    throw new Errors.BadRequestError();
  }

  const patient = await PatientService.getById(patientId);

  if (!patient) {
    throw new Errors.NotFoundError('Podaci o pacijentu nisu pronađeni.');
  }

  res.json(patient);
};

const createPatient = async (req, res) => {
  const patientData = req.body;

  if (!patientData) {
    throw new Errors.BadRequestError('Patient data is required');
  }

  const { isValid, errors } = await PatientValidator.isValidPatient(patientData);

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const user = await PatientService.createPatient(patientData);

  if (!user) {
    throw new Errors.InternalServerError('Could not create new patient');
  }

  res.json(user);
};

module.exports = {
  getAll,
  getById,
  createPatient,
};
