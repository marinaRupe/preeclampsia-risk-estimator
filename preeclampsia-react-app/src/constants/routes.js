const API_VERSION = 'v1.0';

export const API_URL = `/api/${API_VERSION}`;

const pagingQueryString = (page = 1, pageSize, sortColumn = '', sortDirection = '') =>
  `page=${page}&pageSize=${pageSize}&sortColumn=${sortColumn}&sortDirection=${sortDirection}`;

export const API = {
  USERS: {
    ROOT: `${API_URL}/users`,
    GET_ALL: (page, pageSize, sortColumn, sortDirection) =>
      `${API.USERS.ROOT}/?${pagingQueryString(page, pageSize, sortColumn, sortDirection)}`,
    GET_BY_ID: (userId) => `${API.USERS.ROOT}/${userId}`,
    LOGIN: () => `${API.USERS.ROOT}/login`,
  },
  PATIENTS: {
    ROOT: `${API_URL}/patients`,
    GET_ALL: (page, pageSize, sortColumn, sortDirection) =>
      `${API.PATIENTS.ROOT}/?${pagingQueryString(page, pageSize, sortColumn, sortDirection)}`,
    GET_BY_ID: (patientId) => `${API.PATIENTS.ROOT}/${patientId}`,
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