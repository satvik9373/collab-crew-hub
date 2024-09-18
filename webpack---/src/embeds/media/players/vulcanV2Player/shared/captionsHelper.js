import {
    proto
} from 'utilities/url.js';
import {
    eV1Protocol,
    mediaDataHost,
    cdnFastWistiaNetHost
} from 'utilities/hosts.js';
import {
    wlog
} from 'utilities/wlog.js';

export const captionsPromises = {};

const NAVIGATOR_LANGUAGES_WITH_ENGLISH = Array.from(
    new Set((navigator.languages || [navigator.language]).concat(['en'])),
);

const getPreferredLanguages = () => {
    return NAVIGATOR_LANGUAGES_WITH_ENGLISH;
};

const getAlpha2Code = (iso6392Code) => {
    return iso6392Code.split('-')[0];
};

export const getPreferredCaptionsIndex = (resp, options = {}) => {
    let foundIndex = -1;

    const preferredLanguages = getPreferredLanguages();

    // try to find an exact match based on the language embed option
    if (options.language && resp.captions.length > 0) {
        resp.preferred_languages.some((serverLanguage) => {
            foundIndex = resp.captions.findIndex((caption) => {
                const alpha3Bibliographic = caption.alpha3_bibliographic || caption.language;
                const alpha3Terminologic = caption.alpha3_terminologic || '';
                return (
                    alpha3Bibliographic === serverLanguage ||
                    (alpha3Terminologic !== '' && alpha3Terminologic === serverLanguage)
                );
            });
            return foundIndex >= 0;
        });
    }

    // try to find an exact match based on the list of preferred languages
    if (foundIndex === -1) {
        preferredLanguages.some((navLanguage) => {
            foundIndex = resp.captions.findIndex((caption) => {
                return caption.iso639_2_language_code === navLanguage;
            });
            return foundIndex >= 0;
        });
    }

    if (foundIndex === -1) {
        // if we couldn't find an exact match, try without region codes
        preferredLanguages.some((navLanguage) => {
            const alpha2NavLang = getAlpha2Code(navLanguage);
            foundIndex = resp.captions.findIndex((caption) => {
                return getAlpha2Code(caption.iso639_2_language_code) === alpha2NavLang;
            });
            return foundIndex >= 0;
        });
    }

    return foundIndex;
};

const transformResponseBasedOnPreferredLanguages = (resp, options = {}) => {
    const foundIndex = getPreferredCaptionsIndex(resp, options);

    if (foundIndex > 0) {
        // insert the preferred caption at the top of the list
        const preferredCaption = foundIndex >= 0 ? resp.captions[foundIndex] : resp.captions[0];
        resp.captions.splice(foundIndex, 1);
        resp.captions.unshift(preferredCaption);
        resp.preferred_languages = [preferredCaption.language];
    }
};

export const fetchCaptions = (video, options = {}) => {
    const hashedId = video.hashedId();
    const langKey = options.language ? `-${options.language}` : '';
    const key = `${hashedId}${langKey}`;

    if (captionsPromises[key]) {
        return captionsPromises[key];
    }

    return (captionsPromises[key] = new Promise((resolve) => {
        const baseUrl = `${eV1Protocol()}//${mediaDataHost(video._opts)}`;
        const url = new window.URL(`${baseUrl}/embed/captions/${hashedId}.json`);

        if (options.language) {
            url.searchParams.append('language', options.language);
        }

        wlog.info(url, options);
        fetch(url)
            .then((resp) => resp.json())
            .then((resp) => {
                transformResponseBasedOnPreferredLanguages(resp, options);
                resolve(resp);
            });
    }));
};

export const shouldShowNativeCaptions = (video) => {
    return (
        video._inNativeMode() ||
        (video._impl.behaviors.fullscreen && video._impl.behaviors.fullscreen.inNativeFullscreen())
    );
};

export const getCaptionsForLanguage = (lang, allCaptions) => {
    for (let i = 0; i < allCaptions.length; i++) {
        let captions = allCaptions[i];
        if (captions.language === lang) {
            return captions;
        }
    }
    return null;
};