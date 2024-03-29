import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import common_de from "./locales/de/translations.json";
import common_en from "./locales/en/translations.json";

i18n
    // load translation using xhr -> see /public/locales
    // learn more: https://github.com/i18next/i18next-xhr-backend
    .use(XHR)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        },
        // we init with resources
        lng: "en",
        fallbackLng: "en", // use en if detected lng is not available
        debug: true,

        resources: {
            en: {
                common: common_en   // 'common' is our custom namespace
            },
            de: {
                common: common_de
            }
        },

        react: {
            wait: true
        }
    });

export default i18n;