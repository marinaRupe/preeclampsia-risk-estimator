import initialState from './initialState';
import * as types from '../actionTypes';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';

export default function pregnancyReducer(state = initialState.pregnancy, action) {
  switch (action.type) {
  case types.FETCH_PATIENT_PREGNANCY_DETAILS:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        details: action.data,
      };
    }
    return { ...state };
  case types.FETCH_PREGNANCY_TRIMESTER_DETAILS:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        trimesters: {
          ...state.trimesters,
          ...action.data,
        },
      };
    }
    return { ...state };
  default:
    return { ...state };
  }
}
