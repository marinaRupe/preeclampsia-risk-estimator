const { CharacteristicsByIdEnum } = require('../../enums/characteristics.enums');

class PregnancyDetailsViewModel {
  constructor(pregnancy) {
    this.id = pregnancy.id;
    this.patientId = pregnancy.patientId;
    this.pregnancyNumber = pregnancy.pregnancyNumber;
    this.endDate = pregnancy.endDate;
    this.pregnancyType = pregnancy.pregnancyType;
    this.pregnancyTypeHrName = pregnancy.pregnancyTypeHrName;

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
