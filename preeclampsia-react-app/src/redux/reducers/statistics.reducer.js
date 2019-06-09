import initialState from './initialState';
import * as types from '../actionTypes';
import { ACTION_STATUS } from 'enums/responseStatus.enums';

export default function statisticsReducer(state = initialState.statistics, action) {
	switch (action.type) {
	case types.UPDATE_MEDIANS_FOR_CHARACTERISTIC:
		if (action.status === ACTION_STATUS.SUCCESS) {
			return {
				...state,
				mediansForCharacteristics: {
					...state.mediansForCharacteristics,
					[action.data.characteristicId]: action.data.medians,
				},
			};
		}
		return { ...state };
	default:
		return { ...state };
	}
}
