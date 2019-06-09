const { Characteristics } = require('./characteristics.constants');
const { DiabetesTypes, HypertensionTypes } = require('./measurements.constants');
const { PregnancyTypes, ConceptionMethods } = require('./pregnancy.constants');
const { RacialOriginTypes } = require('./patient.constants');

const diabetesTypes = Object.values(DiabetesTypes).reduce((obj, value) => {
  obj[value.key] = value;
  return obj;
}, {});

const hypertensionTypes = Object.values(HypertensionTypes).reduce((obj, value) => {
  obj[value.key] = value;
  return obj;
}, {});

const pregnancyTypes = Object.values(PregnancyTypes).reduce((obj, value) => {
  obj[value.key] = value;
  return obj;
}, {});

const conceptionMethods = Object.values(ConceptionMethods).reduce((obj, value) => {
  obj[value.key] = value;
  return obj;
}, {});

const racialOriginTypes = Object.values(RacialOriginTypes).reduce((obj, value) => {
  obj[value.key] = value;
  return obj;
}, {});

const EnumMeasurementValues = {
  [Characteristics.DiabetesType.key]: diabetesTypes,
  [Characteristics.HypertensionType.key]: hypertensionTypes,
  [Characteristics.PregnancyType.key]: pregnancyTypes,
  [Characteristics.ConceptionMethod.key]: conceptionMethods,
  [Characteristics.RacialOrigin.key]: racialOriginTypes,
};

module.exports = {
  EnumMeasurementValues,
};
