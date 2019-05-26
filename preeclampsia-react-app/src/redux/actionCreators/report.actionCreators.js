import * as types from '../actionTypes';

export const generatePDF = ({ status, data }) => {
  return {
    data,
    status,
    type: types.GENERATE_PDF,
  };
};

export const fetchPregnancyDataForReport = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_PREGNANCY_DATA_FOR_REPORT,
  };
};
