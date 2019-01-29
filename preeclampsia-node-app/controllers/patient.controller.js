const errors = require('restify-errors');
const PatientService = require('../services/patient.service');
const PregnancyService = require('../services/pregnancy.service');
const PregnancyDetailsViewModel = require('../dataTransferObjects/viewModels/PregnancyDetails.viewModel');

const getAll = async (req, res) => {
  const patientList = await PatientService.getAll();
  res.json({ data: patientList });
};

const getById = async (req, res) => {
  const { patientId } = req.params;

  if (!patientId) {
    throw new errors.BadRequestError();
  }

  const patient = await PatientService.getById(patientId);

  if (!patient) {
    throw new errors.NotFoundError('Podaci o pacijentu nisu pronađeni.');
  }

  res.json(patient);
};

const getPregnancyDetails = async (req, res) => {
  const { patientId, pregnancyNumber } = req.params;

  const pregnancy = await PregnancyService.getDetails(patientId, pregnancyNumber);

  if (!pregnancy) {
    throw new errors.NotFoundError('Detalji o trudnoći nisu pronađeni.');
  }

  const model = new PregnancyDetailsViewModel(pregnancy);

  res.json(model);
};

module.exports = {
  getAll,
  getById,
  getPregnancyDetails
};
