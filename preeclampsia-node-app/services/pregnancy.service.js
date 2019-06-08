const { db } = require('../models');

const existWithId = async (id) => !!(await getById(id));

const getById = async (id) => await db.Pregnancy.findByPk(id);

const getDetails = async (patientId, pregnancyNumber) => await db.Pregnancy.findOne({
  where: {
    patientId,
    pregnancyNumber
  },
});

const createPregnancy = async (pregnancyData) => {
  const {
    gynecologist,
    pregnancyNumber,
    pregnancyType,
    conceptionMethod,
    lastPeriodDate,
    lastPeriodDateIsReliable,
    deliveryDate,
    birthWeight,
    birthLength,
    numberOfPreviousPregnancies,
    numberOfPreviousBirths,
    hadPEInPreviousPregnancy,
    resultedWithPE,
  } = pregnancyData;

  const pregnancy = await db.Pregnancy.create({
    gynecologist,
    pregnancyNumber,
    pregnancyType,
    conceptionMethod,
    lastPeriodDate,
    lastPeriodDateIsReliable,
    deliveryDate,
    birthWeight,
    birthLength,
    numberOfPreviousPregnancies,
    numberOfPreviousBirths,
    hadPEInPreviousPregnancy,
    resultedWithPE,
  });

  return pregnancy;
};

const updatePregnancy = async (pregnancyId, pregnancyData) => {
  const {
    gynecologist,
    pregnancyNumber,
    pregnancyType,
    conceptionMethod,
    lastPeriodDate,
    lastPeriodDateIsReliable,
    deliveryDate,
    birthWeight,
    birthLength,
    numberOfPreviousPregnancies,
    numberOfPreviousBirths,
    hadPEInPreviousPregnancy,
    resultedWithPE,
  } = pregnancyData;

  const pregnancy = await getById(pregnancyId);

  return await pregnancy.update({
    gynecologist,
    pregnancyNumber,
    pregnancyType,
    conceptionMethod,
    lastPeriodDate,
    lastPeriodDateIsReliable,
    deliveryDate,
    birthWeight,
    birthLength,
    numberOfPreviousPregnancies,
    numberOfPreviousBirths,
    hadPEInPreviousPregnancy,
    resultedWithPE,
  });
};

const removePregnancy = async (pregnancyId) => {
  const pregnancy = await getById(pregnancyId);

  return await pregnancy.destroy();
};

module.exports = {
  getById,
  getDetails,
  existWithId,
  createPregnancy,
  updatePregnancy,
  removePregnancy,
};
