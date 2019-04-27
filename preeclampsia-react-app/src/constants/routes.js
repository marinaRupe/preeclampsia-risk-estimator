const API_VERSION = 'v1.0';

export const API_URL = `/api/${API_VERSION}`;

const pagingQueryString = (page, pageSize) => `page=${page}&pageSize=${pageSize}`;

export const API = {
  USERS: {
    GET_ALL: (page, pageSize) => `${API_URL}/users/?${pagingQueryString(page, pageSize)}`,
    LOGIN: `${API_URL}/users/login`,
  },
  PATIENTS: {
    GET_ALL: (page, pageSize) => `${API_URL}/patients/?${pagingQueryString(page, pageSize)}`,
    GET_BY_ID: patientId => `${API_URL}/patients/${patientId}`,
  },
  PREGNANCIES: {
    GET_PREGNANCY_DETAILS: (patientId, pregnancyNumber) =>
      `${API_URL}/patients/${patientId}/pregnancies/${pregnancyNumber}`,
    GET_TRIMESTER_DETAILS: (pregnancyId, trimesterNumber) =>
      `${API_URL}/pregnancies/${pregnancyId}/trimesters/${trimesterNumber}`,
  },
  RISK: {
    GENERATE_PDF_REPORT: (patientId) =>
      `${API_URL}/risks/patients/${patientId}/generate-pdf`,
  },
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
    pregnancyNumber = ':pregnancyNumber'
  ) => `/patients/${patientId}/pregnancies/${pregnancyNumber}/risk`,
  STATISTICS: '/statistics',
  USERS: '/users',
};