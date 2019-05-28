import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user.reducer';
import patientReducer from './patient.reducer';
import pregnancyReducer from './pregnancy.reducer';
import reportReducer from './report.reducer';
import statisticsReducer from './statistics.reducer';

export default function rootReducer(asyncReducers) {
  return combineReducers({
    patients: patientReducer,
    pregnancy: pregnancyReducer,
    users: userReducer,
    reports: reportReducer,
    statistics: statisticsReducer,
    form: formReducer,
    ...asyncReducers,
  });
}
