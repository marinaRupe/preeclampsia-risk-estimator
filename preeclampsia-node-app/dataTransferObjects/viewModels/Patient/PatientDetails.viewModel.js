class PatientDetailsViewModel {
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

module.exports = PatientDetailsViewModel;
