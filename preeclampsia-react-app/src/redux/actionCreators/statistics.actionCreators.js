import * as types from '../actionTypes';

export const updateMediansForCharacteristic = ({ status, data }) => {
	return {
		data,
		status,
		type: types.UPDATE_MEDIANS_FOR_CHARACTERISTIC,
	};
};
