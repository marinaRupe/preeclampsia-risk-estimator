import * as types from '../actionTypes';

export const updatePregnancyDetails = ({ status, data }) => {
  return {
    data,
    status,
    type: types.UPDATE_PREGNANCY_DETAILS,
  };
};

export const addPregnancy = ({ status, data }) => {
  return {
    data,
    status,
    type: types.ADD_PREGNANCY,
  };
};

export const editPregnancy = ({ status, data }) => {
  return {
    data,
    status,
    type: types.EDIT_PREGNANCY,
  };
};

export const addMedicalExamination = ({ status, data }) => {
  return {
    data,
    status,
    type: types.ADD_MEDICAL_EXAMINATION,
  };
};

export const editMedicalExamination = ({ status, data }) => {
  return {
    data,
    status,
    type: types.EDIT_MEDICAL_EXAMINATION,
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
