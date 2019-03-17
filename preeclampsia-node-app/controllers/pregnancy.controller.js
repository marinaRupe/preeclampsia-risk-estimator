const errors = require('restify-errors');
const PregnancyService = require('../services/pregnancy.service');
const PregnancyDetailsViewModel = require('../dataTransferObjects/viewModels/PregnancyDetails.viewModel');
const PregnancyTrimesterDetailsViewModel
  = require('../dataTransferObjects/viewModels/PregnancyTrimesterDetails.viewModel');

const getPregnancyDetails = async (req, res) => {
  const { patientId, pregnancyNumber } = req.params;

  const pregnancy = await PregnancyService.getDetails(patientId, pregnancyNumber);

  if (!pregnancy) {
    throw new errors.NotFoundError('Detalji o trudnoći nisu pronađeni.');
  }

  const model = new PregnancyDetailsViewModel(pregnancy);

  res.json(model);
};

const getPregnancyTrimesterDetails = async (req, res) => {
  const { pregnancyId, trimesterNumber = 1 } = req.params;

  const trimester = await PregnancyService.getPregnancyTrimesterDetails(pregnancyId, trimesterNumber);

  if (!trimester) {
    throw new errors.NotFoundError('Detalji o tromjesečju nisu pronađeni.');
  }

  const model = new PregnancyTrimesterDetailsViewModel(trimester);

  res.json(model);
};

module.exports = {
  getPregnancyDetails,
  getPregnancyTrimesterDetails,
};
