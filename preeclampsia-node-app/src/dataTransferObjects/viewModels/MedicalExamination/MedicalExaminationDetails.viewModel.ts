import EnumMeasurementsDictionaryViewModel from '../Measurement/EnumMeasurementsDictionary.viewModel';
import NumericalMeasurementsDictionaryViewModel from '../Measurement/NumericalMeasurementsDictionary.viewModel';
import BooleanMeasurementsDictionaryViewModel from '../Measurement/BooleanMeasurementsDictionary.viewModel';

class MedicalExaminationDetailsViewModel {
	id: number;
	pregnancyId: number;
	trimesterNumber: number;
	protocol: string;
	gestationalAgeByUltrasoundWeeks: number;
	gestationalAgeByUltrasoundDays: number;
	gestationalAgeOnBloodTestWeeks: number;
	gestationalAgeOnBloodTestDays: number;
	ultrasoundDate: string;
	bloodTestDate: string;
	note: string;
	ultrasoundDataMeasuredBy: string;
	gynecologist: string;
	booleanMeasurements: BooleanMeasurementsDictionaryViewModel;
	enumMeasurements: EnumMeasurementsDictionaryViewModel;
	numericalMeasurements: NumericalMeasurementsDictionaryViewModel;

	constructor(medicalExamination) {
  	this.id = medicalExamination.id;
  	this.pregnancyId = medicalExamination.pregnancyId;
		this.trimesterNumber = medicalExamination.trimesterNumber;
  	this.protocol = medicalExamination.protocol;
  	this.gestationalAgeByUltrasoundWeeks = medicalExamination.gestationalAgeByUltrasoundWeeks;
  	this.gestationalAgeByUltrasoundDays = medicalExamination.gestationalAgeByUltrasoundDays;
  	this.gestationalAgeOnBloodTestWeeks = medicalExamination.gestationalAgeOnBloodTestWeeks;
		this.gestationalAgeOnBloodTestDays = medicalExamination.gestationalAgeOnBloodTestDays;
		this.gynecologist = medicalExamination.gynecologist;
		this.ultrasoundDataMeasuredBy = medicalExamination.ultrasoundDataMeasuredBy;
		this.ultrasoundDate = medicalExamination.ultrasoundDate;
		this.bloodTestDate = medicalExamination.bloodTestDate;
		this.note = medicalExamination.note;
    
		this.booleanMeasurements = new BooleanMeasurementsDictionaryViewModel(medicalExamination.booleanMeasurements);
		this.enumMeasurements = new EnumMeasurementsDictionaryViewModel(medicalExamination.enumMeasurements);
  	this.numericalMeasurements = new NumericalMeasurementsDictionaryViewModel(medicalExamination.numericalMeasurements);
	}
}

export default MedicalExaminationDetailsViewModel;
