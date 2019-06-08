import * as types from '../actionTypes';

export const updatePatientPregnancyDetails = ({ status, data }) => {
  return {
    data,
    status,
    type: types.UPDATE_PATIENT_PREGNANCY_DETAILS,
  };
};

export const updateMedicalExaminationsForPregnancy = ({ status, data }) => {
  return {
    data,
    status,
    type: types.UPDATE_MEDICAL_EXAMINATIONS_FOR_PREGNANCY,
  };
};

export const updateMedicalExaminationDetails = ({ status, data }) => {
  return {
    data,
    status,
    type: types.UPDATE_MEDICAL_EXAMINATION_DETAILS,
  };
};
