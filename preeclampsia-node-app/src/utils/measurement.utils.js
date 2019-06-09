const { isDefined } = require('./value.utils.js');
const { formatDate } = require('./dateTime.utils');
const { EnumMeasurementValues } = require('constants/enumMeasurement.constants');

const getMeasurementValue = (measurement) => {
  return (isDefined(measurement) && isDefined(measurement.value))
    ? measurement.value
    : (isDefined(measurement) ? measurement : null);
};

const getMeasurementTranslation = (measurement, language) => {
  return measurement[language];
};

const getCharacteristicTranslation = (characteristic, language) => {
  return characteristic[language].display;
};

const displayDateMeasured = (measurement) => (
  isDefined(measurement) ? formatDate(measurement.dateMeasured) : '-'
);

/**
 * Return the boolean measurement display.
 * 
 * @param {object|string} measurement A boolean measurement
 * @param {object} translations The translations object
 * @returns {string} The boolean measurement display
 */
const displayBooleanMeasurementValue = (measurement, translations) => {
  if (isDefined(measurement)) {
    const measurementValue = getMeasurementValue(measurement);
    return (measurementValue ? translations.word.yes : translations.word.no);
  }

  return translations.word.unknown;
};

/**
  * Return the numerical measurement display.
  * 
  * @param {object|string} measurement A numerical measurement
  * @param {string} unit 
  * @param {object} translations The translations object
  * @returns {string} The numerical measurement display
  */
const displayNumericalMeasurementValue = (measurement, unit, translations) => {
  if (isDefined(measurement)) {
    const measurementValue = getMeasurementValue(measurement);
    return `${measurementValue} ${unit ? unit : ''}`;
  }

  return translations.word.unknown;
};

/**
 * Return the enum measurement display.
 * 
 * @param {object|string} measurement An enum measurement
 * @param {number} characteristicId The measurement's characteristic ID
 * @param {object} translations The translations object
 * @param {string} language The language used for translations
 * @returns {string} The enum measurement display
 */
const displayEnumMeasurementValue = (measurement, characteristicId, translations, language) => {
  if (isDefined(measurement)) {
    const measurementValue = getMeasurementValue(measurement);
    const enumValue = EnumMeasurementValues[characteristicId][measurementValue];
    return getMeasurementTranslation(enumValue, language);
  }

  return translations.word.unknown;
};

module.exports = {
  getMeasurementValue,
  displayDateMeasured,
  displayBooleanMeasurementValue,
  displayNumericalMeasurementValue,
  displayEnumMeasurementValue,
  getMeasurementTranslation,
  getCharacteristicTranslation,
};
