import { SubmissionError } from 'redux-form';
import { APP } from 'constants/routes';
import history from '../history';

export function errorHandler(error) {
  if (error.status === 404) {
    history.push(APP.NOT_FOUND_ERROR);
    return;
  }
  throw error;
}

export function submissionErrorHandler(error) {
  const validationErrors = error.errors || {};
  throw new SubmissionError({ _error: error.message, ...validationErrors });
}

export function actionWrapper(action, formSubmission = false) {
  return async (dispatch) => {
    try {
      return await action(dispatch);
    } catch (error) {
      if (error.response) {
        if (formSubmission) {
          submissionErrorHandler(error.response.data);
        } else {
          errorHandler(error.response);
        }
      } else if (error.request) {
        errorHandler(error.request);
      } else {
        errorHandler(error);
      }
    }
  };
}
