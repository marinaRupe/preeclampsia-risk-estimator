const errors = require('restify-errors');
const PatientService = require('../services/patient.service');
const PregnancyService = require('../services/pregnancy.service');
const PregnancyDetailsViewModel = require('../dataTransferObjects/viewModels/PregnancyDetails.viewModel');
const PregnancyTrimesterDetailsViewModel
  = require('../dataTransferObjects/viewModels/PregnancyTrimesterDetails.viewModel');

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

module.exports = {
  getAll,
  getById,
};
