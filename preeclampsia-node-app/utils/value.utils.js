const isDefined = (property) => {
  return property !== undefined && property !== null && property !== '';
};

const isNumber = value => value && !isNaN(Number(value));

module.exports = {
  isDefined,
  isNumber
};
