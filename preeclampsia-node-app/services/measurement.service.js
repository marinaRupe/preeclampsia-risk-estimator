const { db } = require('../models');
const { median } = require('../utils/math.utils');
const { isDefined } = require('../utils/value.utils');
const { Characteristics, CharacteristicTypes } = require('../constants/characteristics.constants');

/**
 * Updates measurements in the database.
 * 
 * @param {number} medicalExaminationId Medical Examination ID
 * @param {[Object]} measurements Array of measurements data
 * @returns {Promise<[Object]>} Array of created measurement objects
 */
const updateMeasurements = async (medicalExaminationId, measurements) => (
  await Promise.all(Object.entries(measurements).map(async ([characteristicName, measurementData]) => {
    const characteristic = Characteristics[characteristicName];
    const {
      id,
      value,
      characteristicId,
    } = measurementData;

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

    if (isDefined(oldMeasurement) && isDefined(newMeasurement)) {
      await oldMeasurement.destroy();
    }

    return newMeasurement;
  }))
);

/**
 * Searches for an enum measurement by ID.
 * 
 * @param {number} id Enum measurement ID
 * @returns {Object} Enum measurement
 */
const getEnumMeasurementById = async (id) => await db.EnumMeasurement.findByPk(id);

/**
 * Searches for a numerical measurement by ID.
 * 
 * @param {number} id Numerical measurement ID
 * @returns {Object} Numerical measurement
 */
const getNumericalMeasurementById = async (id) => await db.NumericalMeasurement.findByPk(id);

/**
 * Searches for a boolean measurement by ID.
 * 
 * @param {number} id Boolean measurement ID
 * @returns {Object} Boolean measurement
 */
const getBooleanMeasurementById = async (id) => await db.BooleanMeasurement.findByPk(id);


const createEnumMeasurement = async (value, medicalExaminationId, characteristicId) => (
  await createMeasurement(value, medicalExaminationId, characteristicId, db.EnumMeasurement)
);

const createNumericalMeasurement = async (value, medicalExaminationId, characteristicId) => (
  await createMeasurement(value, medicalExaminationId, characteristicId, db.NumericalMeasurement)
);

const createBooleanMeasurement = async (value, medicalExaminationId, characteristicId) => (
  await createMeasurement(value, medicalExaminationId, characteristicId, db.BooleanMeasurement)
);

const createMeasurement = async (value, medicalExaminationId, characteristicId, measurementTable) => (
  await measurementTable.create({
    value: value,
    medicalExaminationId: medicalExaminationId,
    characteristicId: characteristicId,
  })
);

const getMediansByWeeks = async (characteristicId) => {
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

module.exports = {
  getMediansByWeeks,
  getEnumMeasurementById,
  getNumericalMeasurementById,
  getBooleanMeasurementById,
  createEnumMeasurement,
  createNumericalMeasurement,
  createBooleanMeasurement,
  updateMeasurements,
};
