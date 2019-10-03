import { addToArray } from 'utils/array.utils';
import { isDefined, isNumber } from 'utils/value.utils';

const gestationalAgeDaysRangeIsValid = (days) => (days >= 0 && days <= 6);

const isValidMedicalExamination = async (medicalExamination, translations) => {
	const errors = {} as any;

	const {
		trimesterNumber,
		protocol,
		gestationalAgeByUltrasoundWeeks,
		gestationalAgeByUltrasoundDays,
		bloodTestDate,
		gestationalAgeOnBloodTestWeeks,
		gestationalAgeOnBloodTestDays,
	} = medicalExamination;

	if (!isDefined(trimesterNumber)) {
		errors.trimesterNumber = addToArray(errors.trimesterNumber, translations.trimesterNumberRequired);
	} else if (!isNumber(trimesterNumber) || ![1, 2, 3].includes(trimesterNumber)) {
		errors.trimesterNumber = addToArray(errors.trimesterNumber, translations.trimesterNumberMustBeNumber);
	}

	if (!isDefined(protocol)) {
		errors.protocol = addToArray(errors.protocol, translations.protocolRequired);
	}

	if (!isDefined(bloodTestDate)) {
		errors.bloodTestDate = addToArray(errors.bloodTestDate, translations.bloodTestDateRequired);
	}

	if (!isDefined(gestationalAgeOnBloodTestWeeks)) {
		errors.gestationalAgeOnBloodTestWeeks = addToArray(
			errors.gestationalAgeOnBloodTestWeeks, translations.gestationalAgeOnBloodTestWeeksRequired
		);
	} else if (!isNumber(gestationalAgeOnBloodTestWeeks) || gestationalAgeOnBloodTestWeeks < 0) {
		errors.gestationalAgeOnBloodTestWeeks = addToArray(
			errors.gestationalAgeOnBloodTestWeeks, translations.gestationalAgeOnBloodTestWeeksMustBeNumber
		);
	}

	if (!isDefined(gestationalAgeOnBloodTestDays)) {
		errors.gestationalAgeOnBloodTestDays = addToArray(
			errors.gestationalAgeOnBloodTestDays, translations.gestationalAgeOnBloodTestDaysRequired
		);
	} else if (!isNumber(gestationalAgeOnBloodTestDays)
		|| !gestationalAgeDaysRangeIsValid(gestationalAgeOnBloodTestDays)) {
		errors.gestationalAgeOnBloodTestDays = addToArray(
			errors.gestationalAgeOnBloodTestDays, translations.gestationalAgeOnBloodTestDaysMustBeNumber
		);
	}

	if (isDefined(gestationalAgeByUltrasoundWeeks)
		&& (!isNumber(gestationalAgeByUltrasoundWeeks) || gestationalAgeByUltrasoundWeeks < 0)) {
		errors.gestationalAgeByUltrasoundWeeks = addToArray(
			errors.gestationalAgeByUltrasoundWeeks, translations.gestationalAgeByUltrasoundWeeksMustBeNumber
		);
	} else if (!isDefined(gestationalAgeByUltrasoundWeeks) && isDefined(gestationalAgeByUltrasoundDays)) {
		errors.gestationalAgeByUltrasoundWeeks = addToArray(
			errors.gestationalAgeByUltrasoundWeeks, translations.gestationalAgeByUltrasoundIncomplete
		);
	}

	if (isDefined(gestationalAgeByUltrasoundDays)
		&& (!isNumber(gestationalAgeByUltrasoundDays)
		|| gestationalAgeDaysRangeIsValid(gestationalAgeByUltrasoundDays))) {
		errors.gestationalAgeByUltrasoundDays = addToArray(
			errors.gestationalAgeByUltrasoundDays, translations.gestationalAgeByUltrasoundDaysMustBeNumber
		);
	} else if (!isDefined(gestationalAgeByUltrasoundDays) && isDefined(gestationalAgeByUltrasoundWeeks)) {
		errors.gestationalAgeByUltrasoundDays = addToArray(
			errors.gestationalAgeByUltrasoundDays, translations.gestationalAgeByUltrasoundIncomplete
		);
	}

	const isValid = Object.keys(errors).length === 0;
	return {
		isValid,
		errors,
	};
};

export default {
	isValidMedicalExamination,
};
