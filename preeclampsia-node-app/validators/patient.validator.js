const { RacialOriginTypes } = require('../constants/patient.constants');
const PatientService = require('../services/patient.service');
const { addToArray } = require('../utils/array.utils');

const isValidPatient = async (user, translations) => {
  const {
    MBO,
    firstName,
    lastName,
    birthDate,
    racialOrigin,
  } = user;

  const racialOriginTypes = Object.values(RacialOriginTypes).map(r => r.hr);

  const errors = {};

  if (!firstName) {
    errors.firstName = addToArray(errors.firstName, translations.firstNameRequired);
  }

  if (!lastName) {
    errors.lastName = addToArray(errors.lastName, translations.lastNameRequired);
  }

  if (!birthDate) {
    errors.birthDate = addToArray(errors.birthDate, translations.birthDateRequired);
  }

  if (!racialOrigin) {
    errors.racialOrigin = addToArray(errors.racialOrigin, translations.racialOriginRequired);
  } else {
    const racialOriginExists = racialOriginTypes.includes(racialOrigin);
    if (!racialOriginExists) {
      errors.racialOrigin = addToArray(errors.racialOrigin, translations.racialOriginNotExist);
    }
  }

  if (!MBO) {
    errors.MBO = addToArray(errors.MBO, translations.MBORequired);
  } else if (await PatientService.existsPatientWithMBO(MBO)) {
    errors.MBO = addToArray(errors.MBO, translations.patientWithMBOExist);
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
