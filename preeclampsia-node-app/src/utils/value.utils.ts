export const isDefined = (property: any): boolean => (
	property !== undefined && property !== null && property !== '' && property !== NaN
);

export const isBoolean = (value: any): boolean => value === true || value === false;

export const isNumber = (value: any): boolean => value && !isNaN(Number(value));

export default {
	isDefined,
	isNumber,
	isBoolean,
};
