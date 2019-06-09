import * as values from 'constants/values';
import translations from 'assets/translations';

class Translator {
	constructor(language) {
		if (!!Translator.instance) {
			return Translator.instance;
		}

		Translator.instance = this;

		if (language) {
			this.language = language;
			localStorage.setItem(values.LANGUAGE, language);
		} else {
			const lang = localStorage.getItem(values.LANGUAGE);
			if (!lang) {
				this.language = values.defaultLanguage;
				localStorage.setItem(values.LANGUAGE, values.defaultLanguage);
			} else {
				this.language = lang;
			}
		}

		return this;
	}

	getTranslations() {
		return translations[this.language];
	}

	getCharacteristicTranslation(characteristic) {
		return characteristic[this.language].display;
	}

	getMeasurementTranslation(measurement) {
		return measurement[this.language];
	}

	getLanguage() {
		return this.language;
	}

	setLanguage(language) {
		this.language = language;
		localStorage.setItem(values.LANGUAGE, language);
		window.location.reload();
	}
}

export const getTranslations = (language) => {
	return new Translator(language).getTranslations();
};

export const getCharacteristicTranslation = (characteristic) => {
	return new Translator().getCharacteristicTranslation(characteristic);
};

export const getMeasurementTranslation = (measurement) => {
	return new Translator().getMeasurementTranslation(measurement);
};

export const getLanguage = () => new Translator().getLanguage();

export const setLanguage = (language) => new Translator().setLanguage(language);
