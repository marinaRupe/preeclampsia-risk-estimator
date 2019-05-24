import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API } from '../../constants/routes';
import { actionWrapper } from '../../utils/redux.utils';
import * as httpCalls from '../../utils/http.utils';
import * as actionCreators from '../actionCreators/patient.actionCreators';

export function fetchPatientList(page = 1, pageSize = 10, sortColumn, sortDirection) {
  const action = async (dispatch) => {
    const resp = await httpCalls.GET(API.PATIENTS.GET_ALL(page, pageSize, sortColumn, sortDirection));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchPatients({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function fetchPatient(patientId) {
  const action = async (dispatch) => {
    const resp = await httpCalls.GET(API.PATIENTS.GET_BY_ID(patientId));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchPatientDetails({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function createPatient(patientData) {
  const action = async (dispatch) => {
    const resp = await httpCalls.POST(API.PATIENTS.ROOT, patientData);
    if (resp.status === 200) {
      await dispatch(actionCreators.addPatient({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action, true);
}

export function updatePatient(patientData) {
  const action = async (dispatch) => {
    const resp = await httpCalls.PUT(API.PATIENTS.GET_BY_ID(patientData.id), patientData);
    if (resp.status === 200) {
      await dispatch(actionCreators.editPatient({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action, true);
}

export function removePatient(patientId) {
  const action = async (dispatch) => {
    const resp = await httpCalls.DELETE(API.PATIENTS.GET_BY_ID(patientId));
    if (resp.status === 200) {
      await dispatch(actionCreators.deletePatient({ status: ACTION_STATUS.SUCCESS, data: patientId }));
    }
  };
  return actionWrapper(action);
}

export function updatePatientDetails(patientData) {
  const action = async (dispatch) => {
    const resp = await httpCalls.PUT(API.PATIENTS.GET_BY_ID(patientData.id), patientData);
    if (resp.status === 200) {
      await dispatch(actionCreators.editPatientDetails({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action, true);
}
