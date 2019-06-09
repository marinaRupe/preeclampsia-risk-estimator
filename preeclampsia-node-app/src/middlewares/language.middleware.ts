import values from 'constants/values.constants';
import { languages } from 'constants/language.constants';
import { translations } from 'constants/translations.constants';

export const setLanguage = (req, res, next) => {
  let language = req.headers['accept-language'];

  if (!language || !Object.values(languages).includes(language)) {
    language = values.DEFAULT_LANGUAGE;
  }
  
  res.locals.translations = translations[language];
  res.locals.language = language;

  next();
};

export default {
  setLanguage
};
