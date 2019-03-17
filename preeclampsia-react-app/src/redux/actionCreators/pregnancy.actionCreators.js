import * as types from '../actionTypes';

export const fetchPatientPregnancyDetails = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_PATIENT_PREGNANCY_DETAILS,
  };
};

export const fetchPregnancyTrimesterDetails = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_PREGNANCY_TRIMESTER_DETAILS,
  };
};
