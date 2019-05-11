import { Characteristics } from './characteristics.constants';
import { DiabetesTypes, HypertensionTypes } from './measurements.constants';
import { PregnancyTypes, ConceptionMethods } from './pregnancy.constants';

const diabetesTypes = Object.entries(DiabetesTypes).reduce((obj, [key, value]) => {
  obj[value.key] = value;
  return obj;
}, {});

const hypertensionTypes = Object.entries(HypertensionTypes).reduce((obj, [key, value]) => {
  obj[value.key] = value;
  return obj;
}, {});

const pregnancyTypes = Object.entries(PregnancyTypes).reduce((obj, [key, value]) => {
  obj[value.key] = value;
  return obj;
}, {});

const conceptionMethods = Object.entries(ConceptionMethods).reduce((obj, [key, value]) => {
  obj[value.key] = value;
  return obj;
}, {});

export const EnumMeasurementValues = {
  [Characteristics.DiabetesType.key]: diabetesTypes,
  [Characteristics.HypertensionType.key]: hypertensionTypes,
  [Characteristics.PregnancyType.key]: pregnancyTypes,
  [Characteristics.ConceptionMethod.key]: conceptionMethods,
};
