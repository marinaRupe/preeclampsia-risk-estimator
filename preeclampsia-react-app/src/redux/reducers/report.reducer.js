import initialState from './initialState';
import * as types from '../actionTypes';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';

export default function reportReducer(state = initialState.reports, action) {
  switch (action.type) {
  case types.UPDATE_PREGNANCY_DATA_FOR_REPORT:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        pregnancyDataForReport: action.data,
      };
    }
    return { ...state };
  default:
    return { ...state };
  }
}
