import initialState from './initialState';
import * as types from '../actionTypes';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';

export default function patientReducer(state = initialState.patients, action) {
  switch (action.type) {
  case types.FETCH_PATIENTS:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        list: {
          ...state.list,
          data: action.data.data,
          page: action.data.page,
          totalPages: action.data.totalPages,
          totalResults: action.data.totalResults,
        },
      };
    }
    return { ...state };
  case types.FETCH_PATIENT_DETAILS:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        patientDetails: {
          ...state.patientDetails,
          ...action.data,
        },
      };
    }
    return { ...state };
  case types.FETCH_PATIENT_PREGNANCY_DETAILS:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        pregnancyDetails: {
          ...state.pregnancyDetails,
          ...action.data,
        },
      };
    }
    return { ...state };
  default:
    return { ...state };
  }
}
