import { Characteristics } from 'constants/characteristics.constants';

export const CharacteristicsByIdEnum = Object.entries(Characteristics).reduce((obj, [key, value]) => {
  obj[value.key] = key;
  return obj;
}, {});
