const Errors = require('restify-errors');
const MedicalExaminationService = require('../services/medicalExamination.service');
const MeasurementService = require('../services/measurement.service');
const MedicalExaminationDetailsViewModel
  = require('../dataTransferObjects/viewModels/MedicalExamination/MedicalExaminationDetails.viewModel');
const PregnancyDataForReportViewModel
  = require('../dataTransferObjects/viewModels/Report/PregnancyDataForReport.viewModel');

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
  updateMeasurements,
};
