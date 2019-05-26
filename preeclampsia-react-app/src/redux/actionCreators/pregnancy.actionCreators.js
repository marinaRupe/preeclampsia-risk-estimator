import * as types from '../actionTypes';

export const fetchPatientPregnancyDetails = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_PATIENT_PREGNANCY_DETAILS,
  };
};

export const fetchMedicalExaminationsForPregnancy = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_MEDICAL_EXAMINATIONS_FOR_PREGNANCY,
  };
};
