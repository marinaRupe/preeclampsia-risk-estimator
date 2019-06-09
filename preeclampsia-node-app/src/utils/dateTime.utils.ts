import * as moment from 'moment';
import { DATE_FORMAT_LONG_DOTS } from 'constants/dateTimeFormat.constants';

export const formatDate = (date: string, format = DATE_FORMAT_LONG_DOTS) => (
  date ? moment(date).format(format) : '-'
);

export const getAgeInYears = (birthDate: string, date: string) => (
  moment(date).diff(birthDate, 'years')
);

/**
 * Calculates the gestational age for a date using the known gestational age from another date.
 */
export const calculateGestationalAgeFromDate = (
  dateWithGestationalAge: string,
  dateForCalculation: string,
  gestationalAgeWeeks: number,
  gestationalAgeDays: number
) => {
  const gestationalAgeInDays1 = gestationalAgeWeeks * 7 + gestationalAgeDays;
  const gestationalAgeInDays2 = gestationalAgeInDays1
    + moment(dateForCalculation).diff(dateWithGestationalAge, 'days');

  const gestationalAgeWeeks2 = Math.floor(gestationalAgeInDays2 / 7);
  const gestationalAgeDays2 = Math.floor(gestationalAgeInDays2 % 7);

  return { weeks: gestationalAgeWeeks2, days: gestationalAgeDays2 };
};

/**
 * Calculate the gestational age for a date using the last period date.
 */
export const calculateGestationalAgeFromLastPeriodDate = (
  dateForCalculation: string,
  lastPeriodDate: string
) => {
  const daysPassed = moment(dateForCalculation).diff(lastPeriodDate, 'days');

  const gestationalAgeWeeks = Math.floor(daysPassed / 7);
  const gestationalAgeDays = Math.floor(daysPassed % 7);

  return { weeks: gestationalAgeWeeks, days: gestationalAgeDays };
};

export default {
  formatDate,
  getAgeInYears,
  calculateGestationalAgeFromDate,
  calculateGestationalAgeFromLastPeriodDate,
};
