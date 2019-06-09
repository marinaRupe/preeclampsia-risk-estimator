import { PregnancyTypes, ConceptionMethods } from 'constants/pregnancy.constants';

export const ConceptionMethodEnum = {
  Spontaneous: ConceptionMethods.Spontaneous.key,
  OvulationDrugs: ConceptionMethods.OvulationDrugs.key,
  InVitroFertilization: ConceptionMethods.InVitroFertilization.key,
};

export const PregnancyTypeEnum = {
  Singleton: PregnancyTypes.Singleton.key,
  Twins: PregnancyTypes.Twins.key,
};

export default {
  PregnancyTypeEnum,
  ConceptionMethodEnum,
};