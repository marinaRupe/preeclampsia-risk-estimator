import LoadingComponent from 'components/LoadingComponent';
import { getTranslations } from 'utils/translation.utils';

export const pageSizeOptions = [5, 10, 25, 50, 75, 100];

export const defaultPageSize = 10;

export const minRows = 5;

export const sortDirections = {
  ASC: 'ASC',
  DESC: 'DESC',
};

export const getReactTableConstants = () => {
  const tableTranslations = getTranslations().table;
  return ({
    manual: true,
    pageSizeOptions,
    defaultPageSize,
    minRows,
    previousText: tableTranslations.previousText,
    nextText: tableTranslations.nextText,
    loadingText: tableTranslations.loadingText,
    noDataText: tableTranslations.noDataText,
    pageText: tableTranslations.pageText,
    ofText: tableTranslations.ofText,
    rowsText: tableTranslations.rowsText,
    LoadingComponent
  });
};
