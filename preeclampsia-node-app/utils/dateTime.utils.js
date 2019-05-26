const moment = require('moment');
const { DATE_FORMAT_LONG_DOTS } = require('../constants/dateTimeFormat.constants');

const formatDate = (date, format = DATE_FORMAT_LONG_DOTS) => date ? moment(date).format(format) : '-';

const getAgeInYears = (birthDate, date) => moment(date).diff(birthDate, 'years');

const calculateGestationalAgeFromDate = (date1, date2, gestationalAgeWeeks1, gestationalAgeDays1) => {
  const gestationalAgeInDays1 = gestationalAgeWeeks1 * 7 + gestationalAgeDays1;
  const gestationalAgeInDays2 = gestationalAgeInDays1 + moment(date2).diff(date1, 'days');

  const gestationalAgeWeeks2 = Math.floor(gestationalAgeInDays2 / 7);
  const gestationalAgeDays2 = Math.floor(gestationalAgeInDays2 % 7);

  return { weeks: gestationalAgeWeeks2, days: gestationalAgeDays2 };
};

module.exports = {
  formatDate,
  getAgeInYears,
  calculateGestationalAgeFromDate,
};
