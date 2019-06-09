const { RacialOriginTypes } = require('constants/patient.constants');
const PatientService = require('services/patient.service');
const { addToArray } = require('utils/array.utils');
const { isDefined } = require('utils/value.utils');

const isValidPatient = async (user, translations, editMode = false) => {
  const {
    MBO,
    firstName,
    lastName,
    birthDate,
    racialOrigin,
  } = user;

  const racialOriginTypes = Object.values(RacialOriginTypes).map(r => r.key);

  const errors = {};

  if (!isDefined(firstName)) {
    errors.firstName = addToArray(errors.firstName, translations.firstNameRequired);
  }

  if (!isDefined(lastName)) {
    errors.lastName = addToArray(errors.lastName, translations.lastNameRequired);
  }

  if (!isDefined(birthDate)) {
    errors.birthDate = addToArray(errors.birthDate, translations.birthDateRequired);
  }

  if (!isDefined(racialOrigin)) {
    errors.racialOrigin = addToArray(errors.racialOrigin, translations.racialOriginRequired);
  } else {
    const racialOriginExists = racialOriginTypes.includes(racialOrigin);
    if (!racialOriginExists) {
      errors.racialOrigin = addToArray(errors.racialOrigin, translations.racialOriginNotExist);
    }
  }

  if (!isDefined(MBO)) {
    errors.MBO = addToArray(errors.MBO, translations.MBORequired);
  }

  if (!editMode) {
    if (MBO && await PatientService.existsPatientWithMBO(MBO)) {
      errors.MBO = addToArray(errors.MBO, translations.patientWithMBOExist);
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    errors,
  };
};

module.exports = {
  isValidPatient,
};
