import * as Errors from 'restify-errors';
import MedicalExaminationService from 'services/medicalExamination.service';
import MeasurementService from 'services/measurement.service';
import MedicalExaminationValidator from 'validators/medicalExamination.validator';
import MedicalExaminationDetailsViewModel
	from 'dataTransferObjects/viewModels/MedicalExamination/MedicalExaminationDetails.viewModel';
import PregnancyDataForReportViewModel
	from'dataTransferObjects/viewModels/Report/PregnancyDataForReport.viewModel';
import { isDefined } from 'utils/value.utils';

const getMedicalExaminationDetails = async (req, res) => {
	const medicalExaminationId = +req.params.medicalExaminationId;
	const { translations } = res.locals;

	if (!isDefined(medicalExaminationId)) {
		throw new Errors.BadRequestError();
	}

	if (!(await MedicalExaminationService.existWithId(medicalExaminationId))) {
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

	if (!isDefined(medicalExaminationData)) {
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

	if (!isDefined(medicalExamination)) {
		throw new Errors.InternalServerError(translations.response.error.medicalExamination.create);
	}

	const model = new MedicalExaminationDetailsViewModel(medicalExamination);

	res.json(model);
};

const updateMedicalExamination = async (req, res) => {
	const medicalExaminationId = +req.params.medicalExaminationId;
	const medicalExaminationData = req.body;
	const { translations } = res.locals;

	if (!isDefined(medicalExaminationId)) {
		throw new Errors.BadRequestError();
	}

	if (!isDefined(medicalExaminationData)) {
		throw new Errors.BadRequestError(translations.medicalExamination.validation.dataRequired);
	}

	if (!(await MedicalExaminationService.existWithId(medicalExaminationId))) {
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

	if (!isDefined(medicalExamination)) {
		throw new Errors.InternalServerError(translations.response.error.medicalExamination.update);
	}

	const model = new MedicalExaminationDetailsViewModel(medicalExamination);

	res.json(model);
};

const updateMeasurements = async (req, res) => {
	const medicalExaminationId = +req.params.medicalExaminationId;
	const measurementsData = req.body;
	const { translations } = res.locals;

	if (!isDefined(medicalExaminationId)) {
		throw new Errors.BadRequestError();
	}

	if (!isDefined(measurementsData)) {
		throw new Errors.BadRequestError(translations.measurement.validation.dataRequired);
	}

	if (!(await MedicalExaminationService.existWithId(medicalExaminationId))) {
		throw new Errors.NotFoundError(translations.response.notFound.medicalExamination);
	}

	const measurements = await MeasurementService.updateMeasurements(medicalExaminationId, measurementsData);

	if (!isDefined(measurements)) {
		throw new Errors.InternalServerError(translations.response.error.measurements.update);
	}

	const medicalExamination = await MedicalExaminationService.getById(medicalExaminationId);
	const model = new MedicalExaminationDetailsViewModel(medicalExamination);

	res.json(model);
};

export default {
	getMedicalExaminationDetails,
	createMedicalExamination,
	updateMedicalExamination,
	updateMeasurements,
};
