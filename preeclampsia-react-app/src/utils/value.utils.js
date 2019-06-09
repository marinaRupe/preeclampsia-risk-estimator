export const isDefined = (property) => (
  property !== undefined && property !== null && property !== '' && !isNaN(property)
);

export const castToInt = (property) => (
  isDefined(property) ? parseInt(property) : null
);
