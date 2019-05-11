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

export const addPatient = ({ status, data }) => {
  return {
    data,
    status,
    type: types.ADD_PATIENT,
  };
};

export const editPatient = ({ status, data }) => {
  return {
    data,
    status,
    type: types.EDIT_PATIENT,
  };
};

export const deletePatient = ({ status, data }) => {
  return {
    data,
    status,
    type: types.DELETE_PATIENT,
  };
};
