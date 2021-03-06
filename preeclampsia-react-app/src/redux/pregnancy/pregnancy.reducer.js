import { ACTION_STATUS } from 'enums/responseStatus.enums';
import initialState from '../store/initialState';
import * as types from './pregnancy.actionTypes';

export default function pregnancyReducer(state = initialState.pregnancy, action) {
	switch (action.type) {
	case types.UPDATE_PREGNANCY_DETAILS:
		if (action.status === ACTION_STATUS.SUCCESS) {
			return {
				...state,
				details: action.data,
			};
		}
		return { ...state };
	case types.EDIT_PREGNANCY:
		if (action.status === ACTION_STATUS.SUCCESS) {
			return {
				...state,
				details: {
					...state.details,
					...action.data,
				},
			};
		}
		return { ...state };
	case types.UPDATE_MEDICAL_EXAMINATIONS_FOR_PREGNANCY:
		if (action.status === ACTION_STATUS.SUCCESS) {
			return {
				...state,
				medicalExaminations: action.data,
			};
		}
		return { ...state };
	case types.UPDATE_MEDICAL_EXAMINATION_DETAILS:
		if (action.status === ACTION_STATUS.SUCCESS) {
			return {
				...state,
				medicalExaminations: state.medicalExaminations.map(m => m.id === action.data.id ? action.data : m),
			};
		}
		return { ...state };
	case types.ADD_MEDICAL_EXAMINATION:
		if (action.status === ACTION_STATUS.SUCCESS) {
			return {
				...state,
				medicalExaminations: [...state.medicalExaminations, action.data],
			};
		}
		return { ...state };
	case types.EDIT_MEDICAL_EXAMINATION:
		if (action.status === ACTION_STATUS.SUCCESS) {
			return {
				...state,
				medicalExaminations: state.medicalExaminations.map(m => m.id === action.data.id ? action.data : m),
			};
		}
		return { ...state };
	default:
		return { ...state };
	}
}
