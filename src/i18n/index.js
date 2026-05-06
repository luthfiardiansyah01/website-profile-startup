// src/i18n/index.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import id from "./locales/id.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            id: { translation: id }
        },
        fallbackLng: "en",
        debug: true,

        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"]
        },

        saveMissing: true,
        missingKeyHandler: async (lng, ns, key, fallbackValue) => {
            if (lng !== "id") return;

            const translated = await autoTranslateToID(fallbackValue || key);

            // store it so it never calls AI again
            i18n.addResource("id", "translation", key, translated);
        },

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;