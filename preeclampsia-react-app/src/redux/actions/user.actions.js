import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { APP, API } from '../../constants/routes';
import { actionWrapper } from '../../utils/redux.utils';
import {
  addLoginDataToLocalStorage,
  removeLoginDataFromLocalStorage,
} from '../../utils/auth.utils';
import * as httpCalls from '../../utils/http.utils';
import history from '../../history';
import * as actionCreators from '../actionCreators/user.actionCreators';

export function fetchUserList(page = 1, pageSize = 10, sortColumn, sortDirection) {
  const action = async (dispatch) => {
    const resp = await httpCalls.GET(API.USERS.GET_ALL(page, pageSize, sortColumn, sortDirection));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchUsers({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function loginUser(userData) {
  const action = async (dispatch) => {
    const body = {
      email: userData.email,
      password: userData.password,
    };

    const resp = await httpCalls.POST(API.USERS.LOGIN(), body);
    if (resp.status === 200) {
      const { user, token } = resp.data;
      addLoginDataToLocalStorage(user, token);
      await dispatch(actionCreators.loginUser({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function logoutUser() {
  const action = async (dispatch) => {
    removeLoginDataFromLocalStorage();
    await dispatch(actionCreators.logoutUser({ status: ACTION_STATUS.SUCCESS }));
    window.location.reload();
  };
  return actionWrapper(action);
}
