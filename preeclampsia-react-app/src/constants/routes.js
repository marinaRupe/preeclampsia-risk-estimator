const API_VERSION = 'v1.0';

export const API_URL = `/api/${API_VERSION}`;

const pagingQueryString = (page = 1, pageSize, sortColumn = '', sortDirection = '', search = '') =>
  `page=${page}&pageSize=${pageSize}&sortColumn=${sortColumn}&sortDirection=${sortDirection}&search=${search}`;

export const API = {
  USERS: {
    ROOT: `${API_URL}/users`,
    ALL: (page, pageSize, sortColumn, sortDirection) =>
      `${API.USERS.ROOT}/?${pagingQueryString(page, pageSize, sortColumn, sortDirection)}`,
    BY_ID: (userId) => `${API.USERS.ROOT}/${userId}`,
    LOGIN: () => `${API.USERS.ROOT}/login`,
  },
  PATIENTS: {
    ROOT: `${API_URL}/patients`,
    ALL: (page, pageSize, sortColumn, sortDirection, search) =>
      `${API.PATIENTS.ROOT}/?${pagingQueryString(page, pageSize, sortColumn, sortDirection, search)}`,
    BY_ID: (patientId) => `${API.PATIENTS.ROOT}/${patientId}`,
  },
  PREGNANCIES: {
    PREGNANCY_DETAILS: (patientId, pregnancyNumber) =>
      `${API_URL}/patients/${patientId}/pregnancies/${pregnancyNumber}`,
    MEDICAL_EXAMINATIONS_FOR_PREGNANCY: (pregnancyId) =>
      `${API_URL}/pregnancies/${pregnancyId}/med-examinations`,
    GET_MEDICAL_EXAMINATION: (medicalExaminationId) =>
      `${API_URL}/med-examinations/${medicalExaminationId}`,
  },
  RISK: {
    GENERATE_PDF_REPORT: (medicalExaminationId) =>
      `${API_URL}/risks/med-examinations/${medicalExaminationId}/generate-pdf`,
  },
  STATISTICS: {
    MEDIANS_FOR_CHARACTERISTIC: (characteristicId) =>
      `${API_URL}/statistics/characteristics/${characteristicId}/medians`,
  }
};

export const APP = {
  ROOT: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  PATIENTS: '/patients',
  PATIENT: {
    DETAILS: (patientId = ':patientId') => `/patients/${patientId}`,
    PREGNANCY_DETAILS: (
      patientId = ':patientId',
      pregnancyNumber = ':pregnancyNumber'
    ) => `/patients/${patientId}/pregnancies/${pregnancyNumber}`,
  },
  NOT_FOUND_ERROR: '/error/404',
  RISK_ESTIMATE: (
    patientId = ':patientId',
    pregnancyNumber = ':pregnancyNumber',
    medicalExaminationId = ':medicalExaminationId',
  ) => `/patients/${patientId}/pregnancies/${pregnancyNumber}/examinations/${medicalExaminationId}/risk`,
  STATISTICS: '/statistics',
  USERS: '/users',
};