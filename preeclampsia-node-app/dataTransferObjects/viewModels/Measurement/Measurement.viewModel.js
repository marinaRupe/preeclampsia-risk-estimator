class MeasurementViewModel {
  constructor(measurement) {
    this.id = measurement.id;
    this.value = measurement.value;
    this.characteristicId = measurement.characteristicId;
    this.medicalExaminationId = measurement.medicalExaminationId;
  }
}

module.exports = MeasurementViewModel;
