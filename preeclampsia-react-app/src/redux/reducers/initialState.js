const initialState = {
  users: {
    auth: {
      loggedIn: false,
      currentUser: null,
    },
    list: [],
  },
  patients: {
    list: {
      data: [],
      page: 1,
      totalPages: 1,
      totalResults: 0,
    },
    patientDetails: null,
  },
  pregnancy: {
    details: null,
    trimesters: {
      trimester1: null,
      trimester2: null,
      trimester3: null,
    }
  },
};

export default initialState;