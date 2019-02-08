const { CharacteristicsByIdEnum } = require('../../enums/characteristics.enums');

class PregnancyDetailsViewModel {
  constructor(pregnancy) {
    this.id = pregnancy.id;
    this.patientId = pregnancy.patientId;
    this.pregnancyNumber = pregnancy.pregnancyNumber;
    this.lastPeriodDate = pregnancy.lastPeriodDate;
    this.lastPeriodDateIsReliable = pregnancy.lastPeriodDateIsReliable;
    this.endDate = pregnancy.endDate;
    this.numberOfFetuses = pregnancy.numberOfFetuses;
    this.numberOfPreviousPregnancies = pregnancy.numberOfPreviousPregnancies;
    this.numberOfPreviousBirths = pregnancy.numberOfPreviousBirths;
    this.hadPEInPreviousPregnancy = pregnancy.hadPEInPreviousPregnancy;

    this.booleanMeasurements = {};
    (pregnancy.booleanMeasurements || []).forEach(bm => {
      this.booleanMeasurements[CharacteristicsByIdEnum[bm.characteristicId]] = bm;
    });

    this.numericalMeasurements = {};
    (pregnancy.numericalMeasurements || []).forEach(nm => {
      this.numericalMeasurements[CharacteristicsByIdEnum[nm.characteristicId]] = nm;
    });

    this.enumMeasurements = {};
    (pregnancy.enumMeasurements || []).forEach(em => {
      this.enumMeasurements[CharacteristicsByIdEnum[em.characteristicId]] = em;
    });
  }
}

module.exports = PregnancyDetailsViewModel;
