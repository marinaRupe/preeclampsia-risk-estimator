const Errors = require('restify-errors');
const values = require('../constants/values.constants');
const { translations } = require('../constants/translations.constants');
const PregnancyService = require('../services/pregnancy.service');
const PregnancyDetailsViewModel = require('../dataTransferObjects/viewModels/Pregnancy/PregnancyDetails.viewModel');
const PregnancyTrimesterDetailsViewModel
  = require('../dataTransferObjects/viewModels/Pregnancy/PregnancyTrimesterDetails.viewModel');

const getPregnancyDetails = async (req, res) => {
  const { patientId, pregnancyNumber } = req.params;
  const language = req.headers['accept-language'] || values.DEFAULT_LANGUAGE;

  const pregnancy = await PregnancyService.getDetails(patientId, pregnancyNumber);

  if (!pregnancy) {
    throw new Errors.NotFoundError(translations[language].response.notFound.pregnancy);
  }

  const model = new PregnancyDetailsViewModel(pregnancy);

  res.json(model);
};

const getPregnancyTrimesterDetails = async (req, res) => {
  const { pregnancyId, trimesterNumber = 1 } = req.params;
  const language = req.headers['accept-language'] || values.DEFAULT_LANGUAGE;

  const trimester = await PregnancyService.getPregnancyTrimesterDetails(pregnancyId, trimesterNumber);

  if (!trimester) {
    throw new Errors.NotFoundError(translations[language].response.notFound.trimester);
  }

  const model = new PregnancyTrimesterDetailsViewModel(trimester);

  res.json(model);
};

module.exports = {
  getPregnancyDetails,
  getPregnancyTrimesterDetails,
};
