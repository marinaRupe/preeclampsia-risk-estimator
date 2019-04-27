import axios from 'axios';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API } from '../../constants/routes';
import { actionWrapper } from '../../utils/redux.utils';
import {
  addLoginDataToLocalStorage,
  removeLoginDataFromLocalStorage,
} from '../../utils/auth.utils';
import * as actionCreators from '../actionCreators/user.actionCreators';

export function fetchUserList(page = 1, pageSize = 10) {
  const action = async (dispatch) => {
    const resp = await axios.get(API.USERS.GET_ALL(page, pageSize));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchUsers({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function loginUser() {
  const action = async (dispatch) => {
    const resp = await axios.get(API.USERS.LOGIN);
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
  };
  return actionWrapper(action);
}
