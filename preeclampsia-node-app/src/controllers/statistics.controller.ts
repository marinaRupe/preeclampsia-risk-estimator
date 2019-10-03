import * as Errors from 'restify-errors';
import MeasurementService from 'services/measurement.service';
import { isDefined } from 'utils/value.utils';

export const getMediansForCharacteristic = async (req, res) => {
	const characteristicId = +req.params.characteristicId;

	if (!isDefined(characteristicId)) {
		throw new Errors.BadRequestError();
	}

	const mediansByWeek = await MeasurementService.getMediansByWeeks(characteristicId);
	const mediansByDayForFirstTrimester = await MeasurementService.getMediansByDaysForTrimester(characteristicId, 1);
	res.json({ withoutPE: { mediansByWeek, mediansByDayForFirstTrimester } });
};

export default {
	getMediansForCharacteristic,
};
