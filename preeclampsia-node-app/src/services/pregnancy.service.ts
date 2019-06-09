import { db } from 'models/index';

const existWithId = async (id: number): Promise<boolean> => !!(await getById(id));

const getById = async (id: number) => await db.Pregnancy.findByPk(id);

const getDetails = async (patientId: number, pregnancyNumber: number) => (
  await db.Pregnancy.findOne({
    where: {
      patientId,
      pregnancyNumber
    },
  })
);

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

const updatePregnancy = async (id: number, pregnancyData) => {
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

  const pregnancy = await getById(id);

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

const removePregnancy = async (id: number) => {
  const pregnancy = await getById(id);

  return await pregnancy.destroy();
};

export default {
  getById,
  getDetails,
  existWithId,
  createPregnancy,
  updatePregnancy,
  removePregnancy,
};
