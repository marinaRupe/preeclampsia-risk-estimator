import moment from 'moment';

import {
  DATE_FORMAT_LONG_DOTS,
} from '../constants/dateTimeFormat.constants';

export const formatDate = (date, format = DATE_FORMAT_LONG_DOTS) => date ? moment(date).format(format) : '-';

export const getAgeInYears = (birthDate) => moment().diff(birthDate, 'years');

export const calculateGestationalAgeFromDate = (date1, date2, gestationalAgeWeeks1, gestationalAgeDays1) => {
  const gestationalAgeInDays1 = gestationalAgeWeeks1 * 7 + gestationalAgeDays1;
  const gestationalAgeInDays2 = gestationalAgeInDays1 + moment(date2).diff(date1, 'days');

  const gestationalAgeWeeks2 = Math.floor(gestationalAgeInDays2 / 7);
  const gestationalAgeDays2 = Math.floor(gestationalAgeInDays2 % 7);

  return { weeks: gestationalAgeWeeks2, days: gestationalAgeDays2 };
};
