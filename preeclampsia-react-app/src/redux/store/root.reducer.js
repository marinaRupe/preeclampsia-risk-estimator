import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from '../users/user.reducer';
import patientReducer from '../patients/patient.reducer';
import pregnancyReducer from '../pregnancy/pregnancy.reducer';
import reportReducer from '../reports/report.reducer';
import statisticsReducer from '../statistics/statistics.reducer';

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
