import { languages } from './language.constants';

export const USER = 'user';
export const TOKEN = 'token';
export const LANGUAGE = 'language';

export const defaultLanguage = languages.hr;

export const EMAIL_REGEX = /^[A-Za-z0-9._%-+]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i;
