import { languages } from './language.constants';

export const USER = 'user';
export const TOKEN = 'token';
export const LANGUAGE = 'language';

export const defaultLanguage = languages.hr;
export const defaultLabelColumnSize = 4;
export const defaultValueColumnSize = 7;

export const MAX_PREGNANCY_WEEKS = 60;
export const MIN_VISIBLE_DAYS_IN_FIRST_TRIMESTER = 77;
export const MAX_DAYS_IN_TRIMESTER = 98;
export const EMAIL_REGEX = /^[A-Za-z0-9._%-+]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i;
