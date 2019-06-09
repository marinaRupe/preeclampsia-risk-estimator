import { RacialOriginTypes } from 'constants/patient.constants';
import PatientService from 'services/patient.service';
import { addToArray } from 'utils/array.utils';
import { isDefined } from 'utils/value.utils';

const isValidPatient = async (user, translations, editMode = false) => {
  const {
    MBO,
    firstName,
    lastName,
    birthDate,
    racialOrigin,
  } = user;

  const racialOriginTypes = Object.values(RacialOriginTypes).map(r => r.key);

  const errors = {} as any;

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

export default {
  isValidPatient,
};
