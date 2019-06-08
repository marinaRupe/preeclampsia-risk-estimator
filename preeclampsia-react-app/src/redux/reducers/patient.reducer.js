import initialState from './initialState';
import * as types from '../actionTypes';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';

export default function patientReducer(state = initialState.patients, action) {
  switch (action.type) {
  case types.UPDATE_PATIENTS:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        list: {
          ...state.list,
          data: action.data.data,
          page: action.data.page,
          pageSize: action.data.pageSize,
          totalPages: action.data.totalPages,
          totalCount: action.data.totalCount,
        },
      };
    }
    return { ...state };
  case types.UPDATE_PATIENT_DETAILS:
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
  case types.EDIT_PATIENT_DETAILS:
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
  case types.EDIT_PATIENT:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        list: {
          ...state.list,
          data: state.list.data.map(p => (p.id === action.data.id) ? { ...p, ...action.data } : p)
        },
      };
    }
    return { ...state };
  default:
    return { ...state };
  }
}
