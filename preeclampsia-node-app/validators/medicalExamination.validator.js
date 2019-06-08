const { addToArray } = require('../utils/array.utils');
const { isDefined } = require('../utils/value.utils');

const isValidMedicalExamination = async (medicalExamination, translations) => {
  const errors = {};

  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    errors,
  };
};

module.exports = {
  isValidMedicalExamination,
};
