const MeasurementService = require('services/measurement.service');

const getMediansForCharacteristic = async (req, res) => {
  const { characteristicId } = req.params;

  const medians = await MeasurementService.getMediansByWeeks(characteristicId);
  res.json(medians);
};

module.exports = {
  getMediansForCharacteristic,
};
