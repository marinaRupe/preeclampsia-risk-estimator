const EnumMeasurementsDictionaryViewModel = require('../Measurement/EnumMeasurementsDictionary.viewModel');
const NumericalMeasurementsDictionaryViewModel = require('../Measurement/NumericalMeasurementsDictionary.viewModel');
const BooleanMeasurementsDictionaryViewModel = require('../Measurement/BooleanMeasurementsDictionary.viewModel');

class MedicalExaminationDetailsViewModel {
  constructor(medicalExamination) {
    this.id = medicalExamination.id;
    this.pregnancyId = medicalExamination.pregnancyId;
    this.trimesterNumber = medicalExamination.trimesterNumber;
    this.protocol = medicalExamination.protocol;
    this.gestationalAgeByUltrasoundWeeks = medicalExamination.gestationalAgeByUltrasoundWeeks;
    this.gestationalAgeByUltrasoundDays = medicalExamination.gestationalAgeByUltrasoundDays;
    this.gestationalAgeOnBloodTestWeeks = medicalExamination.gestationalAgeOnBloodTestWeeks;
    this.gestationalAgeOnBloodTestDays = medicalExamination.gestationalAgeOnBloodTestDays;
    this.ultrasoundDate = medicalExamination.ultrasoundDate;
    this.bloodTestDate = medicalExamination.bloodTestDate;
    this.note = medicalExamination.note;
    
    this.booleanMeasurements = new BooleanMeasurementsDictionaryViewModel(medicalExamination.booleanMeasurements);
    this.enumMeasurements = new EnumMeasurementsDictionaryViewModel(medicalExamination.enumMeasurements);
    this.numericalMeasurements = new NumericalMeasurementsDictionaryViewModel(medicalExamination.numericalMeasurements);
  }
}

module.exports = MedicalExaminationDetailsViewModel;
