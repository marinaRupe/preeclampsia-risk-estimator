class MeasurementViewModel {
  id: number;
  value: any;
  characteristicId: number;
  medicalExaminationId: number;

  constructor(measurement) {
    this.id = measurement.id;
    this.value = measurement.value;
    this.characteristicId = measurement.characteristicId;
    this.medicalExaminationId = measurement.medicalExaminationId;
  }
}

export default MeasurementViewModel;
