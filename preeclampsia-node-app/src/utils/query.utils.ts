import { sortDirections } from 'constants/query.constants';

export const getSortColumnName = (sortColumn: string, sortColumnNames): string => {
  const name = sortColumnNames[sortColumn];
  return (name || sortColumnNames.default);
};

export const getSortDirection = (sortDirection: string, defaultSortDirection = sortDirections.ASC): string => {
  if (!sortDirection) {
    return defaultSortDirection;
  }

  const sortDirectionName = sortDirections[sortDirection.toUpperCase()];
  return (sortDirectionName || defaultSortDirection);
};

export default {
  getSortColumnName,
  getSortDirection
};
