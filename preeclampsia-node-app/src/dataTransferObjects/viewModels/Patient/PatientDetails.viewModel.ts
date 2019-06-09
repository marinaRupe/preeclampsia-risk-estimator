class PatientDetailsViewModel {
	id: number;
	firstName: string;
	lastName: string;
	MBO: string;
	birthDate: string;
	racialOrigin: number;
	createdAt: string;

	constructor(patient) {
		this.id = patient.id;
		this.firstName = patient.firstName;
  	this.lastName = patient.lastName;
  	this.MBO = patient.MBO;
  	this.birthDate = patient.birthDate;
  	this.racialOrigin = patient.racialOrigin;
  	this.createdAt = patient.createdAt;
	}
}

export default PatientDetailsViewModel;
