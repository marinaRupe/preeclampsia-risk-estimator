export const isDefined = (property) => (
	property !== undefined && property !== null && property !== '' && property !== NaN
);

export const castToInt = (property) => (
	isDefined(property) ? parseInt(property) : null
);
