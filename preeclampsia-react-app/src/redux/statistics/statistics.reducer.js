import { ACTION_STATUS } from 'enums/responseStatus.enums';
import initialState from '../store/initialState';
import * as types from './statistics.actionTypes';

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
