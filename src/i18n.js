import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import ru from "./locales/ru/translation.json";
import ua from "./locales/ua/translation.json";

const savedLanguage =
    localStorage.getItem("language") || "en";

i18n
    .use(initReactI18next)
    .init({

        resources: {

            en: {
                translation: en,
            },

            ru: {
                translation: ru,
            },

            ua: {
                translation: ua,
            },
        },

        lng: savedLanguage,

        fallbackLng: "en",

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;