export const translations = {
	hr: {
		action: {
			save: 'Spremi',
			delete: 'Obriši',
			cancel: 'Odustani',
			select: 'Odaberi',
		},
		patient: {
			action: {
				add: 'Dodaj pacijenta',
				edit: 'Uredi podatke',
				delete: 'Izbriši pacijenta'
			},
			modal: {
				addPatientTitle: 'Dodavanje novog pacijenta',
				editPatientTitle: 'Uređivanje podataka o pacijentu',
				deletePatientTitle: 'Brisanje pacijenta',
				deleteUserText: 'Jeste li sigurni da želite obrisati pacijenta',
			},
			property: {
				MBO: 'MBO',
				firstName: 'Ime',
				lastName: 'Prezime',
				birthDate: 'Datum rođenja',
				ageInYears: 'Starost u godinama',
				racialOrigin: 'Etnička skupina',
				createdAt: 'Datum unosa',
			},
			placeholder: {
				enterFirstName: 'Unesi ime',
				enterLastName: 'Unesi prezime',
				enterMBO: 'Unesi MBO',
				enterBirthDate: 'Unesi datum rođenja',
			},
			listTitle: 'Lista pacijenata',
			detailsTitle: 'Detalji o pacijentu',
			pregnanciesTitle: 'Povijest trudnoća',
			search: 'Pretraži pacijente',
		},
		user: {
			action: {
				add: 'Dodaj korisnika',
				edit: 'Uredi podatke',
				delete: 'Izbriši korisnika'
			},
			modal: {
				addUserTitle: 'Dodavanje korisnika',
				editUserTitle: 'Uređivanje korisnika',
				deleteUserTitle: 'Brisanje korisnika',
				deleteUserText: 'Jeste li sigurni da želite obrisati korisnika',
				editPasswordTitle: 'Promjena lozinke korisnika',
			},
			property: {
				MBO: 'MBO',
				firstName: 'Ime',
				lastName: 'Prezime',
				email: 'E-mail',
				role: 'Uloga',
				password: 'Lozinka',
				repeatedPassword: 'Ponovljena lozinka',
				createdAt: 'Datum unosa',
			},
			placeholder: {
				enterFirstName: 'Unesi ime',
				enterLastName: 'Unesi prezime',
				enterEmail: 'Unesi E-mail',
				enterPassword: 'Unesi lozinku',
				enterRepeatedPassword: 'Ponovi lozinku',
			},
			listTitle: 'Lista korisnika',
			detailsTitle: 'Detalji o korisniku',
		},
		pregnancy: {
			action: {
				save: 'Spremi promjene',
			},
			property: {
				lastPeriodDate: 'Datum posljednje mjesečnice',
				lastPeriodDateIsReliable: 'Datum posljednje mjesečnice pouzdan',
				deliveryDate: 'Datum poroda',
				numberOfPreviousPregnancies: 'Broj ranijih trudnoća',
				numberOfPreviousBirths: 'Broj poroda',
				hadPEInPreviousPregnancy: 'Preeklampsija u prethodnoj trudnoći',
			},
			detailsTitle: 'Podaci o trudnoći',
			basicDetailsTitle: 'Osnovni podaci',
			trimestersTitle: 'Tromjesečja',
			trimestersBasicDetails: 'Osnovni podaci',
			maternalCharacteristicsTitle: 'Podaci o pacijentici',
			medicalHistoryTitle: 'Medicinska povijest',
			biophysicalMeasurementsTitle: 'Biofizička mjerenja',
			biochemicalMeasurementsTitle: 'Biokemijska mjerenja',
		},
		medicalExamination: {
			property: {
				protocol: 'Protokol',
				bloodTestDate: 'Datum vađenja krvi',
				ultrasoundDate: 'Datum ultrazvuka',
				gestationalAgeByUltrasound: 'Gestacijska dob na ultrazvuku',
				gestationalAgeOnBloodTest: 'Gestacijska dob na dan vađenja krvi',
				note: 'Napomena',
			},
		},
		risk: {
			calculateRisk: 'Izračunaj rizik',
			report: {
				previewTitle: 'Generiranje nalaza',
				previewPatientDataTitle: 'Pregled podataka o pacijentu',
				action: {
					generateReport: 'Generiraj nalaz'
				},
				property: {
					responsiblePerson: 'Odgovorna osoba', 
				},
			}
		},
		statistics: {
			title: 'Statistika',
			PAPPAMedians: 'PAPP-A medijani',
			PLGFMedians: 'PLGF medijani',
		},
		login: {
			title: 'Prijava',
			titleLong: 'Prijava u sustav',
			action: 'Prijavi se',
		},
		logout: {
			title: 'Odjava',
		},
		table: {
			previousText: 'Prethodna',
			nextText: 'Sljedeća',
			loadingText: 'Učitavanje...',
			noDataText: 'Nema pronađenih podataka',
			pageText: 'Stranica',
			ofText: 'od',
			rowsText: 'redaka',
		},
		word: {
			pregnancy: 'Trudnoća',
			trimester: 'Tromjesečje',
			yes: 'Da',
			no: 'Ne',
			unknown: 'nepoznato',
		}
	},

	en: {
		action: {
			save: 'Save',
			delete: 'Delete',
			cancel: 'Cancel',
			select: 'Choose',
		},
		patient: {
			action: {
				add: 'Add Patient',
				edit: 'Edit Patient Data',
				delete: 'Delete Patient'
			},
			modal: {
				addPatientTitle: 'Add Patient',
				editPatientTitle: 'Edit Patient',
				deletePatientTitle: 'Delete Patient',
				deleteUserText: 'Are you sure you want to delete patient',
			},
			property: {
				MBO: 'MBO',
				firstName: 'First name',
				lastName: 'Last name',
				birthDate: 'Birth date',
				ageInYears: 'Age in years',
				racialOrigin: 'Racial origin',
				createdAt: 'Created at',
			},
			placeholder: {
				enterFirstName: 'Enter first name',
				enterLastName: 'Enter last name',
				enterMBO: 'Enter MBO',
				enterBirthDate: 'Enter birth date',
			},
			listTitle: 'Patient List',
			detailsTitle: 'Patient Details',
			pregnanciesTitle: 'Pregnancy History',
			search: 'Search patients',
		},
		user: {
			action: {
				add: 'Add User',
				edit: 'Edit User Data',
				delete: 'Delete User',
			},
			modal: {
				addUserTitle: 'Add User',
				editUserTitle: 'Edit User',
				deleteUserTitle: 'Delete User',
				deleteUserText: 'Are you sure you want to delete user',
				editPasswordTitle: 'Change password for user',
			},
			property: {
				MBO: 'MBO',
				firstName: 'First name',
				lastName: 'Last name',
				email: 'E-mail',
				role: 'Role',
				password: 'Password',
				repeatedPassword: 'Repeated password',
				createdAt: 'Created at',
			},
			placeholder: {
				enterFirstName: 'Enter first name',
				enterLastName: 'Enter last name',
				enterEmail: 'Enter E-mail',
				enterPassword: 'Enter password',
				enterRepeatedPassword: 'Repeat password',
			},
			listTitle: 'User List',
			detailsTitle: 'User Details',
		},
		statistics: {
			title: 'Statistics',
			PAPPAMedians: 'PAPP-A medians',
			PLGFMedians: 'PLGF medians',
		},
		pregnancy: {
			action: {
				save: 'Save changes',
			},
			property: {
				lastPeriodDate: 'Last period date',
				lastPeriodDateIsReliable: 'Last period date is reliable',
				deliveryDate: 'Delivery date',
				numberOfPreviousPregnancies: 'Number of previous pregnancies',
				numberOfPreviousBirths: 'Number of previous births',
				hadPEInPreviousPregnancy: 'PE in previous pregnancy',
			},
			detailsTitle: 'Pregnancy Details',
			basicDetailsTitle: 'Basic Details',
			trimestersTitle: 'Trimesters',
			trimestersBasicDetails: 'Basic Details',
			maternalCharacteristicsTitle: 'Maternal Characteristics',
			medicalHistoryTitle: 'Medical History',
			biophysicalMeasurementsTitle: 'Biophysical Measurements',
			biochemicalMeasurementsTitle: 'Biochemical Measurements',
		},
		medicalExamination: {
			property: {
				protocol: 'Protocol',
				bloodTestDate: 'Blood test date',
				ultrasoundDate: 'Ultrasound date',
				gestationalAgeByUltrasound: 'Gestational age by ultrasound',
				gestationalAgeOnBloodTest: 'Gestational age on blood test',
				note: 'Note',
			},
		},
		risk: {
			calculateRisk: 'Calculate risk',
			report: {
				previewTitle: 'Generate Report',
				previewPatientDataTitle: 'Patient Data',
				action: {
					generateReport: 'Generate report'
				},
				property: {
					responsiblePerson: 'Responsible person', 
				},
			}
		},
		login: {
			title: 'Login',
			titleLong: 'Login',
			action: 'Login',
		},
		logout: {
			title: 'Logout',
		},
		table: {
			previousText: 'Previous',
			nextText: 'Next',
			loadingText: 'Loading...',
			noDataText: 'No rows found',
			pageText: 'Page',
			ofText: 'of',
			rowsText: 'rows',
		},
		word: {
			pregnancy: 'Pregnancy',
			trimester: 'Trimester',
			yes: 'Yes',
			no: 'No',
			unknown: 'unknown',
		}
	},
};

export default translations;