import { db } from 'models/index';
import { median } from 'utils/math.utils';
import { isDefined } from 'utils/value.utils';
import { Characteristics, CharacteristicTypes } from 'constants/characteristics.constants';

/**
 * Updates measurements in the database.
 */
const updateMeasurements = async (medicalExaminationId: number, measurements) => (
	await Promise.all(Object.entries(measurements).map(async ([characteristicName, measurementData]) => {
		const characteristic = Characteristics[characteristicName];
		const {
			id,
			value,
			characteristicId,
		} = measurementData as any;

		let newMeasurement;
		let oldMeasurement;

		if (characteristic.type === CharacteristicTypes.Enum) {
			if (isDefined(id)) {
				oldMeasurement = await getEnumMeasurementById(id);
			}

			if (isDefined(value)) {
				if (!isDefined(oldMeasurement) || oldMeasurement.value !== value) {
					newMeasurement = await createEnumMeasurement(value, medicalExaminationId, characteristicId);
				}
			}
		} else if (characteristic.type === CharacteristicTypes.Numerical) {
			if (isDefined(id)) {
				oldMeasurement = await getNumericalMeasurementById(id);
			}

			if (isDefined(value)) {
				if (!isDefined(oldMeasurement) || oldMeasurement.value !== value) {
					newMeasurement = await createNumericalMeasurement(value, medicalExaminationId, characteristicId);
				}
			}
		} else if (characteristic.type === CharacteristicTypes.Boolean) {
			if (isDefined(id)) {
				oldMeasurement = await getBooleanMeasurementById(id);
			}

			if (isDefined(value)) {
				if (!isDefined(oldMeasurement) || oldMeasurement.value !== value) {
					newMeasurement = await createBooleanMeasurement(value, medicalExaminationId, characteristicId);
				}
			}
		}

		// if the value has changed or is removed, delete old measurement
		if (isDefined(oldMeasurement) && (isDefined(newMeasurement) || !isDefined(value) )) {
			await oldMeasurement.destroy();
		}

		return newMeasurement;
	}))
);

/**
 * Searches for an enum measurement by ID.
 */
const getEnumMeasurementById = async (id: number) => await db.EnumMeasurement.findByPk(id);

/**
 * Searches for a numerical measurement by ID.
 */
const getNumericalMeasurementById = async (id: number) => await db.NumericalMeasurement.findByPk(id);

/**
 * Searches for a boolean measurement by ID.
 */
const getBooleanMeasurementById = async (id: number) => await db.BooleanMeasurement.findByPk(id);


const createEnumMeasurement = async (
	value: number, medicalExaminationId: number, characteristicId: number
) => (
	await createMeasurement(value, medicalExaminationId, characteristicId, db.EnumMeasurement)
);

const createNumericalMeasurement = async (
	value: number, medicalExaminationId: number, characteristicId: number
) => (
	await createMeasurement(value, medicalExaminationId, characteristicId, db.NumericalMeasurement)
);

const createBooleanMeasurement = async (
	value: boolean, medicalExaminationId: number, characteristicId: number
) => (
	await createMeasurement(value, medicalExaminationId, characteristicId, db.BooleanMeasurement)
);

const createMeasurement = async (
	value: number|boolean, medicalExaminationId: number, characteristicId: number, measurementTable
) => (
	await measurementTable.create({
		value: value,
		medicalExaminationId: medicalExaminationId,
		characteristicId: characteristicId,
	})
);

const getMediansByWeeks = async (characteristicId: number) => {
	const measures = await db.NumericalMeasurement.findAll({
		attributes: ['value'],
		where: {
			characteristicId,
		},
		include: [
			{
				model: db.MedicalExamination,
				as: 'medicalExamination',
				attributes: ['gestationalAgeByUltrasoundWeeks'],
				where: {
					gestationalAgeByUltrasoundWeeks: {
						[db.Sequelize.Op.ne]: null
					}
				},
				include: [
					{
						model: db.Pregnancy,
						as: 'pregnancy',
						attributes: ['resultedWithPE'],
						where: {
							resultedWithPE: false
						},
					},
				],
			},
		],
		raw: true,
	});

	const mediansWithoutPE = {};

	for (const measure of measures) {
		const week = measure['medicalExamination.gestationalAgeByUltrasoundWeeks'];
		const { value } = measure;

		if (!mediansWithoutPE[week]) {
			mediansWithoutPE[week] = [];
		}

		mediansWithoutPE[week].push(value);
	}

	for (const week of Object.keys(mediansWithoutPE)) {
		mediansWithoutPE[week] = median(mediansWithoutPE[week]);
	}

	return { withoutPE: mediansWithoutPE };
};

export default {
	getMediansByWeeks,
	getEnumMeasurementById,
	getNumericalMeasurementById,
	getBooleanMeasurementById,
	createEnumMeasurement,
	createNumericalMeasurement,
	createBooleanMeasurement,
	updateMeasurements,
};
