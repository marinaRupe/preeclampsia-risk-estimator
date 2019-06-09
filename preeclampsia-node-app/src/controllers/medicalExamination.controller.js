const Errors = require('restify-errors');
const MedicalExaminationService = require('services/medicalExamination.service');
const MeasurementService = require('services/measurement.service');
const MedicalExaminationValidator = require('validators/medicalExamination.validator');
const MedicalExaminationDetailsViewModel
  = require('dataTransferObjects/viewModels/MedicalExamination/MedicalExaminationDetails.viewModel');
const PregnancyDataForReportViewModel
  = require('dataTransferObjects/viewModels/Report/PregnancyDataForReport.viewModel');

const getMedicalExaminationDetails = async (req, res) => {
  const { medicalExaminationId } = req.params;
  const { translations } = res.locals;

  if (!MedicalExaminationService.existWithId(medicalExaminationId)) {
    throw new Errors.NotFoundError(translations.response.notFound.medicalExamination);
  }

  const medicalExamination = await MedicalExaminationService.getByIdDetailed(medicalExaminationId);

  const model = new PregnancyDataForReportViewModel(
    medicalExamination,
    medicalExamination.pregnancy,
    medicalExamination.pregnancy.patient
  );

  res.json(model);
};

const createMedicalExamination = async (req, res) => {
  const medicalExaminationData = req.body;
  const { translations } = res.locals;

  if (!medicalExaminationData) {
    throw new Errors.BadRequestError(translations.medicalExamination.validation.dataRequired);
  }

  const { isValid, errors } = (
    await MedicalExaminationValidator.isValidMedicalExamination(
      medicalExaminationData, translations.medicalExamination.validation
    )
  );

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const medicalExamination = await MedicalExaminationService.createMedicalExamination(medicalExaminationData);

  if (!medicalExamination) {
    throw new Errors.InternalServerError(translations.response.error.medicalExamination.create);
  }

  const model = new MedicalExaminationDetailsViewModel(medicalExamination);

  res.json(model);
};

const updateMedicalExamination = async (req, res) => {
  const { medicalExaminationId } = req.params;
  const medicalExaminationData = req.body;
  const { translations } = res.locals;

  if (!medicalExaminationData) {
    throw new Errors.BadRequestError(translations.medicalExamination.validation.dataRequired);
  }

  if (!MedicalExaminationService.existWithId(medicalExaminationId)) {
    throw new Errors.NotFoundError(translations.response.notFound.medicalExamination);
  }

  const { isValid, errors } = await MedicalExaminationValidator.isValidMedicalExamination(
    medicalExaminationData, translations.medicalExamination.validation
  );

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const medicalExamination = await MedicalExaminationService.updateMedicalExamination(
    medicalExaminationId, medicalExaminationData
  );

  if (!medicalExamination) {
    throw new Errors.InternalServerError(translations.response.error.medicalExamination.update);
  }

  const model = new MedicalExaminationDetailsViewModel(medicalExamination);

  res.json(model);
};

const updateMeasurements = async (req, res) => {
  const { medicalExaminationId } = req.params;
  const measurementsData = req.body;
  const { translations } = res.locals;

  if (!measurementsData) {
    throw new Errors.BadRequestError(translations.measurement.validation.dataRequired);
  }

  if (!MedicalExaminationService.existWithId(medicalExaminationId)) {
    throw new Errors.NotFoundError(translations.response.notFound.medicalExamination);
  }

  const measurements = await MeasurementService.updateMeasurements(medicalExaminationId, measurementsData);

  if (!measurements) {
    throw new Errors.InternalServerError(translations.response.error.measurements.update);
  }

  const medicalExamination = await MedicalExaminationService.getById(medicalExaminationId);
  const model = new MedicalExaminationDetailsViewModel(medicalExamination);

  res.json(model);
};

module.exports = {
  getMedicalExaminationDetails,
  createMedicalExamination,
  updateMedicalExamination,
  updateMeasurements,
};
