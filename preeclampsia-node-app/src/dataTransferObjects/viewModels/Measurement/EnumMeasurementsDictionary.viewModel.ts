import { CharacteristicsByIdEnum } from '../../../enums/characteristics.enums';
import MeasurementViewModel from './Measurement.viewModel';

class EnumMeasurementsDictionaryViewModel {
	constructor(measurements) {
		(measurements || []).forEach(m => {
			this[CharacteristicsByIdEnum[m.characteristicId]] = new MeasurementViewModel(m);
		});
	}
}

export default EnumMeasurementsDictionaryViewModel;
