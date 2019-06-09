import * as Errors from 'restify-errors';
import PatientService from 'services/patient.service';
import values from 'constants/values.constants';
import PatientValidator from 'validators/patient.validator';
import PageViewModel from 'dataTransferObjects/viewModels/Paging/Page.viewModel';
import PatientDetailsViewModel from 'dataTransferObjects/viewModels/Patient/PatientDetails.viewModel';
import CreatePatientRequestModel from 'dataTransferObjects/requestModels/Patient/CreatePatient.requestModel';
import UpdatePatientRequestModel from 'dataTransferObjects/requestModels/Patient/UpdatePatient.requestModel';
import { isDefined } from 'utils/value.utils';

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
  const patientId = parseInt(req.params.patientId);
  const { translations } = res.locals;

  if (!isDefined(patientId)) {
    throw new Errors.BadRequestError();
  }

  const patient = await PatientService.getByIdWithPregnancies(patientId);

  if (!isDefined(patient)) {
    throw new Errors.NotFoundError(translations.response.notFound.patient);
  }

  res.json(patient);
};

const createPatient = async (req, res) => {
  const patientData = req.body as CreatePatientRequestModel;
  const { translations } = res.locals;

  if (!isDefined(patientData)) {
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
  const patientId = +req.params.patientId;
  const patientData = req.body as UpdatePatientRequestModel;
  const { translations } = res.locals;

  if (!isDefined(patientData)) {
    throw new Errors.BadRequestError(translations.patient.validation.dataRequired);
  }

  if (!(await PatientService.existsPatientWithId(patientId))) {
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
  const patientId = +req.params.patientId;
  const { translations } = res.locals;

  if (!(await PatientService.existsPatientWithId(patientId))) {
    throw new Errors.NotFoundError(translations.response.notFound.patient);
  }

  const patient = await PatientService.removePatient(patientId);

  if (!patient) {
    throw new Errors.InternalServerError(translations.response.error.patient.delete);
  }

  res.status(200).send(translations.response.success.patient.delete);
};

export default {
  getAll,
  getById,
  createPatient,
  updatePatient,
  deletePatient,
};
