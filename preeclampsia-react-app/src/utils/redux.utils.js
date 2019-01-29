import { APP } from '../constants/routes';
import history from '../history';

export function errorHandler(error) {
  if (error.status === 404) {
    history.push(APP.NOT_FOUND_ERROR);
    return;
  }
  throw error;
}

export function actionWrapper(action) {
  return async (dispatch) => {
    try {
      await action(dispatch);
    } catch (error) {
      errorHandler(error);
    }
  };
}
