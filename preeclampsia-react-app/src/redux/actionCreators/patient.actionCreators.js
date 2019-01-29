import * as types from '../actionTypes';

export const fetchPatients = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_PATIENTS,
  };
};

export const fetchPatientDetails = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_PATIENT_DETAILS,
  };
};

export const fetchPatientPregnancyDetails = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_PATIENT_PREGNANCY_DETAILS,
  };
};
