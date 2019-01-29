import { combineReducers } from 'redux';
import userReducer from './userReducer';
import patientReducer from './patientReducer';

export default function rootReducer(asyncReducers) {
  return combineReducers({
    patients: patientReducer,
    users: userReducer,
    ...asyncReducers,
  });
}
