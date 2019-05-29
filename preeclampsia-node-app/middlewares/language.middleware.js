const values = require('../constants/values.constants');
const { languages } = require('../constants/language.constants');
const { translations } = require('../constants/translations.constants');

const setLanguage = (req, res, next) => {
  let language = req.headers['accept-language'];

  if (!language || !Object.values(languages).includes(language)) {
    language = values.DEFAULT_LANGUAGE;
  }
  
  res.locals.translations = translations[language];
  res.locals.language = language;

  next();
};

module.exports = {
  setLanguage
};
