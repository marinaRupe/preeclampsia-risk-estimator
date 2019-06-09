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
		medicalExaminations: [],
	},
	reports: {
		pregnancyDataForReport: null
	},
	statistics: {
		mediansForCharacteristics: {},
	},
};

export default initialState;