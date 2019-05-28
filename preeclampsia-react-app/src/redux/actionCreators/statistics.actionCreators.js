import * as types from '../actionTypes';

export const fetchMediansForCharacteristic = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_MEDIANS_FOR_CHARACTERISTIC,
  };
};
