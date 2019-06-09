/**
 * Returns a median for a list of numbers.
 *
 * @param {number[]} numbers An array of numbers
 * @return {number} The calculated median value from the specified numbers
 */
const median = (numbers) => {
  const sortedNumbers = [...numbers].sort();
  const count = sortedNumbers.length;

  if (count % 2 === 0) {
    return (sortedNumbers[count / 2 - 1] + sortedNumbers[count / 2]) / 2;
  } else { 
    return sortedNumbers[(count - 1) / 2];
  }
};

module.exports = {
  median,
};
