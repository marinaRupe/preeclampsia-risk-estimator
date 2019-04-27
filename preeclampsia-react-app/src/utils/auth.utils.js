import * as values from '../constants/values';

export const getLoginDataFromLocalStorage = () => ({
  user: localStorage.getItem(values.USER),
  token: localStorage.getItem(values.TOKEN)
});

export const addLoginDataToLocalStorage = (user, token) => {
  localStorage.setItem(values.USER, user);
  localStorage.setItem(values.TOKEN, token);
};

export const removeLoginDataFromLocalStorage = () => {
  localStorage.removeItem(values.TOKEN);
};
