const initialState = {
  users: {
    loggedIn: false,
    currentUser: null,
  },
  characteristics: [],
  patients: {
    list: {
      data: [],
      page: 1,
      totalPages: 1,
      totalResults: 0,
    },
    patientDetails: null,
    pregnancyDetails: null,
  },
};

export default initialState;