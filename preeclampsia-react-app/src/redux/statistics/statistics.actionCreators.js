import * as types from './statistics.actionTypes';

export const updateMediansForCharacteristic = ({ status, data }) => {
	return {
		data,
		status,
		type: types.UPDATE_MEDIANS_FOR_CHARACTERISTIC,
	};
};
