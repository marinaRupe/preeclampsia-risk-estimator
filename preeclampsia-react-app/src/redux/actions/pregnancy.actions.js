import axios from 'axios';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API } from '../../constants/routes';
import { actionWrapper } from '../../utils/redux.utils';
import * as actionCreators from '../actionCreators/pregnancy.actionCreators';

export function fetchPatientPregnancyDetails(patientId, pregnancyNumber) {
  const action = async (dispatch) => {
    const resp = await axios.get(API.PREGNANCIES.GET_PREGNANCY_DETAILS(patientId, pregnancyNumber));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchPatientPregnancyDetails({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function fetchPregnancyTrimesterDetails(pregnancyId, trimesterNumber) {
  const action = async (dispatch) => {
    const resp = await axios.get(API.PREGNANCIES.GET_TRIMESTER_DETAILS(pregnancyId, trimesterNumber));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchPregnancyTrimesterDetails({
        status: ACTION_STATUS.SUCCESS,
        data: { [`trimester${resp.data.trimesterNumber}`]: resp.data },
      }));
    }
  };
  return actionWrapper(action);
}
