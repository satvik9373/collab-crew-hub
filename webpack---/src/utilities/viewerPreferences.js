import {
    getLocalStorage,
    removeLocalStorage,
    updateLocalStorage,
} from 'utilities/namespacedLocalStorage.js';

export const deleteViewerPreferences = () => {
    removeLocalStorage(getLocalStorageKey());
};

const getLocalStorageKey = () => {
    return 'wistia-viewer-preferences';
};

/**
 * This should only need to be referenced in _public_api.coffee,
 * where the preferences are merged in as options
 */
export const getViewerPreferences = () => {
    return getLocalStorage(getLocalStorageKey());
};

export const setViewerPreference = (preference, value) => {
    updateLocalStorage(getLocalStorageKey(), (obj) => {
        obj[preference] = value;
    });
};