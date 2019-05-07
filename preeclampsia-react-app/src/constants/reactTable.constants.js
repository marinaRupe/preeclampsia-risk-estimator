import LoadingComponent from '../components/LoadingComponent';

export const pageSizeOptions = [5, 10, 25, 50, 75, 100];

export const defaultPageSize = 10;

export const minRows = 5;

export const sortDirections = {
  ASC: 'ASC',
  DESC: 'DESC',
};

export const reactTableConstants = {
  manual: true,
  pageSizeOptions,
  defaultPageSize,
  minRows,
  previousText: 'Prethodna',
  nextText: 'Sljedeća',
  loadingText: 'Učitavanje...',
  noDataText: 'Nema pronađenih podataka',
  pageText: 'Stranica',
  ofText: 'od',
  rowsText: 'redaka',
  LoadingComponent
};
