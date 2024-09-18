import {
    Wistia
} from 'wistia_namespace.js';
import {
    merge,
    clone
} from 'utilities/obj.js';
import {
    dynamicImport
} from 'utilities/dynamicImport.ts';

const languages = (Wistia.languages = Wistia.languages || {});
const translations = (Wistia.translations = Wistia.translations || {});

// set translationPromises if doesn't exist
if (!Wistia._translationPromises) {
    Wistia._translationPromises = {};
}

export const supportedLanguages = [
    'ar',
    'de',
    'es',
    'en-US',
    'fr',
    'it',
    'ja',
    'ko',
    'pt',
    'ru',
    'zh-CN',
];

const defineLanguage = (code, text, translations) => {
    languages[code] = {
        code,
        text: decodeEntities(text)
    };
    if (translations) {
        defineTranslations(code, translations);
    }
};

export const getLanguage = (code) => {
    return languages[code];
};

export const defineTranslations = (code, keyValPairs) => {
    if (languages[code] == null) {
        throw new Error(`Must define a language with code ${code} before defining its translations.`);
    }

    const translation = translations[code];
    if (translation) {
        merge(translation, keyValPairs);
    } else {
        translations[code] = clone(keyValPairs);
    }
};

const withFallbackText = (text) => {
    if (text == null) {
        return '?';
    }
    return text;
};

let dummyTextArea;
const cachedDecodings = (Wistia.cachedDecodings = Wistia.cachedDecodings || {});
const decodeEntities = (text) => {
    if (!dummyTextArea) {
        // Create this lazily to avoid race conditions while document is rendering.
        dummyTextArea = document.createElement('textarea');
    }
    if (cachedDecodings[text] != null) {
        // If we've decoded this before, use that value; DOM operations aren't
        // fast.
        return cachedDecodings[text];
    }
    dummyTextArea.innerHTML = text;
    cachedDecodings[text] = dummyTextArea.value;
    return dummyTextArea.value;
};

export const getTranslation = (code, key) => {
    let text;
    if (translations[code] && translations[code][key]) {
        text = translations[code][key];
    } else {
        text = translations['en-US'][key];
    }
    return decodeEntities(withFallbackText(text));
};

export const getLanguagePreference = () => {
    if (navigator.languages || navigator.language) {
        Wistia.languagePreference = navigator.languages || [navigator.language];
    } else {
        // in old browsers that don't support navigator.language(s), like IE 9/10,
        // just go with English.
        Wistia.languagePreference = ['en-US'];
    }

    return Wistia.languagePreference;
};

export const loadAndDefineTranslation = (code) => {
    if (Wistia._translationPromises[code]) {
        return Wistia._translationPromises[code];
    }

    const result = new Promise((resolve, reject) => {
        dynamicImport([`assets/external/translations/${code}.js`])
            .then((moduleClass) => {
                const {
                    languageCode,
                    languageLabel,
                    translations
                } = moduleClass;
                defineLanguage(languageCode, languageLabel, translations);
                resolve({
                    code,
                    translations: translations[code],
                });
            })
            .catch(reject);
    });

    Wistia._translationPromises[code] = result;
    return result;
};

export const matchingLanguages = (languagePrefs = getLanguagePreference) => {
    return languagePrefs().reduce((matches, langCode) => {
        const isFullMatch = supportedLanguages.indexOf(langCode) !== -1;

        // strip the region off a language, e.g. `es-ES` -> `es`
        const partialLangCode = langCode.split('-')[0];

        // take a partial match if the language hits, just not the region, e.g. `es-ES` -> `es`
        const isPartialMatch = supportedLanguages.indexOf(partialLangCode) !== -1;

        if (isFullMatch) {
            matches.push(langCode);
        } else if (isPartialMatch) {
            matches.push(partialLangCode);
        }

        return matches;
    }, []);
};

export const getDefaultTranslation = () => {
    let matchingLanguage = matchingLanguages()[0];

    // if there is not match, or if it is 'en', go to our
    // default of 'en-US'
    if (!matchingLanguage || matchingLanguage === 'en') {
        matchingLanguage = 'en-US';
    }

    if (translations[matchingLanguage]) {
        return Promise.resolve({
            code: matchingLanguage,
            translations: translations[matchingLanguage],
        });
    }

    return loadAndDefineTranslation(matchingLanguage);
};

// Most translations are defined where they are used, however these translations are
// rather generic and used in multiple places. They are defined here so we don't
// duplicate multiple translation keys.
defineLanguage('en-US', 'English');
defineTranslations('en-US', {
    PLAY: 'Play',
    PLAY_BUTTON_LIVE_NOT_STARTED: 'Livestream has not started',
    PLAY_BUTTON_TITLE_WHEN_NOT_PLAYING: 'Play Video',
    PLAY_BUTTON_TITLE_WHEN_PLAYING: 'Pause',

    REWATCH: 'Rewatch',

    SKIP: 'Skip',
});