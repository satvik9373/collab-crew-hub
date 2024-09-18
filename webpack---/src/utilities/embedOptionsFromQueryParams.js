import {
    Url
} from 'utilities/url.js';
import {
    indexOf
} from 'utilities/obj.js';

const getPageUrlStr = () => {
    if (top !== self) {
        // iframe
        return document.referrer || '';
    }

    return location.href || '';
};

const DEFAULT_REGEX = /^w_([^&]+)/;
export const embedOptionsFromQueryParams = (whitelist, pageUrlStr, regex = DEFAULT_REGEX) => {
    if (!pageUrlStr) {
        pageUrlStr = getPageUrlStr();
    }

    const url = new Url(pageUrlStr);
    const params = url.params || {};

    const embedOptions = {};
    for (let key in params) {
        if (Object.hasOwn(params, key)) {
            const match = key.match(regex);
            if (match) {
                const embedOptionName = match[1];

                // TODO: See if we can use Array.prototype.indexOf instead of our own
                // util. Just didn't want to deal with potential downstream breakage
                // from a refactor.
                if (indexOf(whitelist, embedOptionName) >= 0) {
                    embedOptions[embedOptionName] = params[key];
                }
            }
        }
    }

    return embedOptions;
};