import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import patientReducer from './patient.reducer';
import pregnancyReducer from './pregnancy.reducer';

export default function rootReducer(asyncReducers) {
  return combineReducers({
    patients: patientReducer,
    pregnancy: pregnancyReducer,
    users: userReducer,
    ...asyncReducers,
  });
}
