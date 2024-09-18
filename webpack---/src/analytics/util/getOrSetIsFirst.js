import {
    getLocalStorage,
    setLocalStorage
} from 'utilities/namespacedLocalStorage.js';

export const getOrSetIsFirst = (hashedId, scope, event) => {
    const namespace = ['wistia', hashedId, scope].join('.');
    const storage = getLocalStorage(namespace);
    if (event in storage) {
        return false;
    }
    setLocalStorage(namespace, { ...storage,
        [event]: 1
    });
    return true;
};