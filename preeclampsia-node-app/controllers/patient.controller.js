const Errors = require('restify-errors');
const PatientService = require('../services/patient.service');
const PregnancyService = require('../services/pregnancy.service');
const PregnancyDetailsViewModel = require('../dataTransferObjects/viewModels/Pregnancy/PregnancyDetails.viewModel');
const PregnancyTrimesterDetailsViewModel
  = require('../dataTransferObjects/viewModels/Pregnancy/PregnancyTrimesterDetails.viewModel');

const getAll = async (req, res) => {
  const patientList = await PatientService.getAll();
  res.json({ data: patientList });
};

const getById = async (req, res) => {
  const { patientId } = req.params;

  if (!patientId) {
    throw new Errors.BadRequestError();
  }

  const patient = await PatientService.getById(patientId);

  if (!patient) {
    throw new Errors.NotFoundError('Podaci o pacijentu nisu pronađeni.');
  }

  res.json(patient);
};

module.exports = {
  getAll,
  getById,
};
