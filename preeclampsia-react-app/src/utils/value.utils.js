export const isDefined = (property) => (
  property !== undefined && property !== null && property !== ''
);

export const castToInt = (property) => (
  isDefined(property) ? parseInt(property) : null
);
