export const translations = {
	hr: {
		home: {
			subtitle: 'Aplikacija za procjenu rizika za preeklampsiju',
			appInfo: `Aplikacija je razvijena za KBC Sestre milosrdnice, Zagreb, Hrvatska,
			u sklopu diplomskog rada na Fakultetu Elektrotehnike i računarstva, Sveučilište u Zagrebu.`,
		},
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
				changePassword: 'Izmijeni lozinku',
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
				add: 'Dodaj trudnoću',
				edit: 'Uredi podatke',
				delete: 'Izbriši podatke o trudnoći'
			},
			modal: {
				addPregnancyTitle: 'Dodavanje nove trudnoće',
				editPregnancyTitle: 'Uređivanje podataka o trudnoći',
				deletePregnancyTitle: 'Brisanje trudnoće',
				deletePregnancyText: 'Jeste li sigurni da želite obrisati trudnoću',
			},
			property: {
				pregnancyNumber: 'Broj trudnoće',
				lastPeriodDate: 'Datum posljednje mjesečnice',
				lastPeriodDateIsReliable: 'Datum posljednje mjesečnice pouzdan',
				deliveryDate: 'Datum poroda',
				numberOfPreviousPregnancies: 'Broj ranijih trudnoća',
				numberOfPreviousBirths: 'Broj poroda',
				hadPEInPreviousPregnancy: 'Preeklampsija u prethodnoj trudnoći',
				resultedWithPE: 'Oboljela od preeklampsije u ovoj trudnoći',
			},
			detailsTitle: 'Podaci o trudnoći',
			basicDetailsTitle: 'Osnovni podaci',
			trimestersTitle: 'Tromjesečja',
			medicalExaminationsTitle: 'Pregledi',
			trimestersBasicDetails: 'Osnovni podaci',
			maternalCharacteristicsTitle: 'Podaci o pacijentici',
			medicalHistoryTitle: 'Medicinska povijest',
			biophysicalMeasurementsTitle: 'Biofizička mjerenja',
			biochemicalMeasurementsTitle: 'Biokemijska mjerenja',
		},
		medicalExamination: {
			action: {
				save: 'Spremi promjene',
				add: 'Dodaj pregled',
				edit: 'Uredi podatke',
				delete: 'Izbriši podatke o pregledu'
			},
			modal: {
				addMedicalExaminationTitle: 'Dodavanje novog pregleda',
				editMedicalExaminationTitle: 'Uređivanje podataka o pregledu',
				deleteMedicalExaminationTitle: 'Brisanje pregleda',
				deleteMedicalExaminationText: 'Jeste li sigurni da želite obrisati pregled',
			},
			property: {
				trimesterNumber: 'Tromjesečje',
				protocol: 'Protokol',
				bloodTestDate: 'Datum vađenja krvi',
				ultrasoundDate: 'Datum ultrazvuka',
				gestationalAgeByUltrasound: 'Gestacijska dob na ultrazvuku',
				gestationalAgeOnBloodTest: 'Gestacijska dob na dan vađenja krvi',
				weeks: 'tjedana',
				days: 'dana',
				note: 'Napomena',
			},
		},
		risk: {
			calculateRisk: 'Izračunaj rizik',
			report: {
				previewTitle: 'Generiranje nalaza',
				previewPatientDataTitle: 'Pregled podataka o pacijentu',
				action: {
					generateReport: 'Generiraj nalaz',
					generating: 'Nalaz se generira. Molimo pričekajte...',
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
		},
		dateTime: {
			week: {
				long: {
					monday: 'ponedjeljak',
					tuesday: 'utorak',
					wednesday: 'srijeda',
					thursday: 'četvrtak',
					friday: 'petak',
					saturday: 'subota',
					sunday: 'nedjelja',
				},
				short: {
					monday: 'pon',
					tuesday: 'uto',
					wednesday: 'sri',
					thursday: 'čet',
					friday: 'pet',
					saturday: 'sub',
					sunday: 'ned',
				},
			},
		},
	},

	en: {
		home: {
			subtitle: 'The application for the calculation of risk for preeclampsia',
			appInfo: `This application is developed for the The teaching hospital Sisters of Charity in Zagreb, Croatia,
			as a part of the master thesis project on
			the Faculty of Electrical Engineering and Computing, University of Zagreb.`,
		},
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
				MBO: 'Patient ID',
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
				enterMBO: 'Enter patient ID',
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
				changePassword: 'Change Password',
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
				add: 'Add Pregnancy',
				edit: 'Edit Pregnancy Data',
				delete: 'Delete Pregnancy',
			},
			modal: {
				addPregnancyTitle: 'Add Pregnancy',
				editPregnancyTitle: 'Edit Pregnancy',
				deletePregnancyTitle: 'Delete Pregnancy',
				deletePregnancyText: 'Are you sure you want to delete pregnancy',
			},
			property: {
				pregnancyNumber: 'Pregnancy number',
				lastPeriodDate: 'Last period date',
				lastPeriodDateIsReliable: 'Last period date is reliable',
				deliveryDate: 'Delivery date',
				numberOfPreviousPregnancies: 'Number of previous pregnancies',
				numberOfPreviousBirths: 'Number of previous births',
				hadPEInPreviousPregnancy: 'PE in previous pregnancy',
				resultedWithPE: 'Pregnancy resulted with PE',
			},
			detailsTitle: 'Pregnancy Details',
			basicDetailsTitle: 'Basic Details',
			trimestersTitle: 'Trimesters',
			medicalExaminationsTitle: 'Medical Examinations',
			trimestersBasicDetails: 'Basic Details',
			maternalCharacteristicsTitle: 'Maternal Characteristics',
			medicalHistoryTitle: 'Medical History',
			biophysicalMeasurementsTitle: 'Biophysical Measurements',
			biochemicalMeasurementsTitle: 'Biochemical Measurements',
		},
		medicalExamination: {
			action: {
				save: 'Save changes',
				add: 'Add Medical Examination',
				edit: 'Edit Medical Examination Data',
				delete: 'Delete Medical Examination',
			},
			modal: {
				addMedicalExaminationTitle: 'Add Medical Examination',
				editMedicalExaminationTitle: 'Edit Medical Examination',
				deleteMedicalExaminationTitle: 'Delete Medical Examination',
				deleteMedicalExaminationText: 'Are you sure you want to delete medical examination',
			},
			property: {
				trimesterNumber: 'Trimester',
				protocol: 'Protocol',
				bloodTestDate: 'Blood test date',
				ultrasoundDate: 'Ultrasound date',
				gestationalAgeByUltrasound: 'Gestational age by ultrasound',
				gestationalAgeOnBloodTest: 'Gestational age on blood test',
				weeks: 'weeks',
				days: 'days',
				note: 'Note',
			},
		},
		risk: {
			calculateRisk: 'Calculate risk',
			report: {
				previewTitle: 'Generate Report',
				previewPatientDataTitle: 'Patient Data',
				action: {
					generateReport: 'Generate report',
					generating: 'Generating report, please wait...',
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
		},
		dateTime: {
			week: {
				long: {
					monday: 'Monday',
					tuesday: 'Tuesday',
					wednesday: 'Wednesday',
					thursday: 'Thursday',
					friday: 'Friday',
					saturday: 'Saturday',
					sunday: 'Sunday',
				},
				short: {
					monday: 'Mon',
					tuesday: 'Tue',
					wednesday: 'Wed',
					thursday: 'Thu',
					friday: 'Fri',
					saturday: 'Sat',
					sunday: 'Sun',
				},
			},
		},
	},
};

export default translations;
