import moment from 'moment';

import {
  DATE_FORMAT_LONG_DOTS,
} from '../constants/dateTimeFormat.constants';

export const formatDate = (date, format = DATE_FORMAT_LONG_DOTS) => date ? moment(date).format(format) : '-';

export const getAgeInYears = (birthDate) => moment().diff(birthDate, 'years');
