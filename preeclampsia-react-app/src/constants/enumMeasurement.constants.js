import { Characteristics } from './characteristics.constants';
import { DiabetesTypes, HypertensionTypes } from './measurements.constants';
import { PregnancyTypes, ConceptionMethods } from './pregnancy.constants';
import { RacialOriginTypes } from './patient.constants';

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

export const EnumMeasurementValues = {
	[Characteristics.DiabetesType.key]: diabetesTypes,
	[Characteristics.HypertensionType.key]: hypertensionTypes,
	[Characteristics.PregnancyType.key]: pregnancyTypes,
	[Characteristics.ConceptionMethod.key]: conceptionMethods,
	[Characteristics.RacialOrigin.key]: racialOriginTypes,
};
