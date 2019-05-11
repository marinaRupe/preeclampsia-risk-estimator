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

  const patient = await PatientService.getByIdWithPregnancies(patientId);

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

  const patient = await PatientService.createPatient(patientData);

  if (!patient) {
    throw new Errors.InternalServerError('Could not create new patient');
  }

  res.json(patient);
};

const updatePatient = async (req, res) => {
  const { patientId } = req.params;
  const patientData = req.body;

  if (!patientData) {
    throw new Errors.BadRequestError('Patient data is required');
  }

  if (!PatientService.existsPatientWithId(patientId)) {
    throw new Errors.NotFoundError('Patient does not exist ');
  }

  const { isValid, errors } = await PatientValidator.isValidPatient(patientData);

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const patient = await PatientService.updatePatient(patientId, patientData);

  if (!patient) {
    throw new Errors.InternalServerError('Could not update patient');
  }

  res.json(patient);
};

const deletePatient = async (req, res) => {
  const { patientId } = req.params;

  if (!PatientService.existsPatientWithId(patientId)) {
    throw new Errors.NotFoundError('Patient does not exist ');
  }

  const patient = await PatientService.removePatient(patientId);

  if (!patient) {
    throw new Errors.InternalServerError('Could not delete patient');
  }

  res.status(200).send('Patient is successfully deleted');
};

module.exports = {
  getAll,
  getById,
  createPatient,
  updatePatient,
  deletePatient,
};
