import * as types from '../actionTypes';

export const generatePDF = ({ status, data }) => {
  return {
    data,
    status,
    type: types.GENERATE_PDF,
  };
};
