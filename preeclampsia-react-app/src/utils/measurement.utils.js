import { EnumMeasurementValues } from '../constants/enumMeasurement.constants';
import { formatDate } from './dateTime.utils';
import { getTranslations, getMeasurementTranslation } from './translation.utils';

export const exists = (measurement) => (measurement !== null && measurement !== undefined)
  && (measurement.value !== null && measurement.value !== undefined);

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
  return exists(measurement)
    ? (measurement.value ? translations.word.yes : translations.word.no)
    : translations.word.unknown;
};

export const displayNumericalMeasurementValue = (measurement, unit) => {
  const translations = getTranslations();
  return exists(measurement)
    ? `${measurement.value} ${unit ? unit : ''}`
    : translations.word.unknown;
};

export const displayEnumMeasurementValue = (measurement) => {
  const translations = getTranslations();
  const measurementValue = EnumMeasurementValues[measurement.characteristicId][measurement.value];
  return exists(measurement)
    ? getMeasurementTranslation(measurementValue)
    : translations.word.unknown;
};
