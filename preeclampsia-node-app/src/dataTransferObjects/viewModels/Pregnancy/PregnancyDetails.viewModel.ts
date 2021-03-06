class PregnancyDetailsViewModel {
	id: number;
	patientId: number;
	pregnancyNumber: number;
	pregnancyType: number;
	conceptionMethod: number;
	lastPeriodDate: string;
	lastPeriodDateIsReliable: boolean;
	deliveryDate: string;
	numberOfPreviousPregnancies: number;
	numberOfPreviousBirths: number;
	hadPEInPreviousPregnancy: boolean;
	resultedWithPE: boolean;
	gynecologist: string;

	constructor(pregnancy) {
		this.id = pregnancy.id;
		this.patientId = pregnancy.patientId;
		this.pregnancyNumber = pregnancy.pregnancyNumber;
  	this.pregnancyType = pregnancy.pregnancyType;
  	this.conceptionMethod = pregnancy.conceptionMethod;
  	this.lastPeriodDate = pregnancy.lastPeriodDate;
  	this.lastPeriodDateIsReliable = pregnancy.lastPeriodDateIsReliable;
		this.deliveryDate = pregnancy.deliveryDate;
  	this.numberOfPreviousPregnancies = pregnancy.numberOfPreviousPregnancies;
  	this.numberOfPreviousBirths = pregnancy.numberOfPreviousBirths;
  	this.hadPEInPreviousPregnancy = pregnancy.hadPEInPreviousPregnancy;
		this.resultedWithPE = pregnancy.resultedWithPE;
		this.gynecologist = pregnancy.gynecologist;
	}
}

export default PregnancyDetailsViewModel;
