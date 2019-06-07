const Errors = require('restify-errors');
const PatientService = require('../services/patient.service');
const values = require('../constants/values.constants');
const PatientValidator = require('../validators/patient.validator');
const PageViewModel = require('../dataTransferObjects/viewModels/Paging/Page.viewModel');
const PatientDetailsViewModel = require('../dataTransferObjects/viewModels/Patient/PatientDetails.viewModel');

const getAll = async (req, res) => {
  let { page, pageSize } = req.query;
  const { sortColumn, sortDirection, search } = req.query;

  page = page || values.DEFAULT_PAGE;
  pageSize = pageSize || values.DEFAULT_PAGE_SIZE;

  const patientList = await PatientService.getAll(page, pageSize, sortColumn, sortDirection, search);

  const patients = patientList.rows.map(p => (new PatientDetailsViewModel(p)));
  const model = new PageViewModel(patients, patientList.count, page, pageSize);

  res.json(model);
};

const getById = async (req, res) => {
  const { patientId } = req.params;
  const { translations } = res.locals;

  if (!patientId) {
    throw new Errors.BadRequestError();
  }

  const patient = await PatientService.getByIdWithPregnancies(patientId);

  if (!patient) {
    throw new Errors.NotFoundError(translations.response.notFound.patient);
  }

  res.json(patient);
};

const createPatient = async (req, res) => {
  const patientData = req.body;
  const { translations } = res.locals;

  if (!patientData) {
    throw new Errors.BadRequestError(translations.patient.validation.dataRequired);
  }

  const { isValid, errors } = (
    await PatientValidator.isValidPatient(patientData, translations.patient.validation)
  );

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const patient = await PatientService.createPatient(patientData);

  if (!patient) {
    throw new Errors.InternalServerError(translations.response.error.patient.create);
  }

  const model = new PatientDetailsViewModel(patient);

  res.json(model);
};

const updatePatient = async (req, res) => {
  const { patientId } = req.params;
  const patientData = req.body;
  const { translations } = res.locals;

  if (!patientData) {
    throw new Errors.BadRequestError(translations.patient.validation.dataRequired);
  }

  if (!PatientService.existsPatientWithId(patientId)) {
    throw new Errors.NotFoundError(translations.response.notFound.patient);
  }

  const { isValid, errors } = (
    await PatientValidator.isValidPatient(patientData, translations.patient.validation, true)
  );

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const patient = await PatientService.updatePatient(patientId, patientData);

  if (!patient) {
    throw new Errors.InternalServerError(translations.response.error.patient.update);
  }

  const model = new PatientDetailsViewModel(patient);

  res.json(model);
};

const deletePatient = async (req, res) => {
  const { patientId } = req.params;
  const { translations } = res.locals;

  if (!PatientService.existsPatientWithId(patientId)) {
    throw new Errors.NotFoundError(translations.response.notFound.patient);
  }

  const patient = await PatientService.removePatient(patientId);

  if (!patient) {
    throw new Errors.InternalServerError(translations.response.error.patient.delete);
  }

  res.status(200).send(translations.response.success.patient.delete);
};

module.exports = {
  getAll,
  getById,
  createPatient,
  updatePatient,
  deletePatient,
};
