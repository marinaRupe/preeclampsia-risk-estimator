import { EnumMeasurementValues } from '../constants/enumMeasurement.constants';
import { formatDate } from './dateTime.utils';
import { getLanguage, getTranslations, getMeasurementTranslation } from './translation.utils';
import { generateOptions } from './form.utils';

export const exists = (measurement) => (measurement !== null && measurement !== undefined);

export const displayDateMeasured = (measurement) => (
  exists(measurement) ? formatDate(measurement.dateMeasured) : '-'
);

export const displayBooleanValue = (measurement) => {
  const translations = getTranslations();
  return (
    (measurement !== null && measurement !== undefined)
      ? (measurement ? translations.word.yes : translations.word.no)
      : translations.word.unknown
  );
};

export const displayBooleanMeasurementValue = (measurement) => {
  const translations = getTranslations();

  if (exists(measurement)) {
    const measurementValue = exists(measurement.value) ? measurement.value : measurement;
    return (measurementValue ? translations.word.yes : translations.word.no);
  }

  return translations.word.unknown;
};

export const displayNumericalMeasurementValue = (measurement, unit) => {
  const translations = getTranslations();

  if (exists(measurement)) {
    const measurementValue = exists(measurement.value) ? measurement.value : measurement;
    return `${measurementValue} ${unit ? unit : ''}`;
  }

  return translations.word.unknown;
};

export const displayEnumMeasurementValue = (measurement, characteristicId) => {
  const translations = getTranslations();

  if (exists(measurement)) {
    const measurementValue = exists(measurement.value) ? measurement.value : measurement;
    const enumValue = EnumMeasurementValues[characteristicId][measurementValue];
    return getMeasurementTranslation(enumValue);
  }

  return translations.word.unknown;
};

export const getBooleanMeasurementOptions = () => {
  const translations = getTranslations();
  const booleanValues = [
    {
      key: 1,
      value: true,
      name: translations.word.yes,
    },
    {
      key: 2,
      value: false,
      name: translations.word.no,
    },
  ];

  return generateOptions(booleanValues, 'key', 'value', 'name', true, translations.word.unknown);
};

export const getEnumMeasurementOptions = (characteristicId) => {
  const language = getLanguage();
  const translations = getTranslations();
  const enumValues = Object.values(EnumMeasurementValues[characteristicId]);

  return generateOptions(enumValues, 'key', 'key', language, true, translations.word.unknown);
};

export const extractMeasurementsInitialValues = (
  measurements,
  booleanCharacteristics = [],
  enumCharacteristics = [],
  numericalCharacteristics = []
) => {
  const {
    booleanMeasurements,
    enumMeasurements,
    numericalMeasurements
  } = measurements;

  const initialValues = {};

  for (const characteristic of booleanCharacteristics) {
    if (booleanMeasurements[characteristic]) {
      initialValues[characteristic] = booleanMeasurements[characteristic];
    }
  }

  for (const characteristic of enumCharacteristics) {
    if (enumMeasurements[characteristic]) {
      initialValues[characteristic] = enumMeasurements[characteristic];
    }
  }

  for (const characteristic of numericalCharacteristics) {
    if (numericalMeasurements[characteristic]) {
      initialValues[characteristic] = numericalMeasurements[characteristic];
    }
  }

  return initialValues;
};
