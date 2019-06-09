const { Characteristics } = require('constants/characteristics.constants');

const CharacteristicsByIdEnum = Object.entries(Characteristics).reduce((obj, [key, value]) => {
  obj[value.key] = key;
  return obj;
}, {});


module.exports = {
  CharacteristicsByIdEnum,
};