import { EnumMeasurementValues } from '../constants/enumMeasurement.constants';
import { formatDate } from './dateTime.utils';
import { getTranslations, getMeasurementTranslation } from './translation.utils';

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
