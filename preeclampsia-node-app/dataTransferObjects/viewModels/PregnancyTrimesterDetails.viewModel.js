const { CharacteristicsByIdEnum } = require('../../enums/characteristics.enums');

class PregnancyTrimesterDetailsViewModel {
  constructor(trimester) {
    this.id = trimester.id;
    this.pregnancyId = trimester.pregnancyId;
    this.trimesterNumber = trimester.trimesterNumber;
    this.gestationalAgeByUltrasoundWeeks = trimester.gestationalAgeByUltrasoundWeeks;
    this.gestationalAgeByUltrasoundDays = trimester.gestationalAgeByUltrasoundDays;
    this.ultrasoundDate = trimester.ultrasoundDate;
    this.bloodTestDate = trimester.bloodTestDate;
    this.note = trimester.note;

    this.booleanMeasurements = {};
    (trimester.booleanMeasurements || []).forEach(bm => {
      this.booleanMeasurements[CharacteristicsByIdEnum[bm.characteristicId]] = bm;
    });

    this.numericalMeasurements = {};
    (trimester.numericalMeasurements || []).forEach(nm => {
      this.numericalMeasurements[CharacteristicsByIdEnum[nm.characteristicId]] = nm;
    });

    this.enumMeasurements = {};
    (trimester.enumMeasurements || []).forEach(em => {
      this.enumMeasurements[CharacteristicsByIdEnum[em.characteristicId]] = em;
    });
  }
}

module.exports = PregnancyTrimesterDetailsViewModel;
