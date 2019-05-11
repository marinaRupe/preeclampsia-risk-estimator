import * as values from '../constants/values';
import translations from '../assets/translations';

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

  setLanguage(language) {
    this.language = language;
    localStorage.setItem(values.LANGUAGE, language);
  }
}

export default Translator;

export const getTranslations = (language) => {
  return new Translator(language).getTranslations();
};

