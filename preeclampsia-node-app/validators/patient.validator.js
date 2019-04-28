const { RacialOriginTypes } = require('../constants/patient.constants');
const PatientService = require('../services/patient.service');
const { addToArray } = require('../utils/array.utils');

const isValidPatient = async (user) => {
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
    errors.firstName = addToArray(errors.firstName, 'First name is required');
  }

  if (!lastName) {
    errors.lastName = addToArray(errors.lastName, 'Last name is required');
  }

  if (!birthDate) {
    errors.birthDate = addToArray(errors.birthDate, 'Birth date is required');
  }

  if (!racialOrigin) {
    errors.racialOrigin = addToArray(errors.racialOrigin, 'Racial origin is required');
  } else {
    const racialOriginExists = racialOriginTypes.includes(racialOrigin);
    if (!racialOriginExists) {
      errors.racialOrigin = addToArray(errors.racialOrigin, 'Racial origin does not exist');
    }
  }

  if (!MBO) {
    errors.MBO = addToArray(errors.MBO, 'MBO is required');
  } else if (await PatientService.existsPatientWithMBO(MBO)) {
    errors.MBO = addToArray(errors.MBO, 'Patient with this MBO already exists');
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
