class PregnancyDetailsViewModel {
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
  }
}

module.exports = PregnancyDetailsViewModel;
