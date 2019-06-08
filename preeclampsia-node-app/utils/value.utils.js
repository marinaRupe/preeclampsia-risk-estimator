const isDefined = (property) => {
  return property !== undefined && property !== null && property !== '';
};

const isBoolean = value => value === true || value === false;

const isNumber = value => value && !isNaN(Number(value));

module.exports = {
  isDefined,
  isNumber,
  isBoolean,
};
