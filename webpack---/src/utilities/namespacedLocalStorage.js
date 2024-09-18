import {
    Wistia
} from 'wistia_namespace.js';

/*
 * This module is designed as a simpler version of our old localStorage
 * utility.  To reduce potential bundle size, it doesn't make use of Obj
 * utilities or wlog, and doesn't return early based on browser detection.
 *
 * To avoid multiple tab bugs, it does not try to do any kind of commit
 * debouncing. Every call to `set` involves JSON.serialize() and every call to
 * `get` involves JSON.parse(). Therefore, if you are performing many
 * operations, you should cache an intermediate value. The
 * updateLocalStorage function is also provided for doing many updates
 * with a single parse and serialize call.
 *
 * If you are working with localStorage on something that requires lots of
 * updates, you should use a separate namespace. That way there is less to
 * deserialize and serialize on each read and write.
 */

const throwAsync = (e) => {
    setTimeout(() => {
        throw e;
    }, 0);
};

const OBJ_PROP = '_namespacedLocalStorage';

const localStorageWorks = (ns = 'wistia-test-localstorage') => {
    if (Wistia._localStorageWorks != null) {
        return Wistia._localStorageWorks;
    }
    try {
        // no-ops that test get, set, and remove. These may throw an exception
        // in Private Browsing mode on iOS and Safari.
        const currentVal = localStorage.getItem(ns);
        localStorage.removeItem(ns);
        localStorage.setItem(ns, currentVal);
        localStorage.removeItem(ns);
        Wistia._localStorageWorks = true;
    } catch (e) {
        Wistia._localStorageWorks = false;
    }
    return Wistia._localStorageWorks;
};

// Gets our memory store, which we use in parallel with localStorage in case
// localStorage is disabled. In some browsers and situations, disabled
// localStorage will throw exceptions.
const getMemory = () => {
    if (Wistia[OBJ_PROP] == null) {
        Wistia[OBJ_PROP] = {};
    }
    return Wistia[OBJ_PROP];
};

export const getLocalStorage = (ns) => {
    if (!localStorageWorks()) {
        return getMemory()[ns] || {};
    }

    if (localStorage[ns]) {
        try {
            if (localStorage[ns] === 'null') {
                // "null" is valid JSON, and JSON.parse("null") will return null, which
                // isn't usable for our purposes at all.
                return {};
            }
            return JSON.parse(localStorage[ns]);
        } catch (e) {
            throwAsync(e);
        }
    }
    return {};
};

export const removeLocalStorage = (ns) => {
    if (!localStorageWorks()) {
        getMemory()[ns] = {};
        return;
    }

    try {
        localStorage.removeItem(ns);
    } catch (e) {
        throwAsync(e);
    }
};

export const setLocalStorage = (ns, obj) => {
    if (!localStorageWorks()) {
        if (obj != null && typeof obj === 'object') {
            getMemory()[ns] = obj;
        }
        return obj;
    }

    try {
        // We set Wistia._localStorage for compatibility with the old localStorage util,
        // which would otherwise overwrite any changes we make. :0
        getMemory()[ns] = obj;

        localStorage[ns] = JSON.stringify(obj);
    } catch (e) {
        throwAsync(e);

        // TODO: We might want some strategy of dealing with QuotaExceededError
        // exceptions. Ideally we'd be really smart about pruning, but our other
        // options are (a) just don't update localStorage (that's what we're
        // doing now), or (b) clobber our localStorage to see if that helps.
    }
    return obj;
};

export const updateLocalStorage = (ns, fn) => {
    const obj = getLocalStorage(ns);

    // fn() may throw an exception. we catch and report because we don't want
    // an exception after modifying in-place localStorage to get our local store
    // out of sync.
    try {
        fn(obj);
    } catch (e) {
        throwAsync(e);
    }
    return setLocalStorage(ns, obj);
};