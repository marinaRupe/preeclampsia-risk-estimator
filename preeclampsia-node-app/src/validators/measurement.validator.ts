import { Characteristics, CharacteristicTypes } from 'constants/characteristics.constants';
import { EnumMeasurementValues } from 'constants/enumMeasurement.constants';
import { addToArray } from 'utils/array.utils';
import { isDefined, isNumber, isBoolean } from 'utils/value.utils';

const isValidMeasurement = async (characteristicName, measurement, translations) => {
  const {
    id,
    value,
    medicalExaminationId,
    characteristicId,
  } = measurement;
  
  const characteristic = Characteristics[characteristicName];

  const errors = {} as any;

  if (!isDefined(characteristicId)) {
    errors.value = addToArray(errors.value, translations.characteristicIdRequired);
  }

  if (isDefined(value)) {
    if (characteristic.type === CharacteristicTypes.Enum) {
      if (!isNumber(value)) {
        errors.value = addToArray(errors.value, translations.invalidValue);
      } else if (!isDefined(EnumMeasurementValues[characteristicId][value])) {
        errors.value = addToArray(errors.value, translations.invalidValue);
      }
    } else if (characteristic.type === CharacteristicTypes.Numerical) {
      if (!isNumber(value)) {
        errors.value = addToArray(errors.value, translations.valueMustBeNumber);
      }
    } else if (characteristic.type === CharacteristicTypes.Boolean) {
      if (!isBoolean(value)) {
        errors.value = addToArray(errors.value, translations.invalidValue);
      }
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    errors,
  };
};

export default {
  isValidMeasurement,
};
