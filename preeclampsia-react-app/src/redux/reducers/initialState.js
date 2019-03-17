const initialState = {
  users: {
    loggedIn: false,
    currentUser: null,
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