const { CharacteristicsByIdEnum } = require('../../../enums/characteristics.enums');
const MeasurementViewModel = require('./Measurement.viewModel');

class EnumMeasurementsDictionaryViewModel {
  constructor(measurements) {
    (measurements || []).forEach(m => {
      this[CharacteristicsByIdEnum[m.characteristicId]] = new MeasurementViewModel(m);
    });
  }
}

module.exports = EnumMeasurementsDictionaryViewModel;
