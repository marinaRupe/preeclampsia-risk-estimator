const { PregnancyTypes, ConceptionMethods } = require('../constants/pregnancy.constants');

const ConceptionMethodEnum = {
  Spontaneous: ConceptionMethods.Spontaneous.key,
  OvulationDrugs: ConceptionMethods.OvulationDrugs.key,
  InVitroFertilization: ConceptionMethods.InVitroFertilization.key,
};

const PregnancyTypeEnum = {
  Singleton: PregnancyTypes.Singleton.key,
  Twins: PregnancyTypes.Twins.key,
};

module.exports = {
  PregnancyTypes,
  PregnancyTypeEnum,
  ConceptionMethodEnum,
};