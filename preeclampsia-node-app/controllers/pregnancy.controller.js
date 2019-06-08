const Errors = require('restify-errors');
const PregnancyService = require('../services/pregnancy.service');
const MedicalExaminationService = require('../services/medicalExamination.service');
const PregnancyValidator = require('../validators/pregnancy.validator');
const PregnancyDetailsViewModel = require('../dataTransferObjects/viewModels/Pregnancy/PregnancyDetails.viewModel');
const MedicalExaminationDetailsViewModel
  = require('../dataTransferObjects/viewModels/MedicalExamination/MedicalExaminationDetails.viewModel');

const getPregnancyDetails = async (req, res) => {
  const { patientId, pregnancyNumber } = req.params;
  const { translations } = res.locals;

  const pregnancy = await PregnancyService.getDetails(patientId, pregnancyNumber);

  if (!pregnancy) {
    throw new Errors.NotFoundError(translations.response.notFound.pregnancy);
  }

  const model = new PregnancyDetailsViewModel(pregnancy);

  res.json(model);
};

const getMedicalExaminationsForPregnancy = async (req, res) => {
  const { pregnancyId } = req.params;
  const { translations } = res.locals;

  if (!PregnancyService.existWithId(pregnancyId)) {
    throw new Errors.NotFoundError(translations.response.notFound.pregnancy);
  }

  const medicalExaminations = await MedicalExaminationService.getAllForPregnancy(pregnancyId);
  const model = medicalExaminations.map(me => new MedicalExaminationDetailsViewModel(me));

  res.json(model);
};

const createPregnancy = async (req, res) => {
  const pregnancyData = req.body;
  const { translations } = res.locals;

  if (!pregnancyData) {
    throw new Errors.BadRequestError(translations.pregnancy.validation.dataRequired);
  }

  const { isValid, errors } = (
    await PregnancyValidator.isValidPatient(pregnancyData, translations.pregnancy.validation)
  );

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const pregnancy = await PregnancyService.createPregnancy(pregnancyData);

  if (!pregnancy) {
    throw new Errors.InternalServerError(translations.response.error.pregnancy.create);
  }

  const model = new PregnancyDetailsViewModel(pregnancy);

  res.json(model);
};

const updatePregnancy = async (req, res) => {
  const { pregnancyId } = req.params;
  const pregnancyData = req.body;
  const { translations } = res.locals;

  if (!pregnancyData) {
    throw new Errors.BadRequestError(translations.pregnancy.validation.dataRequired);
  }

  if (!PregnancyService.existWithId(pregnancyId)) {
    throw new Errors.NotFoundError(translations.response.notFound.pregnancy);
  }

  const { isValid, errors } = await PregnancyValidator.isValidPregnancy(
    pregnancyData, translations.pregnancy.validation
  );

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const pregnancy = await PregnancyService.updatePregnancy(pregnancyId, pregnancyData);

  if (!pregnancy) {
    throw new Errors.InternalServerError(translations.response.error.pregnancy.update);
  }

  const model = new PregnancyDetailsViewModel(pregnancy);

  res.json(model);
};

module.exports = {
  getPregnancyDetails,
  getMedicalExaminationsForPregnancy,
  createPregnancy,
  updatePregnancy,
};
