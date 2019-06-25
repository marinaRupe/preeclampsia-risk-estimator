import * as types from './patient.actionTypes';

export const updatePatients = ({ status, data }) => {
	return {
		data,
		status,
		type: types.UPDATE_PATIENTS,
	};
};

export const updatePatientDetails = ({ status, data }) => {
	return {
		data,
		status,
		type: types.UPDATE_PATIENT_DETAILS,
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

export const editPatientDetails = ({ status, data }) => {
	return {
		data,
		status,
		type: types.EDIT_PATIENT_DETAILS,
	};
};
