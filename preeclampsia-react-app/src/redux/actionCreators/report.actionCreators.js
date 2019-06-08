import * as types from '../actionTypes';

export const generatePDF = ({ status, data }) => {
  return {
    data,
    status,
    type: types.GENERATE_PDF,
  };
};

export const updatePregnancyDataForReport = ({ status, data }) => {
  return {
    data,
    status,
    type: types.UPDATE_PREGNANCY_DATA_FOR_REPORT,
  };
};
