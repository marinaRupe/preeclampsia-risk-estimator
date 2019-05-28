const MeasureService = require('../services/measure.service');

const getMediansForCharacteristic = async (req, res) => {
  const { characteristicId } = req.params;

  const medians = await MeasureService.getMediansByWeeks(characteristicId);
  res.json(medians);
};

module.exports = {
  getMediansForCharacteristic,
};
