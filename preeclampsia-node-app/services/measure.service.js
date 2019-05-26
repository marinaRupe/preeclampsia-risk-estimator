const { db } = require('../models');
const { median } = require('../utils/math.utils');

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
              resultedWithPE: {
                [db.Sequelize.Op.ne]: null
              }
            }
          },
        ],
      },
    ],
    raw: true,
  });

  const mediansWithoutPE = {};
  const mediansWithPE = {};

  for (const measure of measures) {
    const resultedWithPE = measure['medicalExamination.pregnancy.resultedWithPE'];
    const week = measure['medicalExamination.gestationalAgeByUltrasoundWeeks'];
    const { value } = measure;

    if (resultedWithPE === true) {
      if (!mediansWithPE[week]) {
        mediansWithPE[week] = [];
      }

      mediansWithPE[week].push(value);
    }

    if (resultedWithPE === false) {
      if (!mediansWithoutPE[week]) {
        mediansWithoutPE[week] = [];
      }

      mediansWithoutPE[week].push(value);
    }
  }

  for (const week of Object.keys(mediansWithoutPE)) {
    mediansWithoutPE[week] = median(mediansWithoutPE[week]);
  }

  for (const week of Object.keys(mediansWithPE)) {
    mediansWithPE[week] = median(mediansWithPE[week]);
  }

  return { withPe: mediansWithPE, withoutPE: mediansWithoutPE };
};

module.exports = {
  getMediansByWeeks,
};
