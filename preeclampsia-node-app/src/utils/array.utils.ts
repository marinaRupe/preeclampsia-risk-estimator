export const addToArray = <T>(array: Array<T> = [], item: T): Array<T> => {
  return [...array, item];
};

export default {
  addToArray,
};
