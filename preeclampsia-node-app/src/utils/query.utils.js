const { sortDirections } = require('constants/query.constants');

const getSortColumnName = (sortColumn, sortColumnNames) => {
  const name = sortColumnNames[sortColumn];
  return (name || sortColumnNames.default);
};

const getSortDirection = (sortDirection, defaultSortDirection = sortDirections.ASC) => {
  if (!sortDirection) {
    return defaultSortDirection;
  }

  const sortDirectionName = sortDirections[sortDirection.toUpperCase()];
  return (sortDirectionName || defaultSortDirection);
};

module.exports = {
  getSortColumnName,
  getSortDirection
};
