const { CharacteristicsByIdEnum } = require('../../../enums/characteristics.enums');
const MeasurementViewModel = require('./Measurement.viewModel');

class NumericalMeasurementsDictionaryViewModel {
  constructor(measurements) {
    (measurements || []).forEach(m => {
      this[CharacteristicsByIdEnum[m.characteristicId]] = new MeasurementViewModel(m);
    });
  }
}

module.exports = NumericalMeasurementsDictionaryViewModel;
