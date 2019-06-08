const Errors = require('restify-errors');
const PregnancyService = require('../services/pregnancy.service');
const MedicalExaminationService = require('../services/medicalExamination.service');
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

module.exports = {
  getPregnancyDetails,
  getMedicalExaminationsForPregnancy,
};
