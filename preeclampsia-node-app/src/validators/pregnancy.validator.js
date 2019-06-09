const { addToArray } = require('utils/array.utils');
const { isDefined } = require('utils/value.utils');

const isValidPregnancy = async (pregnancy, translations) => {
  const errors = {};

  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    errors,
  };
};

module.exports = {
  isValidPregnancy,
};
