/**
 * Returns a median for a list of numbers.
 */
export const median = (numbers: number[]): number => {
	const sortedNumbers = [...numbers].sort();
	const count = sortedNumbers.length;

	if (count % 2 === 0) {
		return (sortedNumbers[count / 2 - 1] + sortedNumbers[count / 2]) / 2;
	} else { 
		return sortedNumbers[(count - 1) / 2];
	}
};

export default {
	median,
};
