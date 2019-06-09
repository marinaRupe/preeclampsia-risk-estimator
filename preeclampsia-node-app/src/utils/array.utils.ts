export const addToArray = <T>(array: T[] = [], item: T): T[] => {
	return [...array, item];
};

export default {
	addToArray,
};
