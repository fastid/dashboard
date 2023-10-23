import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const languageDetector = new LanguageDetector(null, {
  order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
  lookupQuerystring: 'lang',
  lookupLocalStorage: 'lang',

  caches: ['localStorage'],
  excludeCacheFor: ['cimode'],
});


i18n.use(Backend).use(languageDetector).use(initReactI18next).init({
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n
