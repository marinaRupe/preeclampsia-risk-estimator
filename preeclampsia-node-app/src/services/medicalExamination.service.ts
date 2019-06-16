import { db } from 'models/index';

const getById = async (id: number) => await db.MedicalExamination.findOne({
	where: { id },
	include: [
		{ model: db.BooleanMeasurement, as: 'booleanMeasurements' },
		{ model: db.EnumMeasurement, as: 'enumMeasurements' },
		{ model: db.NumericalMeasurement, as: 'numericalMeasurements' },
	],
});

const getByIdDetailed = async (id: number) => await db.MedicalExamination.findOne({
	where: { id },
	include: [
		{ model: db.BooleanMeasurement, as: 'booleanMeasurements' },
		{ model: db.EnumMeasurement, as: 'enumMeasurements' },
		{ model: db.NumericalMeasurement, as: 'numericalMeasurements' },
		{
			model: db.Pregnancy, as: 'pregnancy',
			include: [
				{ model: db.Patient, as: 'patient' },
			],
		},
	],
});

const getAllForPregnancy = async (pregnancyId: number) => (
	await db.MedicalExamination.findAll({
		where: {
			pregnancyId,
		},
		include: [
			{ model: db.BooleanMeasurement, as: 'booleanMeasurements' },
			{ model: db.EnumMeasurement, as: 'enumMeasurements' },
			{ model: db.NumericalMeasurement, as: 'numericalMeasurements' },
		],
	})
);

const existWithId = async (id) => !!(getById(id));

const createMedicalExamination = async (medicalExaminationData) => {
	const medicalExamination = await db.MedicalExamination.create({
		pregnancyId: medicalExaminationData.pregnancyId,
		trimesterNumber: medicalExaminationData.trimesterNumber,
		protocol: medicalExaminationData.protocol,
		ultrasoundDate: medicalExaminationData.ultrasoundDate,
		gestationalAgeByUltrasoundWeeks: medicalExaminationData.gestationalAgeByUltrasoundWeeks,
		gestationalAgeByUltrasoundDays: medicalExaminationData.gestationalAgeByUltrasoundDays,
		bloodTestDate: medicalExaminationData.bloodTestDate,
		gestationalAgeOnBloodTestWeeks: medicalExaminationData.gestationalAgeOnBloodTestWeeks,
		gestationalAgeOnBloodTestDays: medicalExaminationData.gestationalAgeOnBloodTestDays,
		note: medicalExaminationData.note,
	});

	return medicalExamination;
};

const updateMedicalExamination = async (id: number, medicalExaminationData) => {
	const medicalExamination = await getById(id);

	return await medicalExamination.update({
		trimesterNumber: medicalExaminationData.trimesterNumber,
		protocol: medicalExaminationData.protocol,
		ultrasoundDate: medicalExaminationData.ultrasoundDate,
		gestationalAgeByUltrasoundWeeks: medicalExaminationData.gestationalAgeByUltrasoundWeeks,
		gestationalAgeByUltrasoundDays: medicalExaminationData.gestationalAgeByUltrasoundDays,
		bloodTestDate: medicalExaminationData.bloodTestDate,
		gestationalAgeOnBloodTestWeeks: medicalExaminationData.gestationalAgeOnBloodTestWeeks,
		gestationalAgeOnBloodTestDays: medicalExaminationData.gestationalAgeOnBloodTestDays,
		note: medicalExaminationData.note,
	});
};

const removeMedicalExamination = async (id: number) => {
	const medicalExamination = await getById(id);

	return await medicalExamination.destroy();
};

export default {
	getById,
	getByIdDetailed,
	getAllForPregnancy,
	existWithId,
	createMedicalExamination,
	updateMedicalExamination,
	removeMedicalExamination,
};
