import { addToArray } from 'utils/array.utils';
import { isDefined } from 'utils/value.utils';

const isValidMedicalExamination = async (medicalExamination, translations) => {
	const errors = {} as any;

	const isValid = Object.keys(errors).length === 0;
	return {
		isValid,
		errors,
	};
};

export default {
	isValidMedicalExamination,
};
