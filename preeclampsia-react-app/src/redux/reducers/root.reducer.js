import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user.reducer';
import patientReducer from './patient.reducer';
import pregnancyReducer from './pregnancy.reducer';
import reportReducer from './report.reducer';

export default function rootReducer(asyncReducers) {
  return combineReducers({
    patients: patientReducer,
    pregnancy: pregnancyReducer,
    users: userReducer,
    reports: reportReducer,
    form: formReducer,
    ...asyncReducers,
  });
}
