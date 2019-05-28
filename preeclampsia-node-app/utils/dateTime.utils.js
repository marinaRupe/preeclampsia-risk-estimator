const moment = require('moment');
const { DATE_FORMAT_LONG_DOTS } = require('../constants/dateTimeFormat.constants');

const formatDate = (date, format = DATE_FORMAT_LONG_DOTS) => date ? moment(date).format(format) : '-';

const getAgeInYears = (birthDate, date) => moment(date).diff(birthDate, 'years');

/**
 * Calculates the gestational age for a date using the known gestational age from another date.
 * 
 * @param {string} dateWithGestationalAge A date with a known gestational age
 * @param {string} dateForCalculation A date for which the gestational age is being calculated
 * @param {number} gestationalAgeWeeks Weeks of date's gestational age
 * @param {number} gestationalAgeDays Days of the date's gestational age
 * @return {Object} The calculated gestational age
 */
const calculateGestationalAgeFromDate = (
  dateWithGestationalAge, dateForCalculation, gestationalAgeWeeks, gestationalAgeDays) => {
  const gestationalAgeInDays1 = gestationalAgeWeeks * 7 + gestationalAgeDays;
  const gestationalAgeInDays2 = gestationalAgeInDays1
    + moment(dateForCalculation).diff(dateWithGestationalAge, 'days');

  const gestationalAgeWeeks2 = Math.floor(gestationalAgeInDays2 / 7);
  const gestationalAgeDays2 = Math.floor(gestationalAgeInDays2 % 7);

  return { weeks: gestationalAgeWeeks2, days: gestationalAgeDays2 };
};

/**
 * Calculate the gestational age for a date using the last period date.
 * 
 * @param {string} dateForCalculation A date for which the gestational age is being calculated
 * @param {string} lastPeriodDate The last period date
 * @return {Object} The calculated gestational age
 */
const calculateGestationalAgeFromLastPeriodDate = (dateForCalculation, lastPeriodDate) => {
  const daysPassed = moment(dateForCalculation).diff(lastPeriodDate, 'days');

  const gestationalAgeWeeks = Math.floor(daysPassed / 7);
  const gestationalAgeDays = Math.floor(daysPassed % 7);

  return { weeks: gestationalAgeWeeks, days: gestationalAgeDays };
};

module.exports = {
  formatDate,
  getAgeInYears,
  calculateGestationalAgeFromDate,
  calculateGestationalAgeFromLastPeriodDate,
};
