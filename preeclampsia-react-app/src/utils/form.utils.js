import React from 'react';

export const generateOptions = (
  options, key = 'id', value = 'value', name = 'name',
  noValueOptionIncluded = false, noValueOptionText = ''
) => {
  const optionsList = [...options];
  if (noValueOptionIncluded) {
    optionsList.unshift({ [key]: -1, [value]: '', [name]: noValueOptionText });
  }

  return optionsList.map((option) => {
    return (
      <option key={option[key]} value={option[value]}>
        {option[name]}
      </option>);
  });
};
