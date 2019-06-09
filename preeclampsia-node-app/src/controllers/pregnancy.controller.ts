import * as Errors from 'restify-errors';
import PregnancyService from 'services/pregnancy.service';
import MedicalExaminationService from 'services/medicalExamination.service';
import PregnancyValidator from 'validators/pregnancy.validator';
import PregnancyDetailsViewModel from 'dataTransferObjects/viewModels/Pregnancy/PregnancyDetails.viewModel';
import MedicalExaminationDetailsViewModel
  from 'dataTransferObjects/viewModels/MedicalExamination/MedicalExaminationDetails.viewModel';
import { isDefined } from 'utils/value.utils';

const getPregnancyDetails = async (req, res) => {
  const patientId = +req.params.patientId;
  const pregnancyNumber = +req.params.pregnancyNumber;
  const { translations } = res.locals;

  if (!isDefined(patientId) || !isDefined(pregnancyNumber)) {
    throw new Errors.BadRequestError();
  }

  const pregnancy = await PregnancyService.getDetails(patientId, pregnancyNumber);

  if (!isDefined(pregnancy)) {
    throw new Errors.NotFoundError(translations.response.notFound.pregnancy);
  }

  const model = new PregnancyDetailsViewModel(pregnancy);

  res.json(model);
};

const getMedicalExaminationsForPregnancy = async (req, res) => {
  const pregnancyId = +req.params.pregnancyId;
  const { translations } = res.locals;

  if (!isDefined(pregnancyId)) {
    throw new Errors.BadRequestError();
  }

  if (!(await PregnancyService.existWithId(pregnancyId))) {
    throw new Errors.NotFoundError(translations.response.notFound.pregnancy);
  }

  const medicalExaminations = await MedicalExaminationService.getAllForPregnancy(pregnancyId);
  const model = medicalExaminations.map(me => new MedicalExaminationDetailsViewModel(me));

  res.json(model);
};

const createPregnancy = async (req, res) => {
  const pregnancyData = req.body;
  const { translations } = res.locals;

  if (!isDefined(pregnancyData)) {
    throw new Errors.BadRequestError(translations.pregnancy.validation.dataRequired);
  }

  const { isValid, errors } = (
    await PregnancyValidator.isValidPregnancy(pregnancyData, translations.pregnancy.validation)
  );

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const pregnancy = await PregnancyService.createPregnancy(pregnancyData);

  if (!isDefined(pregnancy)) {
    throw new Errors.InternalServerError(translations.response.error.pregnancy.create);
  }

  const model = new PregnancyDetailsViewModel(pregnancy);

  res.json(model);
};

const updatePregnancy = async (req, res) => {
  const pregnancyId = +req.params.pregnancyId;
  const pregnancyData = req.body;
  const { translations } = res.locals;

  if (!isDefined(pregnancyId)) {
    throw new Errors.BadRequestError();
  }

  if (!isDefined(pregnancyData)) {
    throw new Errors.BadRequestError(translations.pregnancy.validation.dataRequired);
  }

  if (!(await PregnancyService.existWithId(pregnancyId))) {
    throw new Errors.NotFoundError(translations.response.notFound.pregnancy);
  }

  const { isValid, errors } = await PregnancyValidator.isValidPregnancy(
    pregnancyData, translations.pregnancy.validation
  );

  if (!isValid) {
    throw new Errors.BadRequestError({ info: errors });
  }

  const pregnancy = await PregnancyService.updatePregnancy(pregnancyId, pregnancyData);

  if (!isDefined(pregnancy)) {
    throw new Errors.InternalServerError(translations.response.error.pregnancy.update);
  }

  const model = new PregnancyDetailsViewModel(pregnancy);

  res.json(model);
};

export default {
  getPregnancyDetails,
  getMedicalExaminationsForPregnancy,
  createPregnancy,
  updatePregnancy,
};
