import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API } from '../../constants/routes';
import { actionWrapper } from '../../utils/redux.utils';
import * as httpCalls from '../../utils/http.utils';
import * as actionCreators from '../actionCreators/pregnancy.actionCreators';

export function fetchPatientPregnancyDetails(patientId, pregnancyNumber) {
  const action = async (dispatch) => {
    const resp = await httpCalls.GET(API.PREGNANCIES.GET_PREGNANCY_DETAILS(patientId, pregnancyNumber));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchPatientPregnancyDetails({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
    
    return resp.data;
  };

  return actionWrapper(action);
}

export function fetchMedicalExaminationsForPregnancy(pregnancyId) {
  const action = async (dispatch) => {
    const resp = await httpCalls.GET(API.PREGNANCIES.GET_MEDICAL_EXAMINATIONS_FOR_PREGNANCY(pregnancyId));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchMedicalExaminationsForPregnancy({
        status: ACTION_STATUS.SUCCESS,
        data: resp.data,
      }));
    }
  };
  return actionWrapper(action);
}
