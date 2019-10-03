import moment from 'moment';

export const calculateGestationalAgeFromDate = (date1, date2, gestationalAgeWeeks1, gestationalAgeDays1) => {
	const gestationalAgeInDays1 = gestationalAgeWeeks1 * 7 + gestationalAgeDays1;
	const gestationalAgeInDays2 = gestationalAgeInDays1 + moment(date2).diff(date1, 'days');

	const gestationalAgeWeeks2 = Math.floor(gestationalAgeInDays2 / 7);
	const gestationalAgeDays2 = Math.floor(gestationalAgeInDays2 % 7);

	return { weeks: gestationalAgeWeeks2, days: gestationalAgeDays2 };
};

export const calculateGestationalAgeFromCRL = (CRL) => {
	const gestationalAgeInDays = Math.pow((CRL * 1.037), 0.5) * 8.052 + 23.73;
	const weeks = Math.floor(gestationalAgeInDays / 7);
	const days = Math.floor(gestationalAgeInDays % 7);
	return { weeks, days };
};

export const calculateGestationalAgeFromLastPeriodDate = (
	dateForCalculation,
	lastPeriodDate
) => {
	console.log(dateForCalculation);
	console.log(lastPeriodDate);
	const daysPassed = moment(dateForCalculation).diff(lastPeriodDate, 'days');

	const gestationalAgeWeeks = Math.floor(daysPassed / 7);
	const gestationalAgeDays = Math.floor(daysPassed % 7);

	return { weeks: gestationalAgeWeeks, days: gestationalAgeDays };
};
