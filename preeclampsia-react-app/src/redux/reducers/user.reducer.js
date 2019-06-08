import initialState from './initialState';
import * as types from '../actionTypes';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
  case types.UPDATE_USERS:
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
  case types.EDIT_USER:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        list: {
          ...state.list,
          data: state.list.data.map(u => (u.id === action.data.id) ? { ...u, ...action.data } : u)
        },
      };
    }
    return { ...state };
  case types.USER_LOGIN:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        auth: {
          loggedIn: true,
          currentUser: action.data,
        },
      };
    }
    return { ...state };
  case types.USER_LOGOUT:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        auth: {
          loggedIn: false,
          currentUser: null,
        },
      };
    }
    return { ...state };
  default:
    return { ...state };
  }
}
