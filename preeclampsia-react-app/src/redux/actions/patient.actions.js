import axios from 'axios';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API } from '../../constants/routes';
import { actionWrapper } from '../../utils/redux.utils';
import * as actionCreators from '../actionCreators/patient.actionCreators';

export function fetchPatientList() {
  const action = async (dispatch) => {
    const resp = await axios.get(API.PATIENTS.GET_ALL);
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchPatients({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function fetchPatient(patientId) {
  const action = async (dispatch) => {
    const resp = await axios.get(API.PATIENTS.GET_BY_ID(patientId));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchPatientDetails({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}
