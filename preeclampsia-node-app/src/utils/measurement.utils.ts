import { isDefined } from './value.utils.js';
import { EnumMeasurementValues } from 'constants/enumMeasurement.constants';

/**
 * Returns the measurement's value or null if it is not defined.
 */
export const getMeasurementValue = (measurement) => {
  return (isDefined(measurement) && isDefined(measurement.value))
    ? measurement.value
    : (isDefined(measurement) ? measurement : null);
};

/**
 * Returns the measurements's translation for the specified language.
 */
export const getMeasurementTranslation = (measurement, language: string): string => {
  return measurement[language];
};

/**
 * Returns the characteristic's translation for the specified language.
 */
export const getCharacteristicTranslation = (characteristic, language: string): string => {
  return characteristic[language].display;
};

/**
 * Returns the boolean measurement display.
 */
export const displayBooleanMeasurementValue = (measurement, translations): string => {
  if (isDefined(measurement)) {
    const measurementValue = getMeasurementValue(measurement);
    return (measurementValue ? translations.word.yes : translations.word.no);
  }

  return translations.word.unknown;
};

/**
  * Returns the numerical measurement display.
  */
export const displayNumericalMeasurementValue = (measurement, unit: string, translations): string => {
  if (isDefined(measurement)) {
    const measurementValue = getMeasurementValue(measurement);
    return `${measurementValue} ${unit ? unit : ''}`;
  }

  return translations.word.unknown;
};

/**
 * Returns the enum measurement display.
 */
export const displayEnumMeasurementValue = (
  measurement, characteristicId: number, translations, language: string
): string => {
  if (isDefined(measurement)) {
    const measurementValue = getMeasurementValue(measurement);
    const enumValue = EnumMeasurementValues[characteristicId][measurementValue];
    return getMeasurementTranslation(enumValue, language);
  }

  return translations.word.unknown;
};

export default {
  getMeasurementValue,
  displayBooleanMeasurementValue,
  displayNumericalMeasurementValue,
  displayEnumMeasurementValue,
  getMeasurementTranslation,
  getCharacteristicTranslation,
};
