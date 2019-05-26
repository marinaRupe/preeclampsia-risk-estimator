const { CharacteristicsByIdEnum } = require('../../../enums/characteristics.enums');

class MedicalExaminationDetailsViewModel {
  constructor(medicalExamination) {
    this.id = medicalExamination.id;
    this.pregnancyId = medicalExamination.pregnancyId;
    this.trimesterNumber = medicalExamination.trimesterNumber;
    this.gestationalAgeByUltrasoundWeeks = medicalExamination.gestationalAgeByUltrasoundWeeks;
    this.gestationalAgeByUltrasoundDays = medicalExamination.gestationalAgeByUltrasoundDays;
    this.ultrasoundDate = medicalExamination.ultrasoundDate;
    this.bloodTestDate = medicalExamination.bloodTestDate;
    this.note = medicalExamination.note;

    this.booleanMeasurements = {};
    (medicalExamination.booleanMeasurements || []).forEach(bm => {
      this.booleanMeasurements[CharacteristicsByIdEnum[bm.characteristicId]] = bm;
    });

    this.numericalMeasurements = {};
    (medicalExamination.numericalMeasurements || []).forEach(nm => {
      this.numericalMeasurements[CharacteristicsByIdEnum[nm.characteristicId]] = nm;
    });

    this.enumMeasurements = {};
    (medicalExamination.enumMeasurements || []).forEach(em => {
      this.enumMeasurements[CharacteristicsByIdEnum[em.characteristicId]] = em;
    });
  }
}

module.exports = MedicalExaminationDetailsViewModel;
