import history from '../history';
import { APP } from '../constants/routes';
import * as values from '../constants/values';

export const getToken = () => (localStorage.getItem(values.TOKEN));

export const setToken = (token) => {
  localStorage.setItem(values.TOKEN, token);
};

export const deleteToken = () => {
  localStorage.removeItem(values.TOKEN);
};
