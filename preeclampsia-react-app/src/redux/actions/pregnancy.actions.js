import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API } from '../../constants/routes';
import { actionWrapper } from '../../utils/redux.utils';
import * as httpCalls from '../../utils/http.utils';
import { castToInt } from '../../utils/value.utils';
import * as actionCreators from '../actionCreators/pregnancy.actionCreators';

/* Pregnancy */

export function fetchPatientPregnancyDetails(patientId, pregnancyNumber) {
  const action = async (dispatch) => {
    const res = await httpCalls.GET(API.PREGNANCIES.PREGNANCY_DETAILS(patientId, pregnancyNumber));
    if (res.status === 200) {
      await dispatch(actionCreators.updatePregnancyDetails({ status: ACTION_STATUS.SUCCESS, data: res.data }));
    }
    
    return res.data;
  };

  return actionWrapper(action);
}

export function createPregnancy(pregnancyData) {
  const body = parsePregnancyData(pregnancyData);

  const action = async (dispatch) => {
    const res = await httpCalls.POST(API.PREGNANCIES.ROOT, body);
    if (res.status === 200) {
      await dispatch(actionCreators.addPregnancy({ status: ACTION_STATUS.SUCCESS, data: res.data }));
    }
  };
  return actionWrapper(action, true);
}

export function updatePregnancy(pregnancyData) {
  const body = parsePregnancyData(pregnancyData);

  const action = async (dispatch) => {
    const res = await httpCalls.PUT(API.PREGNANCIES.BY_ID(pregnancyData.id), body);
    if (res.status === 200) {
      await dispatch(actionCreators.editPregnancy({ status: ACTION_STATUS.SUCCESS, data: res.data }));
    }
  };
  return actionWrapper(action, true);
}

/* Medical Examination */

export function fetchMedicalExaminationsForPregnancy(pregnancyId) {
  const action = async (dispatch) => {
    const res = await httpCalls.GET(API.PREGNANCIES.MEDICAL_EXAMINATIONS_FOR_PREGNANCY(pregnancyId));
    if (res.status === 200) {
      await dispatch(actionCreators.updateMedicalExaminationsForPregnancy({
        status: ACTION_STATUS.SUCCESS,
        data: res.data,
      }));
    }
  };
  return actionWrapper(action);
}

export function createMedicalExamination(medicalExaminationData) {
  const body = parseMedicalExaminationData(medicalExaminationData);

  const action = async (dispatch) => {
    const res = await httpCalls.POST(API.MEDICAL_EXAMINATIONS.ROOT, body);
    if (res.status === 200) {
      await dispatch(actionCreators.addMedicalExamination({ status: ACTION_STATUS.SUCCESS, data: res.data }));
    }
  };
  return actionWrapper(action, true);
}

export function editMedicalExamination(medicalExaminationData) {
  const body = parseMedicalExaminationData(medicalExaminationData);

  const action = async (dispatch) => {
    const res = await httpCalls.PUT(API.MEDICAL_EXAMINATIONS.BY_ID(medicalExaminationData.id), body);
    if (res.status === 200) {
      await dispatch(actionCreators.editMedicalExamination({ status: ACTION_STATUS.SUCCESS, data: res.data }));
    }
  };
  return actionWrapper(action, true);
}

export function updateMeasurementsForMedicalExaminations(medicalExaminationId, measurementsData) {
  const action = async (dispatch) => {
    const res = await httpCalls.PUT(API.MEDICAL_EXAMINATIONS.MEASUREMENTS(medicalExaminationId), measurementsData);

    if (res.status === 200) {
      await dispatch(actionCreators.updateMedicalExaminationDetails({
        status: ACTION_STATUS.SUCCESS,
        data: res.data,
      }));
    }
  };
  return actionWrapper(action);
}

/* Helpers */

const parsePregnancyData = (pregnancyData) => ({
  ...pregnancyData,
  numberOfPreviousPregnancies: castToInt(pregnancyData.numberOfPreviousPregnancies),
  numberOfPreviousBirths: castToInt(pregnancyData.numberOfPreviousBirths),
});

const parseMedicalExaminationData = (medicalExaminationData) => ({
  ...medicalExaminationData,
});
