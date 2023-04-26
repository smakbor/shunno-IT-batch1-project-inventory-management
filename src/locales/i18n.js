//Internal Lib Import
import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

//External Lib Import
import store from '../redux/store';

import translationBn from './bn/translation.json';
import translationEn from './en/translation.json';

//translations
const resources = {
    bn: {
        translation: translationBn,
    },
    en: {
        translation: translationEn,
    },
};

i18n.use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: store?.getState()?.Setting?.Language,
        fallbackLng: store?.getState()?.Setting?.Language, // use en if detected lng is not available
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
