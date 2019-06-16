import { addToArray } from 'utils/array.utils';
import { isDefined, isNumber } from 'utils/value.utils';

const isValidPregnancy = async (pregnancy, translations) => {
	const errors = {} as any;

	const {
		pregnancyNumber,
		pregnancyType,
		conceptionMethod,
		gynecologist,
		lastPeriodDate,
		lastPeriodDateIsReliable,
		deliveryDate,
		birthWeight,
		birthLength,
		numberOfPreviousPregnancies,
		numberOfPreviousBirths,
		hadPEInPreviousPregnancy,
		resultedWithPE,
	} = pregnancy;

	if (!isDefined(pregnancyNumber)) {
		errors.pregnancyNumber = addToArray(errors.pregnancyNumber, translations.pregnancyNumberRequired);
	} else if (!isNumber(pregnancyNumber)) {
		errors.pregnancyNumber = addToArray(errors.pregnancyNumber, translations.pregnancyNumberMustBeNumber);
	}

	if (!isDefined(pregnancyType) || !isNumber(pregnancyType)) {
		errors.pregnancyType = addToArray(errors.pregnancyType, translations.pregnancyTypeRequired);
	}

	if (!isDefined(conceptionMethod) || !isNumber(conceptionMethod)) {
		errors.conceptionMethod = addToArray(errors.conceptionMethod, translations.conceptionMethodRequired);
	}

	const isValid = Object.keys(errors).length === 0;
	return {
		isValid,
		errors,
	};
};

export default {
	isValidPregnancy,
};
