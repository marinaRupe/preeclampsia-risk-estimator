import * as Errors from 'restify-errors';
import MeasurementService from 'services/measurement.service';
import { isDefined } from 'utils/value.utils';

export const getMediansForCharacteristic = async (req, res) => {
  const characteristicId = +req.params.characteristicId;

  if (!isDefined(characteristicId)) {
    throw new Errors.BadRequestError();
  }

  const medians = await MeasurementService.getMediansByWeeks(characteristicId);
  res.json(medians);
};

export default {
  getMediansForCharacteristic,
};
