const addToArray = (array, item) => {
  let newArray = array;
  if (!array) {
    newArray = [];
  }
  return [...newArray, item];
};

module.exports = {
  addToArray,
};
